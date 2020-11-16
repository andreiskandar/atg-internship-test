import React from 'react';
import './styles.scss';
import { useMediaQuery } from 'react-responsive';

const Header = () => {
  const isTabletOrMobile = useMediaQuery({
    query: '(max-width: 1224px)',
  });
  return (
    <div className='header'>
      <div className='title__header num'>{isTabletOrMobile && <span>Simulation Report</span>}#</div>
      <div className='title__header wheelDia'>Wheel Diameter (in)</div>
      <div className='title__header combineWgt'>Total Combine Weight (lbs)</div>
      <div className='title__header augerLen'>Auger Length (ft)</div>
      <div className='title__header fuelType'>Fuel Type</div>
      <div className='title__header totalTime'>Time Taken To Plane The Field (min)</div>
      <div className='title__header totalCost'>Cost/Run 10 Acre</div>
      <div className='title__header electricRuns'># Electric Runs</div>
      <div className='title__header fieldCoverage'>Field Chosen Coverage (%)</div>
      <div className='title__header totalEfficiency'>Total Efficiency (%)</div>
    </div>
  );
};

export default Header;
