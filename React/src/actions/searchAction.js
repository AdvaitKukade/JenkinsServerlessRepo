import { GET_SEARCH_RESULT, GET_SINGLE_RECORD, GET_DOWNLOAD_LINK, GET_EXPORT_LINK } from "../constants/commonConstants";


export function getSearchResult(payload) {
    return {
        type: GET_SEARCH_RESULT,
        payload: payload
    }
}

export function getSingleRecord(id) {
    return {
        type: GET_SINGLE_RECORD,
        payload: id
    }
}

export function getDownloadLink(payload) {
    return {
        type: GET_DOWNLOAD_LINK,
        payload: payload
    }
}

export function exportData(payload, email) {
    payload.email= email;
    return {
        type: GET_EXPORT_LINK,
        payload: payload
    }
}