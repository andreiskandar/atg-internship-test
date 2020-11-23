const {
  WHEEL_DIAMETER_in,
  TIME_PER_PASS_min,
  NUMBER_OF_PASSES_REQUIRED_TO_PLANE_PER_ACRE,
  TOTAL_FIELD_AREA_acre,
  TOTAL_COST_PER_ACRE_dollar,
  AUGER_LENGTH_ft,
  BASE_COMBINE_WEIGHT_lbs,
} = require('./constants');

const getResult = (
  wheelDiameterFromUserInput,
  augerLengthFromUserInput,
  fuelType,
  numOfElectricRuns,
  pctFieldChosenToCover
) => {
  const COST_INCR_DUE_TO_INCREASE_IN_AUGER_FACTOR = 1.08;
  const COST_INCR_DUE_TO_INCREASE_IN_WHEEL_FACTOR = 1.05;
  const COST_REDUCTION_DUE_TO_ELECTRIC_FACTOR = 0.995;
  const COST_USE_ELECTRIC_COMBINE_FACTOR = 1.25;

  const wheelDiaDiff = wheelDiameterFromUserInput - WHEEL_DIAMETER_in;
  const augerLenDiff = augerLengthFromUserInput - AUGER_LENGTH_ft;

  const TIME_REDUCTION_FACTOR = !wheelDiaDiff ? 1 : 0.97;

  const totalNumberOfPassesRequiredToPlane =
    (NUMBER_OF_PASSES_REQUIRED_TO_PLANE_PER_ACRE * TOTAL_FIELD_AREA_acre * AUGER_LENGTH_ft) / augerLengthFromUserInput;

  const dieselCost =
    TOTAL_COST_PER_ACRE_dollar *
    TOTAL_FIELD_AREA_acre *
    Math.pow(COST_INCR_DUE_TO_INCREASE_IN_WHEEL_FACTOR, wheelDiaDiff) *
    Math.pow(COST_INCR_DUE_TO_INCREASE_IN_AUGER_FACTOR, augerLenDiff);

  const electricCost =
    numOfElectricRuns === 1
      ? dieselCost * COST_USE_ELECTRIC_COMBINE_FACTOR
      : dieselCost *
        COST_USE_ELECTRIC_COMBINE_FACTOR *
        Math.pow(COST_REDUCTION_DUE_TO_ELECTRIC_FACTOR, numOfElectricRuns - 1);

  const totalCostPerRun = fuelType === 'Electric' ? electricCost : dieselCost;

  const totalWeight =
    BASE_COMBINE_WEIGHT_lbs *
    Math.pow(COST_INCR_DUE_TO_INCREASE_IN_WHEEL_FACTOR, wheelDiaDiff) *
    Math.pow(COST_INCR_DUE_TO_INCREASE_IN_AUGER_FACTOR, augerLenDiff);

  const totalTimeToPlaneField =
    (totalNumberOfPassesRequiredToPlane * TIME_PER_PASS_min * TIME_REDUCTION_FACTOR) ^ wheelDiaDiff;

  return { totalTimeToPlaneField, totalCostPerRun, totalWeight };
};

const getTotalEfficiency = (hourlyReportArray) => {};

module.exports = { getResult, getTotalEfficiency };
