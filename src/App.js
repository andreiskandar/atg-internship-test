import React, { useEffect, useReducer } from 'react';

import { API, graphqlOperation } from 'aws-amplify';
import { useMediaQuery } from 'react-responsive';

import Header from './components/Header';
import Input from './components/Input';
import Report from './components/Report';
import { v4 as uuidv4 } from 'uuid';
import { listSimulationReports, getNumOfElectricRuns as getNumOfElectricRunsQuery } from './graphql/queries';
import {
  createSimulationReport as CreateSimulationReport,
  createUserInput as CreateUserInput,
} from './graphql/mutations';
import { getResult } from './helpers/calculation';
import { initialState, reducer } from './hooks/useReducer';
import { Container, Button, Tab } from 'semantic-ui-react';

function App() {
  const isTabletOrMobile = useMediaQuery({
    query: '(max-width: 1224px)',
  });

  const panes = [
    {
      menuItem: 'Combine Configuration',
      render: () => (
        <Tab.Pane attached={false}>
          <Input
            handleUserInput={handleUserInput}
            radioChecked={state.radioChecked}
            onChange={onChange}
            fuelType={state.fuelType}
            wheelDiameter={state.wheelDiameter}
            augerLength={state.augerLength}
            dispatch={dispatch}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: 'Log',
      render: () => (
        <Tab.Pane attached={false}>
          <Button primary onClick={getSimulationReport}>
            Refresh
          </Button>
          <br />
          <div>
            {!isTabletOrMobile && <Header />}
            {renderReport}
          </div>
        </Tab.Pane>
      ),
    },
  ];
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getSimulationReport();
  }, []);

  const getSimulationReport = async () => {
    try {
      const reportData = await API.graphql(graphqlOperation(listSimulationReports));

      const sortDataByTimestamp = reportData.data.listSimulationReports.items.sort(
        (a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt.valueOf())
      );
      dispatch({ type: 'SET_REPORT', report: sortDataByTimestamp });
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
      return true;
      // dispatch({ type: 'CLEAR_INPUT' });
    } catch (err) {
      console.log('err from mutating userInput', err);
      return false;
    }
  };

  function onChange(e, data) {
    if (e.target.name === 'fuelType') {
      dispatch({ type: 'SET_RADIO_BTN' });
    }

    if (data) {
      dispatch({ type: 'SET_INPUT', key: data.name, value: data.value });
    } else {
      dispatch({ type: 'SET_INPUT', key: e.target.name, value: e.target.value });
    }
  }

  const renderReport = state.report.map((item, index) => (
    <>
      <Report key={index} item={item} index={index} />
      {isTabletOrMobile && <br />}
    </>
  ));

  return (
    <Container className='App'>
      {/* <Input
        handleUserInput={handleUserInput}
        radioChecked={state.radioChecked}
        onChange={onChange}
        fuelType={state.fuelType}
        wheelDiameter={state.wheelDiameter}
        augerLength={state.augerLength}
        dispatch={dispatch}
      /> */}
      {/* <input name='wheelDiameter' onChange={onChange} value={state.wheelDiameter} placeholder='wheel diameter' />
      <input name='augerLength' onChange={onChange} value={state.augerLength} placeholder='augerLength max:25.7' /> */}
      <Tab menu={{ pointing: true }} panes={panes}></Tab>

      {/* <button onClick={handleUserInput}>Enter</button> */}

      <br />
      {/* {!isTabletOrMobile && <Header />} */}
    </Container>
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
