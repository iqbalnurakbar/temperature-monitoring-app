import React, { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import Sensor1 from "./pages/Sensor/Sensor1";
import Sensor2 from "./pages/Sensor/Sensor2";
import Sensor3 from "./pages/Sensor/Sensor3";
import Sensor4 from "./pages/Sensor/Sensor4";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { registerLocale } from "react-datepicker";
import id from "date-fns/locale/id";

registerLocale("id", id);

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            exact
            path="/temperature-monitoring-app/"
            element={
              <Dashboard
                apiUrl="https://api.thingspeak.com/channels/2314365/feeds.json"
                apiKey="ESPOY24P92FJIH2G"
              />
            }
          />
          <Route
            path="/temperature-monitoring-app/sensor1"
            element={
              <Sensor1
                apiUrl="https://api.thingspeak.com/channels/2314365/feeds.json"
                apiKey="ESPOY24P92FJIH2G"
              />
            }
          />
          <Route
            path="/temperature-monitoring-app/sensor2"
            element={
              <Sensor2
                apiUrl="https://api.thingspeak.com/channels/2314365/feeds.json"
                apiKey="ESPOY24P92FJIH2G"
              />
            }
          />
          <Route
            path="/temperature-monitoring-app/sensor3"
            element={
              <Sensor3
                apiUrl="https://api.thingspeak.com/channels/2314365/feeds.json"
                apiKey="ESPOY24P92FJIH2G"
              />
            }
          />
          <Route
            path="/temperature-monitoring-app/sensor4"
            element={
              <Sensor4
                apiUrl="https://api.thingspeak.com/channels/2314365/feeds.json"
                apiKey="ESPOY24P92FJIH2G"
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
