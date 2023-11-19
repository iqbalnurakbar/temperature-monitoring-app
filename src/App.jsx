import React, { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { registerLocale } from "react-datepicker";
import id from "date-fns/locale/id";
import { sensorUtils } from "./data/sensorUtils";
import DynamicSensorPage from "./pages/DynamicSensorPage/DynamicSensorPage";
import { apiConfigurations2 } from "./data/apiConfigurations";
registerLocale("id", id);

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getAPI = apiConfigurations2();

    sensorUtils(getAPI)
      .then((result) => setData(result))
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // Empty dependency array to run the effect only once
  return (
    <div>
      <Router>
        <Routes>
          <Route
            exact
            path="/temperature-monitoring-app/"
            element={<Dashboard data={data} />}
          />
          {data
            ? Object.keys(data).map((sensor) => (
                <Route
                  path={`/temperature-monitoring-app/${data[sensor].name.replace(/\s+/g, '-')}`}
                  key={sensor}
                  element={
                    <DynamicSensorPage data={data} name={data[sensor].name} />
                  }
                />
              ))
            : ""}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
