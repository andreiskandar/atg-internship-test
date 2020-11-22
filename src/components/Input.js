import React, { useState, useEffect } from 'react';
import FuelTypeInput from './FuelTypeInput';
import { Card, Form, Button, Select, Message } from 'semantic-ui-react';
import './styles.scss';

const Input = ({ onChange, radioChecked, augerLength, wheelDiameter, handleUserInput, fuelType }) => {
  const [state, setState] = useState({
    wheelError: false,
    augerLenError: false,
    fuelTypeError: false,
    success: false,
  });
  useEffect(() => {}, [state.success]);

  const wheelDiameterArr = [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70];
  const wheelDiameterOptions = wheelDiameterArr.map((dia, idx) => ({ key: idx, text: `${dia} in`, value: dia }));
  const augerLengthArray = () => {
    const arr = [];
    for (let i = 8; i < 26; i++) {
      arr.push(i + 0.7);
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
      handleUserInput();
      setState({ ...state, success: true });
      setTimeout(() => {
        setState({ ...state, wheelError: false, augerLenError: false, fuelType: false, success: false });
      }, 3000);
    }
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

    // <div>
    //   <input name='wheelDiameter' onChange={onChange} value={state.wheelDiameter} placeholder='wheel diameter' />
    //   <input
    //     name='augerLength'
    //     onChange={onChange}
    //     value={state.augerLength}
    //     placeholder='augerLength in ft max:25.7'
    //   />
    //   <label>
    //     Diesel
    //     <input type='radio' checked='checked' name='fuelType' value='Diesel' onChange={onChange}></input>
    //     <span className='checkmark'></span>
    //   </label>
    //   <label>
    //     Electric
    //     <span className='checkmark'></span>
    //     <input type='radio' name='fuelType' value='Electric' onChange={onChange}></input>
    //   </label>
    //   <button onClick={createSimulationReport}>Create Report</button>
    // </div>
  );
};

export default Input;
