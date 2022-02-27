import React from "react";
import ReactDOM from "react-dom";
import "./reset.css";
import "./index.module.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

// why i can't use react-scripts v5 while trying to deploy:
// https://stackoverflow.com/questions/64557638/how-to-polyfill-node-core-modules-in-webpack-5

require("dotenv").config();

axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
