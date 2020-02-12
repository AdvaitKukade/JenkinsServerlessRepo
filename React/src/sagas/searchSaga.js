import { takeEvery, put } from "redux-saga/effects";
import { GET_SEARCH_RESULT, SET_SEARCH_RESULT, GET_EXPORT_LINK, GET_SINGLE_RECORD, SET_SINGLE_RECORD, GET_DOWNLOAD_LINK, SET_DOWNLOAD_LINK } from "../constants/commonConstants";
import apiService from "./../api/api";



export function* fetchSearchResult(payload) {

    try {
        const response = yield apiService.fetchSearchResult(payload.payload);
        if (response.status_code === 200) {
            yield put({
                type: SET_SEARCH_RESULT,
                payload: response.data
            });
        }

    } catch (err) {
        console.log(err);
    }

}

export function* downloadSample(payload) {
    try {
        const response = yield apiService.downloadSample(payload.payload);
        if (response.status_code === 200) {
            yield put({
                type: SET_DOWNLOAD_LINK,
                payload: response.data
            });  
        }
    } catch (err) {
        console.log(err);
    }
}

export function* exportData(payload) {
    try {
        const response = yield apiService.exportData(payload.payload);
        if (response.status_code === 200) {
            yield put({
                // type: SET_DOWNLOAD_LINK,
                payload: response.data
            });  
        }
    } catch (err) {
        console.log(err);
    }
}

export function* fetchSingleRecord(id){

    try{
        const response = yield apiService.fetchSingleRecord(id);
        if (response.status_code === 200) {
            yield put({
                type: SET_SINGLE_RECORD,
                payload: response.data
            });
        }
    } catch(err) {
        console.log(err);
    }
}

export default function* searchSaga() {
    yield takeEvery(GET_SEARCH_RESULT, fetchSearchResult);
    yield takeEvery(GET_DOWNLOAD_LINK, downloadSample);
    yield takeEvery(GET_SINGLE_RECORD, fetchSingleRecord);
    yield takeEvery(GET_EXPORT_LINK, exportData);

}