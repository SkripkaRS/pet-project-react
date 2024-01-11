import React from "react";
import ReactDOM from "react-dom/client";
import 'normalize.css';
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import UserContextInfo from "./context/UserContextInfo";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserContextInfo>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserContextInfo>,
);
