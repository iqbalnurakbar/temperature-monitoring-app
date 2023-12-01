import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./data/AuthProvider.jsx";
import "./index.css";
import App2 from "./App2.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
      <App2 />
    </AuthProvider>
);
