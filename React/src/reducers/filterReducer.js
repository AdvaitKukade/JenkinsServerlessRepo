import { SET_FILTERS } from "./../constants/commonConstants";

const initialState = {
  startDate: {
    date: "",
    minDate: null,
    maxDate: new Date()
  },
  endDate: {
    date: "",
    minDate: null,
    maxDate: new Date()
  },
  selectedLanguages: [],
  selectedTopicCodes: [],
  selectedDestinations: [],
  selectedChannels: [],
  selectedSampleCount: 20,
  selectedMediaType: []
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTERS:
      return {
        ...action.payload
      }
    default:
      return {
        ...state
      };
  }
}
export default filterReducer;