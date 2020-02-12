import { SET_SEARCH_RESULT } from "./../constants/commonConstants";

const initialState = {
  searchResult: []
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_RESULT:
      return {
        searchResult: action.payload
      }
    default:
      return {
        ...state
      };
  }
}
export default searchReducer;