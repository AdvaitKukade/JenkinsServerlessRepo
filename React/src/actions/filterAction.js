import { SET_FILTERS } from "../constants/commonConstants";


export function setFilters(payload) {
    return {
        type: SET_FILTERS,
        payload: payload
    }
}