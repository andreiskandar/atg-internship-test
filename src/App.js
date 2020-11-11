import React, { useState, useEffect } from 'react';

import { listTalks as ListTalks } from './graphql/queries';

import { API, graphqlOperation } from 'aws-amplify';

function App() {
  const [talks, updateTalks] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const talkData = await API.graphql(graphqlOperation(ListTalks));
      console.log(talkData);
      updateTalks(talkData.data.listTalks.items);
    } catch (err) {
      console.log('error fetching talks...', err);
    }
  }

  const renderTalks = talks.map((talk, index) => (
    <div key={index}>
      <h3>{talk.speakerName}</h3>
      <h5>{talk.name}</h5>
      <h5>{talk.description}</h5>
    </div>
  ));

  return <div className='App'>{renderTalks}</div>;
}

export default App;
