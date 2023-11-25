import React, { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { registerLocale } from "react-datepicker";
import id from "date-fns/locale/id";
import { sensorUtils } from "./data/sensorUtils";
import { apiConfigurations2 } from "./data/apiConfigurations";
import SignUp from "./pages/Auth/SignUp.jsx";
import Login from "./pages/Auth/Login.jsx";
import Protected from "./pages/Auth/Protected.jsx";
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import NewProfile from "./pages/Profile/NewProfile.jsx";
import { AppProvider } from "./data/AppProvider.jsx";
import Sensor from "./pages/Sensor/Sensor.jsx";

registerLocale("id", id);

function App2() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getAPI = apiConfigurations2();

    sensorUtils(getAPI)
      .then((result) => setData(result))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Router>
        <AppProvider>
          <Routes>
            <Route
              path="/temperature-monitoring-app/sensor"
              element={<Sensor data={data} />}
            />
            <Route
              exact
              path="/temperature-monitoring-app/"
              element={<Home />}
            />
            <Route
              path="/temperature-monitoring-app/about"
              element={<About />}
            />
            <Route
              path="/temperature-monitoring-app/signup"
              element={<SignUp />}
            />
            <Route
              path="/temperature-monitoring-app/login"
              element={<Login />}
            />
            <Route
              path="/temperature-monitoring-app/auth"
              element={<Protected />}
            />
            <Route
              path="/temperature-monitoring-app/dashboard"
              element={<Dashboard data={data} />}
            />
            <Route
              path="/temperature-monitoring-app/profil"
              element={<NewProfile data={data} />}
            />
          </Routes>
        </AppProvider>
    </Router>
  );
}

export default App2;
