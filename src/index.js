import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import exporter from "./store/store";

ReactDOM.render(
  <Provider store={exporter.Store}>
    <PersistGate persistor={exporter.persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
