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
      setState({ ...state, wheelError: true });
    }
    if (!augerLength) {
      setState({ ...state, augerLenError: true });
    }
    if (!fuelType) {
      setState({ ...state, fuelTypeError: true });
    }
    if (wheelDiameter && augerLength && fuelType) {
      const success = handleUserInput();
      if (success) {
        setState({ ...state, success: true });
      }
    }

    setTimeout(() => {
      dispatch({ type: 'CLEAR_INPUT' });

      setState({ ...state, wheelError: false, augerLenError: false, fuelType: false, success: false });
    }, 3000);
  };

  return (
    <Card>
      <h3>Combine Configuration</h3>
      <Form success={state.success}>
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
          error={state.wheelError}
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
          error={state.augerLenError}
        />

        <FuelTypeInput onChange={onChange} radioChecked={radioChecked} error={state.fuelTypeError} />
        <Message success header='Combine Submitted' />
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
  );
};

export default Input;
