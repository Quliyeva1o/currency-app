import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/routes";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import '../node_modules/currency-flags/dist/currency-flags.css'

const App = () => (
  <Provider store={store}>
    <Router>
      <AppRoutes />
    </Router>
  </Provider>
);

export default App;
