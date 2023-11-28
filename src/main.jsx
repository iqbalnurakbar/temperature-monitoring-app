import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./data/AuthContext.jsx";
import "./index.css";
import App2 from "./App2.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <App2 />
    </AuthProvider>
  </React.StrictMode>,
);
