import React from 'react';
import './styles.scss';

const FuelTypeInput = ({ onChange, radioChecked, error }) => {
  const fuelTypeClass = error ? 'fuelType radio error' : 'fuelType radio';
  return (
    <div className={fuelTypeClass}>
      <p>
        <strong>Fuel Type</strong>
      </p>
      <div>
        <label>
          <input type='radio' name='fuelType' value='Diesel' checked={radioChecked} onChange={onChange}></input>
          <span className='checkmark'>Diesel</span>
        </label>
        <label>
          <input type='radio' name='fuelType' value='Electric' checked={radioChecked} onChange={onChange}></input>
          <span className='checkmark'>Electric</span>
        </label>
      </div>
    </div>
  );
};

export default FuelTypeInput;
