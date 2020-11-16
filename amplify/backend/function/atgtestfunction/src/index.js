/* Amplify Params - DO NOT EDIT
	API_REPORTAPI_GRAPHQLAPIENDPOINTOUTPUT
	API_REPORTAPI_GRAPHQLAPIIDOUTPUT
	API_REPORTAPI_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const AWS = require('aws-sdk');
const axios = require('axios');
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

exports.handler = (event, _, callback) => {
  const params = {
    Item: {
      date: Date.now(),
      message: event.key1,
    },
    TableName: 'simulationReport-2t24gpfho5bw7cpdb5xo3x5roi-dev',
  };

  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify('Hello from new Lambda!'),
  };

  docClient.put(params, (err, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
  // let apiUrl = `https://api.coinlore.com/api/tickers/?start=1&limit=10`;

  // if (event.arguments) {
  //   const { start = 0, limit = 10 } = event.arguments;
  //   apiUrl = `https://api.coinlore.com/api/tickers/?start=${start}&limit=${limit}`;
  // }

  axios
    .get(apiUrl)
    .then((response) => callback(null, response.data.data))
    .catch((err) => callback(err));
};
