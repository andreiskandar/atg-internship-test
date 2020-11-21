import React, { useEffect, useReducer } from 'react';

import { API, graphqlOperation } from 'aws-amplify';
import { useMediaQuery } from 'react-responsive';

import Header from './components/Header';
// import Input from './components/Input';
import FuelTypeInput from './components/FuelTypeInput';
import Report from './components/Report';
import Error from './components/Error';
import { v4 as uuidv4 } from 'uuid';
import { listSimulationReports, getNumOfElectricRuns as getNumOfElectricRunsQuery } from './graphql/queries';
import {
  createSimulationReport as CreateSimulationReport,
  createUserInput as CreateUserInput,
} from './graphql/mutations';
import { getResult } from './helpers/calculation';
import { initialState, reducer } from './hooks/useReducer';

function App() {
  const isTabletOrMobile = useMediaQuery({
    query: '(max-width: 1224px)',
  });

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // getSimulationReport();
    getNumOfElectricRuns();
  }, []);

  const getSimulationReport = async () => {
    try {
      const reportData = await API.graphql(graphqlOperation(listSimulationReports));

      const sortData = await reportData.data.listSimulationReports.items.sort(
        (a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt.valueOf())
      );
      console.log(state.report);
      dispatch({ type: 'SET_REPORT', report: sortData });

      // state.report.sort((a, b) => a.createdAt - b.createdAt)
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

    const id = uuidv4();
    const newReport = {
      id: id,
      wheelDiameter: parseInt(wheelDiameter),
      augerLength: parseFloat(augerLength),
      fuelType,
      combineWeight: totalWeight,
      timeSpentToPlaneTheField: totalTimeToPlaneField,
      costPerRun: totalCostPerRun,
      numOfElectricRuns,
    };

    try {
      await API.graphql(graphqlOperation(CreateSimulationReport, { input: newReport }));
      const report = [...state.report, newReport];
      dispatch({ type: 'SET_REPORT', report });
      dispatch({ type: 'CLEAR_INPUT' });
    } catch (err) {
      console.log('error creating simulation report', err);
    }
  };

  const handleUserInput = async () => {
    const { wheelDiameter, augerLength, fuelType } = state;
    const userInput = { wheelDiameter, augerLength, fuelType };
    try {
      await API.graphql(graphqlOperation(CreateUserInput, { input: userInput }));
      dispatch({ type: 'CLEAR_INPUT' });
    } catch (err) {
      console.log('err from mutating userInput', err);
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
      <button onClick={getSimulationReport}>Generate Report</button>
      <button onClick={handleUserInput}>Enter</button>

      <br />
      <br />
      <br />
      {!isTabletOrMobile && <Header />}

      {renderReport}
    </div>
  );
}

export default App;

// export const getNumOfElectricRuns = `
// query getNumOfElectricRuns {
//   listSimulationReports(filter: {fuelType: {eq: "Electric"}}) {
//     items {
//       id
//     }
//   }
// }
// `;

// create lambda function to run hourly and insert into report table

// type simulationReport
// @model
//   {
//   id: ID!
//   combineWeight: Float!
//   wheelDiameter: Int!
//   fuelType: String!
//   augerLength: Float!
//   timeSpentToPlaneTheField: Float
//   costPerRun: Float
//   percentageOfFieldChosenToCover: Float
//   numOfElectricRuns: Int
// }

// type userInput @model {
//   id: ID!
//   wheelDiameter: Int!
//   fuelType: String!
//   augerLength: Float!
// }
