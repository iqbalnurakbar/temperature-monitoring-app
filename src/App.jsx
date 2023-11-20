import React, { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { registerLocale } from "react-datepicker";
import id from "date-fns/locale/id";
import { sensorUtils } from "./data/sensorUtils";
import DynamicSensorPage from "./pages/DynamicSensorPage/DynamicSensorPage";
import { apiConfigurations2 } from "./data/apiConfigurations";
import SignUp from "./components/Auth/SignUp.jsx";
import Login from "./components/Auth/Login.jsx";
import Protected from "./components/Auth/Protected.jsx";
import Home from "./Pages/Home/Home.jsx";
import About from "./Pages/About/About.jsx";
import NewProfile from "./pages/Profile/NewProfile.jsx";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "./components/Auth/FirebaseAuth.jsx";

registerLocale("id", id);

function App() {
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (userData) => {
      if (userData) {
        setUser(userData);

        try {
          // Mengambil data tambahan dari Firestore
          const docRef = doc(db, "userInfo", userData.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            // Jika dokumen ada, atur informasi tambahan ke dalam state
            setAdditionalInfo(docSnap.data());
          } else {
            console.log("Dokumen tidak ditemukan!");
          }
        } catch (error) {
          console.error("Error fetching additional info:", error);
        }
      }
    });

    // Bersihkan langganan saat komponen dibongkar
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const getAPI = apiConfigurations2();

    sensorUtils(getAPI)
      .then((result) => setData(result))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <Router>
      <Routes>
        {data
          ? Object.keys(data).map((sensor) => (
              <Route
                path={`/temperature-monitoring-app/${data[sensor].name.replace(
                  /\s+/g,
                  "-",
                )}`}
                key={sensor}
                element={
                  <DynamicSensorPage
                    data={data}
                    name={data[sensor].name}
                  />
                }
              />
            ))
          : ""}
        <Route exact path="/temperature-monitoring-app/" element={<Home />} />
        <Route path="/temperature-monitoring-app/about" element={<About />} />
        <Route path="/temperature-monitoring-app/signup" element={<SignUp />} />
        <Route path="/temperature-monitoring-app/login" element={<Login />} />
        <Route
          path="/temperature-monitoring-app/auth"
          element={<Protected />}
        />
        <Route
          path="/temperature-monitoring-app/dashboard"
          element={
            <Dashboard
              data={data}
            />
          }
        />
        <Route
          path="/temperature-monitoring-app/profile"
          element={
            <NewProfile
              data={data}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
