import React from 'react';
import './styles.scss';

const Header = () => {
  return (
    <div className='header'>
      <div className='title__header'>#</div>
      <div className='title__header'>Wheel Diameter (in)</div>
      <div className='title__header'>Total Combine Weight (lbs)</div>
      <div className='title__header'>Auger Length (ft)</div>
      <div className='title__header'>Fuel Type</div>
      <div className='title__header'>Num Of Passes To Plane The Field</div>
    </div>
  );
};

export default Header;
