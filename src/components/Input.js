import React, { useState, useEffect } from 'react';
import FuelTypeInput from './FuelTypeInput';
import { Card, Form, Button, Select, Message } from 'semantic-ui-react';
import './styles.scss';

const Input = ({ dispatch, onChange, radioChecked, augerLength, wheelDiameter, handleUserInput, fuelType }) => {
  const minAugerLength = 8.7;
  const maxAugerLength = 25.7;

  const [state, setState] = useState({
    wheelError: false,
    augerLenError: false,
    fuelTypeError: false,
    success: false,
    error: false,
  });

  useEffect(() => {}, [state]);

  const wheelDiameterArr = [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70];
  const wheelDiameterOptions = wheelDiameterArr.map((dia, idx) => ({ key: idx, text: `${dia} in`, value: dia }));

  const augerLengthArray = () => {
    const arr = [];
    for (let i = minAugerLength; i <= maxAugerLength; i++) {
      arr.push(i);
    }
    return arr;
  };
  const augerLengthOptions = augerLengthArray().map((len, idx) => ({ key: idx, text: `${len} ft`, value: len }));

  const validate = () => {
    if (!wheelDiameter) {
      setState((prev) => ({ ...prev, wheelError: true }));
    }
    if (!augerLength) {
      setState((prev) => ({ ...prev, augerLenError: true }));
    }
    if (!fuelType) {
      setState((prev) => ({ ...prev, fuelTypeError: true }));
    }
    if (wheelDiameter && augerLength && fuelType) {
      handleUserInput().then((success) => {
        if (success) {
          setState({ ...state, success: true });
        } else {
          setState({ ...state, error: true });
        }
      });
    }

    setTimeout(() => {
      dispatch({ type: 'CLEAR_INPUT' });

      setState({ ...state, wheelError: false, augerLenError: false, fuelType: false, success: false, error: false });
    }, 3000);
  };

  return (
    <>
      <Card>
        <h3>Combine Configuration</h3>
        <Form success={state.success} error={state.error}>
          <Form.Field
            width={8}
            name='wheelDiameter'
            onChange={onChange}
            control={Select}
            options={wheelDiameterOptions}
            value={wheelDiameter}
            label='Wheel Diameter'
            placeholder='Wheel Diameter'
            search
            searchInput={{ id: 'form-select-control-wheelDiameter' }}
            error={
              state.wheelError && {
                content: 'Please enter wheel diameter',
                pointing: 'above',
              }
            }
          />
          <Form.Field
            width={8}
            name='augerLength'
            control={Select}
            onChange={onChange}
            options={augerLengthOptions}
            value={augerLength}
            label='Auger Length'
            placeholder='Auger Length'
            search
            searchInput={{ id: 'form-select-control-augerLength' }}
            error={state.augerLenError && { content: 'Please enter auger length', pointing: 'above' }}
          />

          <FuelTypeInput onChange={onChange} radioChecked={radioChecked} error={state.fuelTypeError} />
          <Message success header='Combine Submitted' />
          <Message error header='Something went wrong' />
          <div>
            <Button
              primary
              className='submit'
              // onClick={handleUserInput}
              onClick={validate}
            >
              Submit
            </Button>
          </div>
        </Form>
      </Card>
    </>
  );
};

export default Input;
