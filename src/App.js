import React, { useEffect, useReducer } from 'react';

import Header from './components/Header';

import roundTo from 'round-to';
import { listSimulationReports } from './graphql/queries';
import { createSimulationReport as CreateSimulationReport } from './graphql/mutations';
import { WHEEL_DIAMETER_in, AUGER_LENGTH_ft } from './helpers/constants';

import { getResult } from './helpers/calculation';

import { API, graphqlOperation } from 'aws-amplify';

const initialState = {
  wheelDiameter: '',
  augerLength: '',
  fuelType: 'Diesel',
  combineWeight: 53000,
  timeSpentToPlaneTheField: 0,
  percentageOfFieldChosenToCover: 0,
  costPerRun: 0,
  totalEffieciency: 0,
  report: [],
};

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
      <p>wheel size : {item.wheelDiameter || WHEEL_DIAMETER_in} in</p>
      <p>combine weight : {roundTo(item.combineWeight, 0)} lbs</p>
      <p>auger length : {item.augerLength || AUGER_LENGTH_ft} ft </p>
      <p>fuel type : {item.fuelType} </p>
      <p>total time to plane the field: {roundTo(item.timeSpentToPlaneTheField, 0)} min</p>
      <p>cost per run: ${roundTo(item.costPerRun, 2)}</p>
    </div>
  ));

  const createSimulationReport = async () => {
    const { wheelDiameter, augerLength, fuelType } = state;
    // think about edge case when user only changes one of the parameters

    const { totalTimeToPlaneField, totalCostPerRun, totalWeight } = getResult(wheelDiameter, fuelType, augerLength);

    const newReport = {
      wheelDiameter: parseInt(wheelDiameter),
      augerLength: parseFloat(augerLength),
      fuelType,
      combineWeight: totalWeight,
      timeSpentToPlaneTheField: totalTimeToPlaneField,
      costPerRun: totalCostPerRun,
    };

    const report = [...state.report, newReport];
    dispatch({ type: 'SET_REPORT', report });
    dispatch({ type: 'CLEAR_INPUT' });

    try {
      await API.graphql(graphqlOperation(CreateSimulationReport, { input: newReport }));
    } catch (err) {
      console.log('error creating simulation report', err);
    }
  };

  function onChange(e) {
    dispatch({ type: 'SET_INPUT', key: e.target.name, value: e.target.value });
  }

  return (
    <div className='App'>
      <Header />
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
        Electric
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
//   cost_per_run: Float!
//   total_efficiency: Float!
