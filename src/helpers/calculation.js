const {
  WHEEL_DIAMETER_in,
  TIME_PER_PASS_min,
  NUMBER_OF_PASSES_REQUIRED_TO_PLANE_PER_ACRE,
  TOTAL_FIELD_AREA_acre,
  TOTAL_COST_PER_ACRE_dollar,
  AUGER_LENGTH_ft,
  BASE_COMBINE_WEIGHT_lbs,
} = require('./constants');

const getResult = (wheelDiameterFromUserInput, fuelType, augerLengthFromUserInput) => {
  const COST_INCR_DUE_TO_INCREASE_IN_AUGER_FACTOR = 1.08;
  const COST_INCR_DUE_TO_INCREASE_IN_WHEEL_FACTOR = 1.05;
  const COST_REDUCTION_DUE_TO_ELECTRIC_FACTOR = 0.995;

  const wheelDiaDiff = wheelDiameterFromUserInput - WHEEL_DIAMETER_in;
  const augerLenDiff = augerLengthFromUserInput - AUGER_LENGTH_ft;

  const TIME_REDUCTION_FACTOR = !wheelDiaDiff ? 1 : 0.97;

  const totalNumberOfPassesRequiredToPlane =
    (NUMBER_OF_PASSES_REQUIRED_TO_PLANE_PER_ACRE * TOTAL_FIELD_AREA_acre * AUGER_LENGTH_ft) / augerLengthFromUserInput;

  //find out number of run using electric?
  let totalCostPerRun;
  totalCostPerRun =
    TOTAL_COST_PER_ACRE_dollar *
    TOTAL_FIELD_AREA_acre *
    Math.pow(COST_INCR_DUE_TO_INCREASE_IN_WHEEL_FACTOR, wheelDiaDiff) *
    Math.pow(COST_INCR_DUE_TO_INCREASE_IN_AUGER_FACTOR, augerLenDiff);

  const totalWeight =
    BASE_COMBINE_WEIGHT_lbs *
    Math.pow(COST_INCR_DUE_TO_INCREASE_IN_WHEEL_FACTOR, wheelDiaDiff) *
    Math.pow(COST_INCR_DUE_TO_INCREASE_IN_AUGER_FACTOR, augerLenDiff);
  const totalTimeToPlaneField =
    (totalNumberOfPassesRequiredToPlane * TIME_PER_PASS_min * TIME_REDUCTION_FACTOR) ^ wheelDiaDiff;

  return { totalTimeToPlaneField, totalCostPerRun, totalWeight };
};

module.exports = { getResult };

// A Base Combine weighs 53,000 pounds, with 60-inch wheels, and 8.7 feet wide auger,
// making 240 passes to plane a 10-acre square field with each pass taking 5 min. The base
// fuel type is Diesel with a fuel consumption per 10 acres of 20 gallons. Costing $350 per
// 10 acres.

// Electric Combines are more costly per 10 acres by 25% at the start but with each run
// reducing cost by 0.5 % consistently. Diesel is a fixed cost. Regardless of fuel type the
// cost per 10 acres is a factor of weight with a linear relationship.
