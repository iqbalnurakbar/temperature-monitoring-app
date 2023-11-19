import React, { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard/Dashboard";
import Sensor1 from "./pages/Sensor/Sensor1";
import Sensor2 from "./pages/Sensor/Sensor2";
import Sensor3 from "./pages/Sensor/Sensor3";
import Sensor4 from "./pages/Sensor/Sensor4";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { registerLocale } from "react-datepicker";
import id from "date-fns/locale/id";
import { sensorUtils } from "./data/sensorUtils";
import DynamicSensorPage from "./pages/DynamicSensorPage/DynamicSensorPage";
import { dynamicMenusData } from "./data/dynamicMenusData";

registerLocale("id", id);

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const apiConfigurations = [
      {
        url: "https://api.thingspeak.com/channels/2342296/feeds.json?results=2",
        fieldIndices: [1, 2, 4, 5],
        timeIndices: [3, 3, 6, 6],
      },
      {
        url: "https://api.thingspeak.com/channels/2344351/feeds.json?results=2",
        fieldIndices: [1, 2, 4, 5],
        timeIndices: [3, 3, 6, 6],
      },
      {
        url: "https://api.thingspeak.com/channels/2347341/feeds.json?results=2",
        fieldIndices: [1, 2, 4, 5],
        timeIndices: [3, 3, 6, 6],
      }
    ];

    sensorUtils(apiConfigurations)
      .then((result) => setData(result))
      .catch((error) => console.error("Error fetching data:", error));
  }, [data]); // Empty dependency array to run the effect only once
  return (
    <div>
      <Router>
        <Routes>
          <Route
            exact
            path="/temperature-monitoring-app/"
            element={<Dashboard data={data}/>}
          />
          {data?(Object.keys(data).map((sensor)=>(
            <Route path={`/temperature-monitoring-app/${data[sensor].name}`} key={sensor}  element={<DynamicSensorPage data={data} name={data[sensor].name}/>}/>
          ))):('') }
          {/* <Route
            path="/temperature-monitoring-app/sensor1"
            element={
              <Sensor1
                apiUrl="https://api.thingspeak.com/channels/2314365/feeds.json"
                apiKey="ESPOY24P92FJIH2G"
                field="field1"
                title="Sensor 1"
                arrayAPI="0"
              />
            }
          />
          <Route
            path="/temperature-monitoring-app/sensor2"
            element={
              <Sensor2
                apiUrl="https://api.thingspeak.com/channels/2314365/feeds.json"
                apiKey="ESPOY24P92FJIH2G"
                field="field2"
                title="Sensor 2"
                arrayAPI="1"
              />
            }
          />
          <Route
            path="/temperature-monitoring-app/sensor3"
            element={
              <Sensor3
                apiUrl="https://api.thingspeak.com/channels/2314365/feeds.json"
                apiKey="ESPOY24P92FJIH2G"
                field="field3"
                title="Sensor 3"
                arrayAPI="2"
              />
            }
          />
          <Route
            path="/temperature-monitoring-app/sensor4"
            element={
              <Sensor4
                apiUrl="https://api.thingspeak.com/channels/2314365/feeds.json"
                apiKey="ESPOY24P92FJIH2G"
                field="field4"
                title="Sensor 4"
                arrayAPI="3"
              />
            }
          /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
