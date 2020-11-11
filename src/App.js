import React, { useEffect, useReducer } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { listTalks as ListTalks, getCoins as listCoins } from './graphql/queries';
import { createTalk as CreateTalk } from './graphql/mutations';

import { API, graphqlOperation } from 'aws-amplify';

const CLIENT_ID = uuidv4();

const initialState = {
  name: '',
  description: '',
  speakerName: '',
  speakerBio: '',
  talks: [],
  coins: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_COINS':
      return { ...state, coins: action.coins };
    case 'SET_TALKS':
      return { ...state, talks: action.talks };
    case 'SET_INPUT':
      return { ...state, [action.key]: action.value };
    case 'CLEAR_INPUT':
      return { ...initialState, talks: state.talks };
    default:
      return state;
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    getData();
  }, []);

  const getCoins = async () => {
    try {
      const coinsData = await API.graphql(graphqlOperation(listCoins));
      console.log('coinsData:', coinsData);
      dispatch({ type: 'SET_COINS', coins: coinsData });
    } catch (err) {
      console.log('error fetching coins...', err);
    }
  };

  async function getData() {
    try {
      const talkData = await API.graphql(graphqlOperation(ListTalks));
      console.log('data from API', talkData);
      dispatch({ type: 'SET_TALKS', talks: talkData.data.listTalks.items });
    } catch (err) {
      console.log('error fetching talks...', err);
    }
  }

  async function createTalk() {
    const { name, description, speakerName, speakerBio } = state;
    if (name === '' || description === '' || speakerBio === '' || speakerName === '') return;

    const talk = { name, description, speakerBio, speakerName, clientId: CLIENT_ID };
    const talks = [...state.talks, talk];

    dispatch({ type: 'SET_TALKS', talks });
    dispatch({ type: 'CLEAR_INPUT' });

    try {
      await API.graphql(graphqlOperation(CreateTalk, { input: talk }));
    } catch (err) {
      console.log('error creating talk', err);
    }
  }
  function onChange(e) {
    dispatch({ type: 'SET_INPUT', key: e.target.name, value: e.target.value });
  }

  const renderTalks = state.talks.map((talk, index) => (
    <div key={index}>
      <h3>
        {talk.speakerName} will talk about {talk.name}
      </h3>
      <h5>{talk.description}</h5>
      <p>{talk.speakerBio}</p>
    </div>
  ));

  return (
    <div>
      <input name='name' onChange={onChange} value={state.name} placeholder='name' />
      <input name='description' onChange={onChange} value={state.description} placeholder='description' />
      <input name='speakerName' onChange={onChange} value={state.speakerName} placeholder='speakerName' />
      <input name='speakerBio' onChange={onChange} value={state.speakerBio} placeholder='speakerBio' />
      <button onClick={createTalk}>Create Talk</button>
      {renderTalks}
    </div>
  );
}

export default App;
