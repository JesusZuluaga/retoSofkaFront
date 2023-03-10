import { createStore ,compose , applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";

declare global{
  interface Window{
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}

const configureStore=()=>{
  const middlewares=[thunk];
  const composeEnhacers=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose;
  const enhancers=composeEnhacers(applyMiddleware(...middlewares));

  const store=createStore(rootReducer(),enhancers)

  return store
}

export default configureStore;