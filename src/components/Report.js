import React from 'react';
import './styles.scss';
import roundTo from 'round-to';
import { WHEEL_DIAMETER_in, AUGER_LENGTH_ft } from '../helpers/constants';

const Report = ({ item, index }) => {
  return (
    <div key={index} className='report_body'>
      <div className='content__report_body num'>{index + 1}</div>
      <div className='content__report_body wheelDia'>{item.wheelDiameter || WHEEL_DIAMETER_in}</div>
      <div className='content__report_body combineWgt'>{roundTo(item.combineWeight, 0)}</div>
      <div className='content__report_body augerLen'>{item.augerLength || AUGER_LENGTH_ft}</div>
      <div className='content__report_body fuelType'>{item.fuelType}</div>
      <div className='content__report_body totalTime'>{roundTo(item.timeSpentToPlaneTheField, 0)}</div>
      <div className='content__report_body totalCost'>$ {roundTo(item.costPerRun, 2)}</div>
      <div className='content__report_body numPasses'></div>

      {/* <p>fuel type : {item.fuelType} </p>
      <p>total time to plane the field: {roundTo(item.timeSpentToPlaneTheField, 0)} min</p>
      <p>cost per run: ${roundTo(item.costPerRun, 2)}</p> */}
    </div>
  );
};

export default Report;
