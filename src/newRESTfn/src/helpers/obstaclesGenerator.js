const { TOTAL_FIELD_AREA_sqft } = require('./constants');

const rand = () => {
  const min = 0;
  const max = Math.sqrt(TOTAL_FIELD_AREA_sqft);
  return Math.ceil(Math.floor(Math.random() * max) + min);
};

const eqArrays = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    const areArrays = Array.isArray(arr1[i]) && Array.isArray(arr2[i]);
    const areNotArrays = !Array.isArray(arr1[i]) && !Array.isArray(arr2[i]);
    const areNotEqual = arr1[i] !== arr2[i];
    if ((areArrays && !eqArrays(arr1[i], arr2[i])) || (areNotArrays && areNotEqual) || (!areArrays && !areNotArrays)) {
      return false;
    }
  }
  return true;
};

const obstaclesCoordinate = () => {
  let ob = [];
  for (let i = 0; i < 3; i++) {
    ob[i] = [rand(), rand()];
  }

  if (eqArrays(ob[0], ob[1]) || eqArrays(ob[0], ob[2]) || eqArrays(ob[1], ob[2])) {
    ob = obstaclesCoordinate();
  }

  return ob;
};

module.exports = { obstaclesCoordinate };
