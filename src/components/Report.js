import React from 'react';
import './styles.scss';
import { useMediaQuery } from 'react-responsive';
import Header from './Header';
import roundTo from 'round-to';
import NumberFormat from 'react-number-format';
import { WHEEL_DIAMETER_in, AUGER_LENGTH_ft } from '../helpers/constants';
import moment from 'moment';

const Report = ({ item, index }) => {
  const isTabletOrMobile = useMediaQuery({
    query: '(max-width: 1224px)',
  });

  const className = isTabletOrMobile ? 'isTabletOrMobile center' : 'isTabletOrMobile';
  return (
    <div className={className}>
      {isTabletOrMobile && <Header key={index + Math.random()} />}
      <div key={index} className='report_body'>
        <div className='content__report_body num'>{index + 1}</div>
        <div className='content__report_body timestamp'>
          {moment(item.createdAt).format('ddd, MMM DD, YY, h:mm:ss a')}
        </div>
        {/* <div className='content__report_body timestamp'>{item.createdAt}</div> */}
        <div className='content__report_body wheelDia'>{item.wheelDiameter || WHEEL_DIAMETER_in}</div>
        <div className='content__report_body combineWgt'>
          <NumberFormat value={roundTo(item.combineWeight, 0)} displayType={'text'} thousandSeparator={true} />
        </div>
        <div className='content__report_body augerLen'>{item.augerLength || AUGER_LENGTH_ft}</div>
        <div className='content__report_body fuelType'>{item.fuelType}</div>
        <div className='content__report_body totalTime'>
          <NumberFormat
            value={roundTo(item.timeSpentToPlaneTheField, 0)}
            displayType={'text'}
            thousandSeparator={true}
          />
        </div>
        <div className='content__report_body totalCost'>
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.costPerRun)}
        </div>
        <div className='content__report_body electricRuns'>{item.numOfElectricRuns || 0}</div>
        <div className='content__report_body fieldCoverage'>
          {roundTo(item.percentageOfFieldChosenToCover * 100, 2)}
        </div>
        <div className='content__report_body totalEfficiency'>{roundTo(item.totalEfficiency || 0, 3)}</div>

        {/* <p>fuel type : {item.fuelType} </p>
      <p>total time to plane the field: {roundTo(item.timeSpentToPlaneTheField, 0)} min</p>
      <p>cost per run: ${roundTo(item.costPerRun, 2)}</p> */}
      </div>
    </div>
  );
};

export default Report;
