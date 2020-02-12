import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
// import logger from "redux-logger";
import rootSaga from "./saga";
import reducer from "./reducer";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
  // applyMiddleware(sagaMiddleware, logger)
);
sagaMiddleware.run(rootSaga);

export default store;
