import * as CommonActionTypes from "../constants/commonConstants";

export function getLanguagesAction() {
  return {
    type: CommonActionTypes.GET_LANGUAGES
  };
}

export function getTopicCodes() {
  return {
    type: CommonActionTypes.GET_TOPIC_CODES
  }
}

export function getChannel() {
  return {
    type: CommonActionTypes.GET_CHANNEL
  }
}

export function getDestinations() {
  return {
    type: CommonActionTypes.GET_DESTINATIONS
  }
}