// CONSTANTS
const WHEEL_DIAMETER_in = 60;
const BASE_COMBINE_WEIGHT_lbs = 53000;
const AUGER_LENGTH_ft = 8.7;
const TIME_PER_PASS_min = 5;
const TOTAL_PASS_TO_PLANE_PER_ACRE = 24; // = 240passes / 10acres
const FUEL_CONSUMPTION_PER_ACRE = 2; // = 20gallons / 10acres
const TOTAL_COST_PER_ACRE_dollar = 35; // = $350 / 10acres

module.exports = {
  WHEEL_DIAMETER_in,
  BASE_COMBINE_WEIGHT_lbs,
  AUGER_LENGTH_ft,
  TIME_PER_PASS_min,
  TOTAL_COST_PER_ACRE_dollar,
  TOTAL_PASS_TO_PLANE_PER_ACRE,
  FUEL_CONSUMPTION_PER_ACRE,
};
