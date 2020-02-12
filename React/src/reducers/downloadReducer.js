import { SET_DOWNLOAD_LINK } from "./../constants/commonConstants";

const initialState = {
  link: []
};

const downloadReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case SET_DOWNLOAD_LINK:
      return {
        link: action.payload
      }
    default:
      return {
        ...state
      };
  }

}
export default downloadReducer;