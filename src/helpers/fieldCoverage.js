// 10 Acre field has 660' x 660'
import { obstaclesCoordinate } from './obstaclesGenerator';
import { TOTAL_FIELD_AREA_sqft as AREA } from './constants';
const side = 660;

const ob = obstaclesCoordinate();
console.log('ob:', ob);
const totalPercentageCoverage = (ob) => {
  let hrzPattern = 0,
    vrtPattern = 0,
    planeInYCoverage = 0,
    planeInXCoverage = 0;

  const [a0, a1] = ob[0];
  const [b0, b1] = ob[1];
  const [c0, c1] = ob[2];
  const diff_X_a_b = Math.abs(a0 - b0);
  const diff_X_a_c = Math.abs(a0 - c0);
  const diff_X_b_c = Math.abs(b0 - c0);
  const max_X_a_b_c = Math.max(a0, b0, c0);
  const min_X_a_b_c = Math.min(a0, b0, c0);
  const diff_min_max_x = max_X_a_b_c - min_X_a_b_c;

  const diff_Y_a_b = Math.abs(a1 - b1);
  const diff_Y_a_c = Math.abs(a1 - c1);
  const diff_Y_b_c = Math.abs(b1 - c1);
  const max_Y_a_b_c = Math.max(a1, b1, c1);
  const min_Y_a_b_c = Math.min(a1, b1, c1);
  const diff_min_max_y = max_Y_a_b_c - min_Y_a_b_c;

  ////////////////////////////////////////////////////////////////////////////////////////////////
  if (diff_X_a_b < augerLength) {
    hrzPattern++;
  }
  if (diff_X_a_c < augerLength) {
    hrzPattern++;
  }
  if (diff_X_b_c < augerLength) {
    hrzPattern++;
  }
  console.log('hrzPattern:', hrzPattern);

  // obstacles in a group
  if (hrzPattern === 3 && diff_min_max_x < augerLength) {
    console.log('im here');
    planeInYCoverage = 1 - (diff_min_max_x * side) / AREA;
  } // obstacles in two group
  else if (hrzPattern === 1) {
    console.log('im here');
    planeInYCoverage =
      diff_X_a_b < augerLength
        ? 1 - (diff_X_a_b * side) / AREA
        : diff_X_a_c < augerLength
        ? 1 - (diff_X_a_c * side) / AREA
        : 1 - (diff_X_b_c * side) / AREA;
  } else if (hrzPattern === 2) {
    if (diff_X_a_b + diff_X_a_c < 2 * augerLength) {
      console.log('im here');
      planeInYCoverage = 1 - ((diff_X_a_b + diff_X_a_c) * side) / AREA;
    } else {
      console.log('im here');
      planeInYCoverage = 1 - ((diff_X_a_c + diff_X_b_c) * side) / AREA;
    }
  } else {
    console.log('im here');
    planeInYCoverage = 1 - (3 * side) / AREA;
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////
  if (diff_Y_a_b < augerLength) {
    vrtPattern++;
  }
  if (diff_Y_a_c < augerLength) {
    vrtPattern++;
  }
  if (diff_Y_b_c < augerLength) {
    vrtPattern++;
  }

  console.log('vrtPattern:', vrtPattern);
  // obstacles in a group
  if (vrtPattern === 3 && diff_min_max_y < augerLength) {
    console.log('im here');
    planeInXCoverage = 1 - (diff_min_max_y * side) / AREA;
  } // obstacles in two group
  else if (vrtPattern === 1) {
    console.log('im here');
    planeInXCoverage =
      diff_Y_a_b < augerLength
        ? 1 - (diff_Y_a_b * side) / AREA
        : diff_Y_a_c < augerLength
        ? 1 - (diff_Y_a_c * side) / AREA
        : 1 - (diff_Y_b_c * side) / AREA;
  } else if (vrtPattern === 2) {
    if (diff_Y_a_b + diff_Y_a_c < 2 * augerLength) {
      console.log('im here');
      planeInXCoverage = 1 - ((diff_Y_a_b + diff_Y_a_c) * side) / AREA;
    } else {
      console.log('im here');
      planeInXCoverage = 1 - ((diff_Y_a_c + diff_Y_b_c) * side) / AREA;
    }
  } else {
    console.log('im here');
    // obstacles are scattered all over the field
    planeInXCoverage = 1 - (3 * side) / AREA;
  }

  return planeInXCoverage === planeInYCoverage
    ? planeInXCoverage
    : planeInYCoverage > planeInXCoverage
    ? planeInYCoverage
    : planeInXCoverage;
};

console.log('ob:', ob);
console.log('totalPercentageCoverage:', totalPercentageCoverage(ob));

module.exports = { totalPercentageCoverage };
