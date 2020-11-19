import React from 'react';
import { ob } from '../helpers/obstaclesGenerator';

const Error = ({ message }) => {
  return (
    <div>
      {ob.map((i, idx) => (
        <p key={idx}>{i}</p>
      ))}
    </div>
  );
};

export default Error;
