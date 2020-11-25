/* Amplify Params - DO NOT EDIT
	API_REPORTAPI_GRAPHQLAPIENDPOINTOUTPUT
	API_REPORTAPI_GRAPHQLAPIIDOUTPUT
	API_REPORTAPI_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const axios = require('axios');
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;
const { getResult, getTotalEfficiency } = require('./helpers/calculation');
const { obstaclesCoordinate } = require('./helpers/obstaclesGenerator');
const { totalPercentageCoverage } = require('./helpers/fieldCoverage');
const { queryGraphqlData } = require('./helpers/graphqlData');

const listUserInputs = gql`
  query ListUserInputs($filter: ModeluserInputFilterInput, $limit: Int, $nextToken: String) {
    listUserInputs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        wheelDiameter
        fuelType
        augerLength
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

const getNumOfElectricRuns = gql`
  query getNumOfElectricRuns {
    listSimulationReports(filter: { fuelType: { eq: "Electric" } }) {
      items {
        id
      }
    }
  }
`;

const createSimulationReport = gql`
  mutation CreateSimulationReport(
    $input: CreateSimulationReportInput!
    $condition: ModelsimulationReportConditionInput
  ) {
    createSimulationReport(input: $input, condition: $condition) {
      id
      combineWeight
      wheelDiameter
      fuelType
      augerLength
      timeSpentToPlaneTheField
      costPerRun
      percentageOfFieldChosenToCover
      numOfElectricRuns
      totalEfficiency
      createdAt
      updatedAt
    }
  }
`;

const listPreviousCombineQuery = (augerLength, fuelType, wheelDiameter) => {
  return gql`
    query previousCombineInfo {
      listSimulationReports(
        filter: { 
          augerLength: { eq: ${augerLength} }, fuelType: { eq: "${fuelType}" }, wheelDiameter: { eq: ${wheelDiameter} } }
      ) {
        items {
          wheelDiameter
          fuelType
          augerLength
          costPerRun
          timeSpentToPlaneTheField
          percentageOfFieldChosenToCover
        }
      }
    }
  `;
};

exports.handler = async (event, _, callback) => {
  // query API for user inputs and number of electric runs from db
  const getUserInputs_graphqlData = queryGraphqlData(listUserInputs);
  const getNumOfElectricRuns_graphqlData = queryGraphqlData(getNumOfElectricRuns);

  await Promise.all([getUserInputs_graphqlData, getNumOfElectricRuns_graphqlData])
    .then(async (res) => {
      const [listUserInputsData, numOfElectricRunsData] = res;

      const userInputBody = {
        graphqlData: listUserInputsData.data.data.listUserInputs.items,
      };

      const numOfElectricRunsBody = {
        graphqlData: numOfElectricRunsData.data.data.listSimulationReports.items.length,
      };

      let numOfElectricRuns = numOfElectricRunsBody.graphqlData;

      // query API for previous combine from db
      const prevCombinePromises = userInputBody.graphqlData.map((combine, idx) => {
        const { wheelDiameter, fuelType, augerLength } = combine;
        return queryGraphqlData(listPreviousCombineQuery(augerLength, fuelType, wheelDiameter));
      });

      const prevCombineArray = await Promise.all(prevCombinePromises).then((all) => {
        return all.map((res) => res.data.data.listSimulationReports.items);
      });

      const reportDataArr = userInputBody.graphqlData.map((combine, idx) => {
        const { wheelDiameter, fuelType, augerLength } = combine;

        if (fuelType === 'Electric') {
          numOfElectricRuns += 1;
        }

        // generate obstacles
        const obstacles = obstaclesCoordinate();
        const percentageOfFieldChosenToCover = totalPercentageCoverage(obstacles, augerLength);

        // call helper function
        const { totalTimeToPlaneField, totalCostPerRun, totalWeight } = getResult(
          wheelDiameter,
          augerLength,
          fuelType,
          numOfElectricRuns,
          percentageOfFieldChosenToCover
        );

        const currentData = {
          costPerRun: totalCostPerRun,
          timeSpentToPlaneTheField: totalTimeToPlaneField,
          percentageOfFieldChosenToCover,
        };

        // add current data with previous data array to calculate total efficiency
        prevCombineArray[idx].push(currentData);
        const totalEfficiency = getTotalEfficiency(prevCombineArray[idx]);

        const reportBody = {
          wheelDiameter: parseInt(wheelDiameter),
          augerLength: parseFloat(augerLength),
          totalEfficiency,
          fuelType,
          combineWeight: totalWeight,
          timeSpentToPlaneTheField: totalTimeToPlaneField,
          costPerRun: totalCostPerRun,
          numOfElectricRuns,
          percentageOfFieldChosenToCover,
        };

        // query to insert new data into db
        queryGraphqlData(createSimulationReport, reportBody);
      });
    })
    .catch((err) => callback('error with promise all', err));

  try {
    const graphqlData = await axios({
      url: process.env.API_REPORTAPI_GRAPHQLAPIENDPOINTOUTPUT,
      method: 'post',
      headers: {
        'x-api-key': process.env.API_REPORTAPI_GRAPHQLAPIKEYOUTPUT,
      },
      data: {
        query: print(listUserInputs),
      },
    });

    const body = {
      message: 'successfull simulation',
    };

    return {
      statusCode: 200,
      body: JSON.stringify(body),
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
    };
  } catch (err) {
    console.log('error posting to appsync: ', err);
  }
};
