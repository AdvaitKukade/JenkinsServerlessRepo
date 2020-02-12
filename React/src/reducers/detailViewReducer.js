import { SET_SINGLE_RECORD } from "./../constants/commonConstants";

const initialState = {
  singleResult:[]
};

const detailViewReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_RECORD:
      return {
        ...state,
        singleResult: action.payload
      }
      
    default:
      return {
        ...state
      };
  }
}
export default detailViewReducer;