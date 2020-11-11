import axios from 'axios';

exports.handler = async (event) => {
  let apiUrl = `https://api.coinlore.com/api/tickers/?start=1&limit=10`;
  if (event.arguments) {
    const { start = 0, limit = 10 } = event.arguments;
    apiUrl = `https://api.coinlore.com/api/tickers/?start=${start}&limit=${limit}`;
  }

  axios
    .get(apiUrl)
    .then((response) => {
      callback(null, response.data.data);
      console.log(response);
    })
    .catch((err) => callback(err));
  const response = {
    statusCode: 200,

    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*"
    //  },
    body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
};
