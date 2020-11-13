// const WHEEL_DIAMETER_in = 60;
// const BASE_COMBINE_WEIGHT_lbs = 53000;
// const AUGER_LENGTH_ft = 8.7;
// const TIME_PER_PASS_min = 5;
// const NUMBER_OF_PASSES_REQUIRED_TO_PLANE_PER_ACRE = 24; // = 240passes / 10acres
// const FUEL_CONSUMPTION_PER_ACRE = 2; // = 20gallons / 10acres
// const TOTAL_COST_PER_ACRE_dollar = 35; // = $350 / 10acres

const {
  WHEEL_DIAMETER_in,
  TIME_PER_PASS_min,
  NUMBER_OF_PASSES_REQUIRED_TO_PLANE_PER_ACRE,
  TOTAL_FIELD_AREA_acre,
  TOTAL_COST_PER_ACRE_dollar,
  AUGER_LENGTH_ft,
} = require('./constants');

const getTotalTimeToPlaneField = (wheelDiameterFromUserInput, augerLengthFromUserInput) => {
  const wheelDiaDiff = wheelDiameterFromUserInput - WHEEL_DIAMETER_in;
  const totalNumberOfPassesRequiredToPlane =
    (NUMBER_OF_PASSES_REQUIRED_TO_PLANE_PER_ACRE * TOTAL_FIELD_AREA_acre * AUGER_LENGTH_ft) / augerLengthFromUserInput;

  const TIME_REDUCTION_FACTOR = !wheelDiaDiff ? 1 : 0.97;

  const totalTimeToPlaneField =
    (totalNumberOfPassesRequiredToPlane * TIME_PER_PASS_min * TIME_REDUCTION_FACTOR) ^ wheelDiaDiff;

  return totalTimeToPlaneField;
};
const getTotalCostPerRun = (wheelDiameterFromUserInput, fuelType, augerLengthFromUserInput) => {
  // Increase in Wheel Size by 1-inch results in weight increase by 5%
  // assumption: weight and fuel are linear relationship. Thus increase in weight will increase in fuel consumption
  const wheelDiaDiff = wheelDiameterFromUserInput - WHEEL_DIAMETER_in;
  const augerLenDiff = augerLengthFromUserInput - AUGER_LENGTH_ft;
  const COST_INCR_DUE_TO_INCREASE_IN_AUGER_FACTOR = 1.08;
  const COST_INCR_DUE_TO_INCREASE_IN_WHEEL_FACTOR = 1.05;
  const COST_REDUCTION_DUE_TO_ELECTRIC_FACTOR = 0.995;

  //find out number of run using electric?
  let totalCostPerRun;
  totalCostPerRun =
    TOTAL_COST_PER_ACRE_dollar *
    TOTAL_FIELD_AREA_acre *
    (COST_INCR_DUE_TO_INCREASE_IN_WHEEL_FACTOR ^ wheelDiaDiff) *
    (COST_INCR_DUE_TO_INCREASE_IN_AUGER_FACTOR ^ augerLenDiff);
  // if ('Electrical') {
  // }

  //  Auger length can be altered from the base unit by 1 foot increments up to a maximum
  // auger length of 25.7 feet. 1 increment increase results in weight increase by 8%.

  return totalCostPerRun;
};

module.exports = { getTotalTimeToPlaneField, getTotalCostPerRun };

// A Base Combine weighs 53,000 pounds, with 60-inch wheels, and 8.7 feet wide auger,
// making 240 passes to plane a 10-acre square field with each pass taking 5 min. The base
// fuel type is Diesel with a fuel consumption per 10 acres of 20 gallons. Costing $350 per
// 10 acres.

// Electric Combines are more costly per 10 acres by 25% at the start but with each run
// reducing cost by 0.5 % consistently. Diesel is a fixed cost. Regardless of fuel type the
// cost per 10 acres is a factor of weight with a linear relationship.
