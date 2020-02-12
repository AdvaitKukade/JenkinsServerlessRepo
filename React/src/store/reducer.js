import { combineReducers } from "redux";
import commonReducer from "../reducers/commonReducer";
import filterReducer from "../reducers/filterReducer";
import searchReducer from "../reducers/searchReducer";
import detailViewReducer from "../reducers/detailViewReducer";
import downloadReducer from "../reducers/downloadReducer";


export default combineReducers({
  common: commonReducer,
  filter: filterReducer,
  result: searchReducer,
  singleRecord: detailViewReducer,
  downloadLink: downloadReducer
});
