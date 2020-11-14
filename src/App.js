import React, { useEffect, useReducer } from 'react';

import Header from './components/Header';
// import Input from './components/Input';
import Report from './components/Report';
import { useMediaQuery } from 'react-responsive';

import { listSimulationReports } from './graphql/queries';
import { createSimulationReport as CreateSimulationReport } from './graphql/mutations';

import { getResult } from './helpers/calculation';

import { API, graphqlOperation } from 'aws-amplify';

const initialState = {
  wheelDiameter: '',
  augerLength: '',
  fuelType: 'Diesel',
  combineWeight: 53000,
  timeSpentToPlaneTheField: 0,
  percentageOfFieldChosenToCover: 0,
  numElectricRuns: 0,
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
  const isTabletOrMobile = useMediaQuery({
    query: '(max-width: 1224px)',
  });

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getSimulationReport();
  }, [state.numElectricRuns]);

  const getSimulationReport = async () => {
    try {
      const reportData = await API.graphql(graphqlOperation(listSimulationReports));
      dispatch({ type: 'SET_REPORT', report: reportData.data.listSimulationReports.items });

      const electricRuns = state.report.filter((run) => run.fuelType === 'Electric').length;
      dispatch({ type: 'SET_INPUT', key: 'numElectricRuns', value: electricRuns });
    } catch (err) {
      console.log('error fetching report...', err);
    }
  };

  const renderReport = state.report.map((item, index) => (
    <>
      <Report key={index} item={item} index={index} />
      {isTabletOrMobile && <br />}
    </>
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

      {!isTabletOrMobile && <Header />}
      {renderReport}
    </div>
  );
}

export default App;

// time_per_pass: Float!
//   time_taken_to_plane_the_field: Float!
//   total_efficiency: Float!
