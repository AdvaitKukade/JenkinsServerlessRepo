import { takeEvery, put } from "redux-saga/effects";
import * as CommonActionTypes from "../constants/commonConstants";
import apiService from "./../api/api";

export function* getLanguages() {
  try {
    const response = yield apiService.getLanguages();
    if(response.status_code === 200) {
      yield put({
        type: CommonActionTypes.SET_LANGUAGES,
        payload: response.data
      });
    }
    
  } catch(err) {
    console.log(err);
  }
  
}

export function* getChannel() {
  console.log("CHANNEL SAGA");
  try {
    const response = yield apiService.getChannel();
    if(response.status_code === 200) {
      yield put({
        type: CommonActionTypes.SET_CHANNEL,
        payload: response.data
      });
    }
    
  } catch(err) {
    console.log(err);
  }
  
}

export function* getTopicCodes() {
  try {
    const response = yield apiService.getTopicCodes();
    if(response.status_code === 200) {
      yield put({
        type: CommonActionTypes.SET_TOPIC_CODES,
        payload: response.data
      });
    }
  } catch(err) {
    console.log("getTopicCodes--->",err);
  }
}

export function* getDestinations() {
  try {
    const response = yield apiService.getDestinations();
    if(response.status_code === 200) {
      yield put({
        type: CommonActionTypes.SET_DESTINATIONS,
        payload: response.data
      });
    }
  } catch(err) {
    console.log("getDestinations--->",err);
  }
}

export default function* commonSaga() {
  yield takeEvery(CommonActionTypes.GET_LANGUAGES, getLanguages);
  yield takeEvery(CommonActionTypes.GET_TOPIC_CODES, getTopicCodes);
  yield takeEvery(CommonActionTypes.GET_CHANNEL, getChannel);
  yield takeEvery(CommonActionTypes.GET_DESTINATIONS, getDestinations);
}
