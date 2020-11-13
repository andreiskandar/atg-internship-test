import React, { useEffect, useReducer } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { listTalks as ListTalks, getCoins as listCoins } from './graphql/queries';
import { listSimulationReports } from './graphql/queries';
import { createTalk as CreateTalk } from './graphql/mutations';
import {
  WHEEL_DIAMETER_in,
  BASE_COMBINE_WEIGHT_lbs,
  AUGER_LENGTH_ft,
  TIME_PER_PASS_min,
  TOTAL_COST_PER_ACRE_dollar,
  NUMBER_OF_PASSES_REQUIRED_TO_PLANE_PER_ACRE,
  FUEL_CONSUMPTION_PER_ACRE,
} from './helpers/constants';

import { API, graphqlOperation } from 'aws-amplify';

const CLIENT_ID = uuidv4();

const initialState = {
  name: '',
  description: '',
  speakerName: '',
  speakerBio: '',
  wheelDiameter: '',
  augerLength: '',
  combineWeight: 53000,
  timeTakenToPlaneTheField: 0,
  percentageOfFieldChosenToCover: 0,
  costPerRun: 0,
  totalEffieciency: 0,
  talks: [],
  coins: [],
  report: [],
};

// CONSTANTS
// const WHEEL_DIAMETER_in = 60;
// const BASE_COMBINE_WEIGHT_lbs = 53000;
// const AUGER_LENGTH_ft = 8.7;
// const TIME_PER_PASS_min = 5;
// const NUMBER_OF_PASSES_REQUIRED_TO_PLANE_PER_ACRE = 24; // = 240passes / 10acres
// const FUEL_CONSUMPTION_PER_ACRE = 2; // = 20gallons / 10acres
// const TOTAL_COST_PER_ACRE_dollar = 35; // = $350 / 10acres

function reducer(state, action) {
  switch (action.type) {
    case 'SET_COINS':
      return { ...state, coins: action.coins };
    case 'SET_TALKS':
      return { ...state, talks: action.talks };
    case 'SET_REPORT':
      return { ...state, report: action.report };
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
    // getData();
    getSimulationReport();
    getCoins();
  }, []);

  const getSimulationReport = async () => {
    try {
      const reportData = await API.graphql(graphqlOperation(listSimulationReports));
      dispatch({ type: 'SET_REPORT', report: reportData.data.listSimulationReports.items });
    } catch (err) {
      console.log('error fetching report...', err);
    }
  };

  const createReport = async () => {};

  const getCoins = async () => {
    try {
      const coinsData = await API.graphql(graphqlOperation(listCoins));
      console.log('coinsData:', coinsData);
      dispatch({ type: 'SET_COINS', coins: coinsData.data.getCoins });
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

  const renderCoins = state.coins.map((coin) => (
    <div key={coin.id}>
      <p>
        {coin.name}({coin.symbol}) = ${coin.price_usd}{' '}
      </p>
    </div>
  ));

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
    <div className='App'>
      <input name='wheelDiameter' onChange={onChange} value={state.wheelDiameter} placeholder='wheel diameter' />
      <input
        name='augerLength'
        onChange={onChange}
        value={state.augerLength}
        placeholder='augerLength in ft max:25.7'
      />
      <label>
        Diesel
        <input type='radio' checked='checked'></input>
        <span class='checkmark'></span>
      </label>
      <label>
        Electrical
        <span class='checkmark'></span>
        <input type='radio'></input>
      </label>
      <button onClick={createTalk}>Create Report</button>
      {renderCoins}
    </div>
  );
}

export default App;
