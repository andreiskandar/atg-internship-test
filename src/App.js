import React, { useEffect, useReducer } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { useMediaQuery } from 'react-responsive';
import Header from './components/Header';
import Input from './components/Input';
import Report from './components/Report';
import { listSimulationReports } from './graphql/queries';
import { createUserInput as CreateUserInput } from './graphql/mutations';
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
          <h3 className='title'>Combine Automation Log Report </h3>
          <Button primary onClick={getSimulationReport}>
            Refresh
          </Button>
          <br />
          {!isTabletOrMobile && renderReport && <Header />}

          <div>{renderReport}</div>
        </Tab.Pane>
      ),
    },
  ];
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // getSimulationReport();
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

  const handleUserInput = async () => {
    const { wheelDiameter, augerLength, fuelType } = state;
    const userInput = { wheelDiameter, augerLength, fuelType };
    try {
      await API.graphql(graphqlOperation(CreateUserInput, { input: userInput }));
      return true;
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
      <h2>Combine Automation Report Simulator</h2>
      <Tab menu={{ pointing: true }} panes={panes}></Tab>
    </Container>
  );
}

export default App;
