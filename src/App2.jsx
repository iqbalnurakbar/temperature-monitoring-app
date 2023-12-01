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
import { NotificationProvider } from "./data/NotificationProvider.jsx";

registerLocale("id", id);

function App2() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await sensorUtils(apiConfigurations2());
        setData(apiData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Router>
      <NotificationProvider>
        <AppProvider>
          <Routes>
            <Route path="/sensor" element={<Sensor data={data} />} />
            <Route exact path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/auth" element={<Protected />} />
            <Route path="/dashboard" element={<Dashboard data={data} />} />
            <Route path="/profil" element={<NewProfile data={data} />} />
          </Routes>
        </AppProvider>
      </NotificationProvider>
    </Router>
  );
}

export default App2;
