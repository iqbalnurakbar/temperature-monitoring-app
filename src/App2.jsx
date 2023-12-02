import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { registerLocale } from "react-datepicker";
import id from "date-fns/locale/id";
import { AppProvider } from "./data/AppProvider.jsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";

registerLocale("id", id);

// Lazy-loaded components
const Sensor = lazy(() => import("./pages/Sensor/Sensor.jsx"));
const Home = lazy(() => import("./pages/Home/Home.jsx"));
const About = lazy(() => import("./pages/About/About.jsx"));
const SignUp = lazy(() => import("./pages/Auth/SignUp.jsx"));
const Login = lazy(() => import("./pages/Auth/Login.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard.jsx"));
const NewProfile = lazy(() => import("./pages/Profile/NewProfile.jsx"));

function App2() {
  return (
    <Router>
      <AppProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path="/sensor"
              element={<ProtectedRoute element={<Sensor />} />}
            />
            <Route
              exact
              path="/"
              element={<ProtectedRoute element={<Home />} />}
            />
            <Route
              path="/about"
              element={<ProtectedRoute element={<About />} />}
            />
            <Route
              path="/signup"
              element={<ProtectedRoute element={<SignUp />} />}
            />
            <Route
              path="/login"
              element={<ProtectedRoute element={<Login />} />}
            />
            <Route
              path="/dashboard"
              element={<ProtectedRoute element={<Dashboard />} />}
            />
            <Route
              path="/profil"
              element={<ProtectedRoute element={<NewProfile />} />}
            />
          </Routes>
        </Suspense>
      </AppProvider>
    </Router>
  );
}

export default App2;
