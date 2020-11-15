import React from 'react';

const FuelTypeInput = ({ onChange, radioChecked }) => {
  return (
    <form>
      <label>
        <input type='radio' name='fuelType' value='Diesel' checked={radioChecked} onChange={onChange}></input>
        Diesel
        <span className='checkmark'></span>
      </label>
      <label>
        <input type='radio' name='fuelType' value='Electric' checked={radioChecked} onChange={onChange}></input>
        Electric
        <span className='checkmark'></span>
      </label>
    </form>
  );
};

export default FuelTypeInput;
