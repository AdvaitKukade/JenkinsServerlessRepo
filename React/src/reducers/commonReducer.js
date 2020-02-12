import * as CommonActionTypes from "../constants/commonConstants";
import { MEDIA_TYPE, SAMPLE_COUNT, TIME_OPTIONS } from "../constants/constants";
const initialState = {
  mediaTypes: MEDIA_TYPE,
  sampleCount: SAMPLE_COUNT,
  timeOptions: TIME_OPTIONS,
  languages: [],
  channel:[],
  topicCodes: [],
  destinations: []
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case CommonActionTypes.SET_LANGUAGES:
      return {
        ...state,
        languages: action.payload
      };
    
    case CommonActionTypes.SET_TOPIC_CODES: 
      return {
        ...state,
        topicCodes: action.payload
      }

      case CommonActionTypes.SET_CHANNEL: 
      return {
        ...state,
        channel: action.payload
      }
    
    case CommonActionTypes.SET_DESTINATIONS: 
      return {
        ...state,
        destinations: action.payload
      }  

    default:
      return {
        ...state
      };
  }
};

export default commonReducer;
