/* Amplify Params - DO NOT EDIT
	API_REPORTAPI_GRAPHQLAPIENDPOINTOUTPUT
	API_REPORTAPI_GRAPHQLAPIIDOUTPUT
	API_REPORTAPI_GRAPHQLAPIKEYOUTPUT
	ENV
	FUNCTION_LAMBDAFN_NAME
	REGION
Amplify Params - DO NOT EDIT */

require('dotenv').config();
const axios = require('axios');
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;
const { getResult } = require('../helpers/calculation');
const { obstaclesCoordinate } = require('../helpers/obstaclesGenerator');
const { totalPercentageCoverage } = require('../helpers/fieldCoverage');

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
      createdAt
      updatedAt
    }
  }
`;

exports.handler = async (event, _, callback) => {
  const getUserInputs_graphqlData = axios({
    url: process.env.API_REPORTAPI_GRAPHQLAPIENDPOINTOUTPUT,
    method: 'post',
    headers: {
      'x-api-key': process.env.API_REPORTAPI_GRAPHQLAPIKEYOUTPUT,
    },
    data: {
      query: print(listUserInputs),
    },
  });

  const getNumOfElectricRuns_graphqlData = axios({
    url: process.env.API_REPORTAPI_GRAPHQLAPIENDPOINTOUTPUT,
    method: 'post',
    headers: {
      'x-api-key': process.env.API_REPORTAPI_GRAPHQLAPIKEYOUTPUT,
    },
    data: {
      query: print(getNumOfElectricRuns),
    },
  });

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

      const reportDataArr = userInputBody.graphqlData
        .sort((a, b) => new Date(a.createdAt).valueOf() - new Date(b.createdAt.valueOf()))
        .map(async (combine, idx) => {
          const { wheelDiameter, fuelType, augerLength } = combine;

          // generate obstacles
          const obstacles = obstaclesCoordinate();
          const percentageOfFieldChosenToCover = totalPercentageCoverage(obstacles, augerLength);

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

          const reportBody = {
            wheelDiameter: parseInt(wheelDiameter),
            augerLength: parseFloat(augerLength),
            fuelType,
            combineWeight: totalWeight,
            timeSpentToPlaneTheField: totalTimeToPlaneField,
            costPerRun: totalCostPerRun,
            numOfElectricRuns,
            percentageOfFieldChosenToCover,
          };

          console.log('reportBody:', await reportBody);

          const insertReport = await axios({
            url: process.env.API_REPORTAPI_GRAPHQLAPIENDPOINTOUTPUT,
            method: 'post',
            headers: {
              'x-api-key': process.env.API_REPORTAPI_GRAPHQLAPIKEYOUTPUT,
            },
            data: {
              query: print(createSimulationReport),
              variables: {
                input: reportBody,
              },
            },
          });
          console.log(await `insertReport${idx}`);
        });
    })
    .catch((err) => callback(err));

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
