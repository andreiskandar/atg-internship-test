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

const listSimulationReports = gql`
  query MyQuery {
    listSimulationReports {
      items {
        augerLength
        combineWeight
        costPerRun
        fuelType
        id
        numOfElectricRuns
        percentageOfFieldChosenToCover
        timeSpentToPlaneTheField
        wheelDiameter
        createdAt
      }
    }
  }
`;

// exports.handler = async (event) => {
//   try {
//     const graphqlData = await axios({
//       method: 'POST',
//       url: process.env.API_REPORTAPI_GRAPHQLAPIENDPOINTOUTPUT,
//       headers: {
//         'x-api-key': process.env.API_REPORTAPI_GRAPHQLAPIKEYOUTPUT,
//       },
//       data: {
//         query: print(listSimulationReports),
//       },
//     });
//     const body = {
//       graphqlData: graphqlData.data.data.listSimulationReports,
//     };

//     console.log('BODY', body.graphqlData);

//     return {
//       statusCode: 200,
//       body: JSON.stringify(body),
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//       },
//     };
//   } catch (err) {
//     console.log('err at fetching data lambda function: ', err);
//   }
// };

exports.handler = async (event, _, callback) => {
  console.log('event:', event.body);
  try {
    const graphqlData = await axios({
      url: process.env.API_REPORTAPI_GRAPHQLAPIENDPOINTOUTPUT,
      method: 'post',
      headers: {
        'x-api-key': process.env.API_REPORTAPI_GRAPHQLAPIKEYOUTPUT,
      },
      data: {
        query: print(listSimulationReports),
        // variables: {
        //   input: {
        //     name: 'Hello world! frm Andre',
        //     description: 'my first creation todo from lambda',
        //   },
        // },
      },
    });
    const body = {
      // message: 'successfully created todo!',
      graphqlData: graphqlData.data.data.listSimulationReports,
    };
    console.log(body.graphqlData.items);
    callback(null, body.graphqlData.items);
    // return {
    //   statusCode: 200,
    //   body: JSON.stringify(body),
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //   },
    // };
  } catch (err) {
    console.log('error posting to appsync: ', err);
  }
};
