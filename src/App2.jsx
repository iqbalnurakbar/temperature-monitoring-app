import React from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { registerLocale } from "react-datepicker";
import id from "date-fns/locale/id";
import SignUp from "./pages/Auth/SignUp.jsx";
import Login from "./pages/Auth/Login.jsx";
import Protected from "./pages/Auth/Protected.jsx";
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import NewProfile from "./pages/Profile/NewProfile.jsx";
import { AppProvider } from "./data/AppProvider.jsx";
import Sensor from "./pages/Sensor/Sensor.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
registerLocale("id", id);

function App2() {
  return (
    <Router>
      <AppProvider>
        <Routes>
          <Route path="/sensor" element={<ProtectedRoute element={<Sensor />} />} />
          <Route exact path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/about" element={<ProtectedRoute element={<About />} />} />
          <Route path="/signup" element={<ProtectedRoute element={<SignUp />} />} />
          <Route path="/login" element={<ProtectedRoute element={<Login />} />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/profil" element={<ProtectedRoute element={<NewProfile />} />} />
        </Routes>
      </AppProvider>
    </Router>
  );
}

export default App2;