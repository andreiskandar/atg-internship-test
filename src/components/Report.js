import React from 'react';
import './styles.scss';
import roundTo from 'round-to';
import { WHEEL_DIAMETER_in, AUGER_LENGTH_ft } from '../helpers/constants';

const Report = ({ item, index }) => {
  return (
    <div key={index} className='report_body'>
      <div className='content__report_body'>{index + 1}</div>
      <div className='content__report_body'>{item.wheelDiameter || WHEEL_DIAMETER_in}</div>
      <div className='content__report_body'>{roundTo(item.combineWeight, 0)}</div>
      <div className='content__report_body'>{item.augerLength || AUGER_LENGTH_ft}</div>
      <div className='content__report_body'>{item.fuelType}</div>
      <div className='content__report_body'>Num Of Passes To Plane The Field</div>

      <p>fuel type : {item.fuelType} </p>
      <p>total time to plane the field: {roundTo(item.timeSpentToPlaneTheField, 0)} min</p>
      <p>cost per run: ${roundTo(item.costPerRun, 2)}</p>
    </div>
  );
};

export default Report;
