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

exports.handler = async (event, _, callback) => {
  const getUserInputs_graphqlData = queryGraphqlData(listUserInputs);

  const getNumOfElectricRuns_graphqlData = queryGraphqlData(getNumOfElectricRuns);

  await Promise.all([getUserInputs_graphqlData, getNumOfElectricRuns_graphqlData])
    .then((res) => {
      const [listUserInputsData, numOfElectricRunsData] = res;

      const userInputBody = {
        graphqlData: listUserInputsData.data.data.listUserInputs.items,
      };

      const numOfElectricRunsBody = {
        graphqlData: numOfElectricRunsData.data.data.listSimulationReports.items.length,
      };

      let numOfElectricRuns = numOfElectricRunsBody.graphqlData;

      const reportDataArr = userInputBody.graphqlData.map(async (combine, idx) => {
        const { wheelDiameter, fuelType, augerLength } = combine;
        // generate obstacles
        const obstacles = obstaclesCoordinate();
        const percentageOfFieldChosenToCover = totalPercentageCoverage(obstacles, augerLength);

        //query for test efficiency for specific combine
        const listPreviousCombineQuery = gql`
          query previousCombineInfo {
            listSimulationReports(
              filter: { 
                augerLength: { eq: ${augerLength} }, fuelType: { eq: "${fuelType}" }, wheelDiameter: { eq: ${wheelDiameter} } }
            ) {
              items {
                costPerRun
                timeSpentToPlaneTheField
                percentageOfFieldChosenToCover
              }
            }
          }
        `;

        const listPreviousCombine = await queryGraphqlData(listPreviousCombineQuery).then((res) => {
          return res.data.data.listSimulationReports.items;
        });

        if (fuelType === 'Electric') {
          numOfElectricRuns += 1;
        }
        const { totalTimeToPlaneField, totalCostPerRun, totalWeight } = getResult(
          wheelDiameter,
          augerLength,
          fuelType,
          numOfElectricRuns,
          percentageOfFieldChosenToCover
        );

        const newData = {
          costPerRun: totalCostPerRun,
          timeSpentToPlaneTheField: totalTimeToPlaneField,
          percentageOfFieldChosenToCover,
        };

        listPreviousCombine.push(newData);
        const totalEfficiency = getTotalEfficiency(listPreviousCombine);

        const reportBody = {
          wheelDiameter: parseInt(wheelDiameter),
          augerLength: parseFloat(augerLength),
          fuelType,
          combineWeight: totalWeight,
          timeSpentToPlaneTheField: totalTimeToPlaneField,
          costPerRun: totalCostPerRun,
          numOfElectricRuns,
          percentageOfFieldChosenToCover,
          totalEfficiency,
        };
        console.log('reportBody: bfore mutation', await reportBody);

        const insertBody = await queryGraphqlData(createSimulationReport, reportBody);
        // console.log('insertBody:', insertBody)

        // const insertBody = await axios({
        //   url: process.env.API_REPORTAPI_GRAPHQLAPIENDPOINTOUTPUT,
        //   method: 'post',
        //   headers: {
        //     'x-api-key': process.env.API_REPORTAPI_GRAPHQLAPIKEYOUTPUT,
        //   },
        //   data: {
        //     query: print(createSimulationReport),
        //     variables: {
        //       input: reportBody,
        //     },
        //   },
        // });
        // console.log('reportBody:', await reportBody);
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
        // query: print(getNumOfElectricRuns),
      },
    });

    const body = {
      graphqlData: graphqlData.data.data.listUserInputs.items,
    };

    return {
      statusCode: 200,
      body: JSON.stringify(body),
      // body: JSON.stringify(generateReport),
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      },
    };
  } catch (err) {
    console.log('error posting to appsync: ', err);
  }
};
