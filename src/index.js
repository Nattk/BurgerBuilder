import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import burgerReducer from "./store/reducers/burgerBuilder";
import ordersReducer from "./store/reducers/orders";
import authReducer from "./store/reducers/auth";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  burger: burgerReducer,
  orders: ordersReducer,
  auth: authReducer
});

// const logger = store => {
//   return next => {
//     return action => {
//       const result = next(action);
//       return result;
//     };
//   };
// };

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
