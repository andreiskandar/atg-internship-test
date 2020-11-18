/* Amplify Params - DO NOT EDIT
	API_REPORTAPI_GRAPHQLAPIENDPOINTOUTPUT
	API_REPORTAPI_GRAPHQLAPIIDOUTPUT
	API_REPORTAPI_GRAPHQLAPIKEYOUTPUT
	ENV
	FUNCTION_LAMBDAFN_NAME
	REGION
Amplify Params - DO NOT EDIT */

// require('dotenv').config();
// const axios = require('axios');
// const gql = require('graphql-tag');
// const graphql = require('graphql');

// const { print } = graphql;

// const listSimulationReports = gql`
//   query MyQuery {
//     listSimulationReports {
//       items {
//         augerLength
//         combineWeight
//         costPerRun
//         fuelType
//         id
//         numOfElectricRuns
//         percentageOfFieldChosenToCover
//         timeSpentToPlaneTheField
//         wheelDiameter
//       }
//     }
//   }
// `;

exports.handler = function (event, context, callback) {
  callback(null, {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify('hello from restAPI'),
  });
};

// exports.handler = async (event, _, callback) => {
//   try {
//     const graphqlData = await axios({
//       url: process.env.API_REPORTAPI_GRAPHQLAPIENDPOINTOUTPUT,
//       method: 'post',
//       headers: {
//         'x-api-key': process.env.API_REPORTAPI_GRAPHQLAPIKEYOUTPUT,
//         'Access-Control-Allow-Headers': 'Content-Type',
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
//       },
//       data: {
//         query: print(listSimulationReports),
//         // variables: {
//         //   input: {
//         //     name: 'Hello world! frm Andre',
//         //     description: 'my first creation todo from lambda',
//         //   },
//         // },
//       },
//     });
//     const body = {
//       // message: 'successfully created todo!',
//       graphqlData: graphqlData.data.data.listSimulationReports,
//     };
//     // console.log(body.graphqlData.items);
//     // callback(null, body.graphqlData.items);
//     // return {
//     //   statusCode: 200,
//     //   body: JSON.stringify(body.graphqlData.items),
//     //   headers: {
//     //     'x-api-key': process.env.API_REPORTAPI_GRAPHQLAPIKEYOUTPUT,
//     //     'Access-Control-Allow-Headers': 'Content-Type',
//     //     'Access-Control-Allow-Origin': '*',
//     //     'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
//     //   },
//     // };

//     const response = {
//       statusCode: 200,
//       headers: {
//         'Access-Control-Allow-Origin': '*', // Required for CORS support to work
//         'Access-Control-Allow-Credentials': true, // Required for cookies, authorization headers with HTTPS
//       },
//       body: JSON.stringify({ message: 'Hello World!' }),
//     };

//     callback(null, response);
//   } catch (err) {
//     console.log('error posting to appsync: ', err);
//   }
// };
