import React from 'react';
import './styles.scss';
import { useMediaQuery } from 'react-responsive';

const Header = () => {
  const isTabletOrMobile = useMediaQuery({
    query: '(max-width: 1224px)',
  });
  return (
    <div className='header'>
      <div className='title__header num'> {isTabletOrMobile && <span>Simulation Report</span>}#</div>
      <div className='title__header wheelDia'>Wheel Diameter (in)</div>
      <div className='title__header combineWgt'>Total Combine Weight (lbs)</div>
      <div className='title__header augerLen'>Auger Length (ft)</div>
      <div className='title__header'>Fuel Type</div>
      <div className='title__header totalTime'>Total Time To Plane The Field (min)</div>
      <div className='title__header totalCost'>Cost/Run</div>

      <div className='title__header'>Num Of Passes To Plane The Field</div>
    </div>
  );
};

export default Header;
