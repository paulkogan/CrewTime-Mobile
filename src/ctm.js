import React, {} from "react";
import ReactDOM, {} from "react-dom";
import AppRouter, {} from "./components/appRouter"
import "normalize.css/normalize.css"; //all browsers look the same
import "./styles/style.scss";

// require("babel-core/register");
// require("babel-polyfill");







ReactDOM.render( <AppRouter />, document.getElementById('root'));
