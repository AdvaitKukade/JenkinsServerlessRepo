import { call, all } from "redux-saga/effects";
import commonSaga from "../sagas/commonSaga";
import searchSaga from "../sagas/searchSaga";

export default function* rootSaga() {
  yield all([call(commonSaga), call(searchSaga)]);
}
