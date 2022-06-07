import React from "react";
import ReactDOM from "react-dom";

import { HomeProvider } from "./context/home/HomeContext";
import Main from "./Main";
import reportWebVitals from "./reportWebVitals";

// import main sass file
import "./sass/app.scss";

ReactDOM.render(
  <React.StrictMode>
    <HomeProvider>
      <Main />
    </HomeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
