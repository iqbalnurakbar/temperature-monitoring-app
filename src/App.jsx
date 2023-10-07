import React from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import Sensor1 from "./pages/Sensor/Sensor1";
import Sensor2 from "./pages/Sensor/Sensor2";
import Sensor3 from "./pages/Sensor/Sensor3";
import Sensor4 from "./pages/Sensor/Sensor4";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  
  return (
    <div>
    <Router>
      <Routes>
        <Route
          exact
          path="/temperature-monitoring-app/"
          element={<Dashboard />}
        />
        <Route
          path="/temperature-monitoring-app/sensor1"
          element={<Sensor1 />}
        />
        <Route
          path="/temperature-monitoring-app/sensor2"
          element={<Sensor2 />}
        />
        <Route
          path="/temperature-monitoring-app/sensor3"
          element={<Sensor3 />}
        />
        <Route
          path="/temperature-monitoring-app/sensor4"
          element={<Sensor4 />}
        />
      </Routes>
    </Router>
    </div>

  );
}

export default App;
