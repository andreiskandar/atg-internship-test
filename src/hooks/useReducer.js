const initialState = {
  wheelDiameter: '',
  augerLength: '',
  fuelType: null,
  combineWeight: 53000,
  timeSpentToPlaneTheField: 0,
  percentageOfFieldChosenToCover: 0,
  numOfElectricRuns: 0,
  costPerRun: 0,
  totalEffieciency: 0,
  radioChecked: false,
  report: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_REPORT':
      return { ...state, report: action.report };
    case 'SET_INPUT':
      return { ...state, [action.key]: action.value };
    case 'CLEAR_INPUT':
      return { ...initialState, report: state.report };
    case 'SET_RADIO_BTN':
      return { ...state, radioChecked: true };

    default:
      return state;
  }
}

module.exports = { initialState, reducer };
