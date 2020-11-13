import React, { useEffect, useReducer } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { listSimulationReports } from './graphql/queries';
import { createSimulationReport as CreateSimulationReport } from './graphql/mutations';
import {
  WHEEL_DIAMETER_in,
  BASE_COMBINE_WEIGHT_lbs,
  AUGER_LENGTH_ft,
  TIME_PER_PASS_min,
  TOTAL_COST_PER_ACRE_dollar,
  NUMBER_OF_PASSES_REQUIRED_TO_PLANE_PER_ACRE,
  FUEL_CONSUMPTION_PER_ACRE,
} from './helpers/constants';

import { getTotalTimeToPlaneField, getTotalCostPerRun } from './helpers/calculation';

import { API, graphqlOperation } from 'aws-amplify';

const REPORT_ID = uuidv4();

const initialState = {
  wheelDiameter: '',
  augerLength: '',
  fuelType: 'Diesel',
  combineWeight: 53000,
  timeTakenToPlaneTheField: 0,
  percentageOfFieldChosenToCover: 0,
  costPerRun: 0,
  totalEffieciency: 0,
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
    case 'SET_REPORT':
      return { ...state, report: action.report };
    case 'SET_INPUT':
      return { ...state, [action.key]: action.value };
    case 'CLEAR_INPUT':
      return { ...initialState, report: state.report };

    default:
      return state;
  }
}
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    getSimulationReport();
  }, []);

  const getSimulationReport = async () => {
    try {
      const reportData = await API.graphql(graphqlOperation(listSimulationReports));
      dispatch({ type: 'SET_REPORT', report: reportData.data.listSimulationReports.items });
    } catch (err) {
      console.log('error fetching report...', err);
    }
  };

  const renderReport = state.report.map((item, index) => (
    <div key={index}>
      <h2>report {index + 1}</h2>
      <p>wheel size : {item.wheelDiameter} in</p>
      <p>combine weight : {item.combineWeight} lbs</p>
      <p>auger length : {item.augerLength} ft </p>
      <p>fuel type : {item.fuelType} </p>
    </div>
  ));

  const createSimulationReport = async () => {
    const { wheelDiameter, augerLength, fuelType, combineWeight } = state;

    const newReport = { wheelDiameter, augerLength, fuelType, combineWeight, reportId: REPORT_ID };
    const report = [...state.report, newReport];
    dispatch({ type: 'SET_REPORT', report });
    dispatch({ type: 'CLEAR_INPUT' });
    console.log('state.report:', state.report);

    try {
      await API.graphql(graphqlOperation(CreateSimulationReport, { input: newReport }));
    } catch (err) {
      console.log('error creating simulation report', err);
    }
    const totalTimeToPlaneField = getTotalTimeToPlaneField();
  };

  function onChange(e) {
    dispatch({ type: 'SET_INPUT', key: e.target.name, value: e.target.value });
  }

  const fuelTypeSelected = (e) => {
    e.preventDefault();
    dispatch({ type: 'SET_FUEL_TYPE', fuel_type: e.target.value });
  };

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
        <input type='radio' checked='checked' name='fuelType' value='Diesel' onChange={onChange}></input>
        <span className='checkmark'></span>
      </label>
      <label>
        Electrical
        <span className='checkmark'></span>
        <input type='radio' name='fuelType' value='Electric' onChange={onChange}></input>
      </label>
      <button onClick={createSimulationReport}>Create Report</button>
      {renderReport}
    </div>
  );
}

export default App;

// time_per_pass: Float!
//   time_taken_to_plane_the_field: Float!
//   percentage_of_field_chosen_to_cover: Float!
//   cost_per_run: Float!
//   total_efficiency: Float!
