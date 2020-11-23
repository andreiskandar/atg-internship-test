// 10 Acre field has 660' x 660'
const { TOTAL_FIELD_AREA_sqft } = require('./constants');
const side = Math.sqrt(TOTAL_FIELD_AREA_sqft);
const AREA = TOTAL_FIELD_AREA_sqft;

const totalPercentageCoverage = (ob, augerLength) => {
  let planeInYCoverage = 0,
    planeInXCoverage = 0;

  const [[a0, a1], [b0, b1], [c0, c1]] = ob;

  const turnXInA = Math.floor(a0 / augerLength);
  const turnXInB = Math.floor(b0 / augerLength);
  const turnXInC = Math.floor(c0 / augerLength);
  const turnYInA = Math.floor(a1 / augerLength);
  const turnYInB = Math.floor(b1 / augerLength);
  const turnYInC = Math.floor(c1 / augerLength);

  const coverage = (augerLengthUnit) => 1 - (augerLengthUnit * augerLength * side) / AREA;

  const allObstaclesScatteredAllOver_X = turnXInA !== turnXInB && turnXInA !== turnXInC && turnXInB !== turnXInC;
  const twoObstaclesInAgroup_X = turnXInA === turnXInB || turnXInA === turnXInC || turnXInB === turnXInC;
  const allObstaclesScatteredAllOver_Y = turnYInA !== turnYInB && turnYInA !== turnYInC && turnYInB !== turnYInC;
  const twoObstaclesInAgroup_Y = turnYInA === turnYInB || turnYInA === turnYInC || turnYInB === turnYInC;

  planeInYCoverage = twoObstaclesInAgroup_X ? coverage(2) : allObstaclesScatteredAllOver_X ? coverage(3) : coverage(1);
  planeInXCoverage = twoObstaclesInAgroup_Y ? coverage(2) : allObstaclesScatteredAllOver_Y ? coverage(3) : coverage(1);

  return planeInYCoverage < planeInXCoverage ? planeInXCoverage : planeInYCoverage;
};

module.exports = { totalPercentageCoverage };
