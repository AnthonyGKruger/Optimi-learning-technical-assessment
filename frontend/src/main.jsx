/**
 * This is the main entry point for the React application.
 *
 * It imports the necessary modules, including React, ReactDOM, the main App component, and the main CSS file.
 *
 * The `ReactDOM.createRoot()` method is used to create a root React fiber. This is where the React components will be attached.
 * The `document.getElementById('root')` is used to get the root DOM node where the React components will be attached.
 *
 * The `render()` method is used to render the React elements into the root DOM node.
 * The `React.StrictMode` is a wrapper component which checks for potential problems in the application during the development build.
 *
 * @module main
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
