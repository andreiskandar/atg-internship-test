import React, { useEffect, useReducer } from 'react';

import Header from './components/Header';
// import Input from './components/Input';
import FuelTypeInput from './components/FuelTypeInput';
import Report from './components/Report';
import { useMediaQuery } from 'react-responsive';

import { listSimulationReports, getNumOfElectricRuns as getNumOfElectricRunsQuery } from './graphql/queries';
import { createSimulationReport as CreateSimulationReport } from './graphql/mutations';

import { getResult } from './helpers/calculation';

import { API, graphqlOperation } from 'aws-amplify';

const initialState = {
  wheelDiameter: '',
  augerLength: '',
  fuelType: null,
  combineWeight: 53000,
  timeSpentToPlaneTheField: 0,
  percentageOfFieldChosenToCover: 0,
  numOfElectricRuns: 0,
  costPerRun: 0,
  totalEffieciency: 0,
  radioChecked: false,
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
    case 'SET_RADIO_BTN':
      return { ...state, radioChecked: true };

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
    getNumOfElectricRuns();
  }, []);

  const getSimulationReport = async () => {
    try {
      const reportData = await API.graphql(graphqlOperation(listSimulationReports));
      dispatch({ type: 'SET_REPORT', report: reportData.data.listSimulationReports.items });
    } catch (err) {
      console.log('error fetching report...', err);
    }
  };

  const getNumOfElectricRuns = async () => {
    try {
      const electricRuns = await API.graphql(graphqlOperation(getNumOfElectricRunsQuery));
      dispatch({
        type: 'SET_INPUT',
        key: 'numOfElectricRuns',
        value: electricRuns.data.listSimulationReports.items.length,
      });
    } catch (err) {
      console.log('error fetching electric runs', err);
    }
  };

  const createSimulationReport = async () => {
    // getNumOfElectricRuns();
    const { wheelDiameter, augerLength, fuelType } = state;
    let { numOfElectricRuns } = state;

    if (fuelType === 'Electric') {
      dispatch({ type: 'SET_INPUT', key: 'numOfElectricRuns', value: numOfElectricRuns++ });
    }

    // think about edge case when user only changes one of the parameters

    const { totalTimeToPlaneField, totalCostPerRun, totalWeight } = getResult(
      wheelDiameter,
      augerLength,
      fuelType,
      numOfElectricRuns
    );

    const newReport = {
      wheelDiameter: parseInt(wheelDiameter),
      augerLength: parseFloat(augerLength),
      fuelType,
      combineWeight: totalWeight,
      timeSpentToPlaneTheField: totalTimeToPlaneField,
      costPerRun: totalCostPerRun,
      numOfElectricRuns,
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
    if (e.target.name === 'fuelType') {
      dispatch({ type: 'SET_RADIO_BTN' });
    }

    dispatch({ type: 'SET_INPUT', key: e.target.name, value: e.target.value });
  }

  const renderReport = state.report.map((item, index) => (
    <>
      <Report key={index} item={item} index={index} />
      {isTabletOrMobile && <br />}
    </>
  ));

  return (
    <div className='App'>
      <input name='wheelDiameter' onChange={onChange} value={state.wheelDiameter} placeholder='wheel diameter' />
      <input name='augerLength' onChange={onChange} value={state.augerLength} placeholder='augerLength max:25.7' />
      <FuelTypeInput onChange={onChange} radioChecked={state.radioChecked} />
      <button onClick={createSimulationReport}>Create Report</button>

      <br />
      <br />
      <br />
      {!isTabletOrMobile && <Header />}

      {renderReport}
    </div>
  );
}

export default App;

// query getNumOfElectricRuns {
//   listSimulationReports(filter: {fuelType: {eq: "Electric"}}) {
//     items {
//       id
//     }
//   }
// }
