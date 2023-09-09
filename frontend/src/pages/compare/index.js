import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header";
import CustomLineChart from "../../components/customLineChart";
import Loading from "../../components/loading/loading.jsx";
import Select from "../../components/select/Select";
import Checkbox from "../../components/checkbox";
import { ButtonContainer } from "./styles";
import { CheckboxContainer } from "../../components/checkbox/styles";
import { CompareContainer } from "./styles";

const Compare = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [devices, setDevices] = useState([]);
  const [selectedDevice1, setSelectedDevice1] = useState("");
  const [selectedDevice2, setSelectedDevice2] = useState("");
  const [selectedTimeRange, setSelectedTimeRange] = useState("lastDay");
  const [selectedInterval, setSelectedInterval] = useState("all");
  // eslint-disable-next-line no-unused-vars
  const [selectedMetrics, setSelectedMetrics] = useState({
    temperature: true,
    humidity: true,
    rain_lvl: false,
    wind_speed: false,
    pressure: false,
    uv: false,
    solar_radiation: false,
    luminosity: false,
  });

  const timeOptions = [
    { label: "Last Day", value: "lastDay" },
    { label: "Last Week", value: "lastWeek" },
    { label: "Last Month", value: "lastMonth" },
    { label: "Last 3 Months", value: "last3Months" },
    { label: "All", value: "allTime" },
  ];

  const intervalOptions = [
    { label: "1 Hour", value: "1h" },
    { label: "4 Hours", value: "4h" },
    { label: "All Data", value: "all" },
  ];

  const availableMetrics = [
    { label: "Temperature", value: "temperature" },
    { label: "Humidity", value: "humidity" },
    { label: "Rain Level", value: "rain_lvl" },
    { label: "Wind Speed", value: "wind_speed" },
    { label: "Pressure", value: "pressure" },
    { label: "UV", value: "uv" },
    { label: "Solar Radiation", value: "solar_radiation" },
    { label: "Luminosity", value: "luminosity" },
  ];

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5000/api/compare?time_range=${selectedTimeRange}`)
      .then((response) => {
        const rawData = response.data.data;
        const transformedData = rawData.map((item) => ({
          device: item[2],
          rain_lvl: item[3],
          wind_speed: item[4],
          temperature: item[7],
          humidity: item[8],
          luminosity: item[9],
          uv: item[10],
          solar_radiation: item[11],
          pressure: item[12],
          time: new Date(item[15]).toLocaleString(),
        }));

        console.log("Transformed Data:", transformedData);
        const uniqueDevices = [
          ...new Set(transformedData.map((item) => item.device)),
        ];
        setDevices(uniqueDevices);
        setData(transformedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching compare data:", error);
        setLoading(false);
      });
  }, [selectedTimeRange]);

  const filterDataByDeviceAndInterval = (device) => {
    if (!device) return [];
    let filteredData = data.filter((item) => item.device === device);

    if (selectedInterval !== "all") {
      let intervalInHours = parseInt(selectedInterval.replace("h", ""), 10);
      let nextTime = new Date(filteredData[0].time).getTime();
      filteredData = filteredData.filter((item) => {
        const currTime = new Date(item.time).getTime();
        if (currTime >= nextTime) {
          nextTime = currTime + intervalInHours * 60 * 60 * 1000;
          return true;
        }
        return false;
      });
    }

    return filteredData;
  };

  if (loading) {
    return <Loading />;
  }

  const filteredData1 = filterDataByDeviceAndInterval(selectedDevice1);
  const filteredData2 = filterDataByDeviceAndInterval(selectedDevice2);
  const strokeColors = ["#8884d8", "#82ca9d", "#ffc658" /* ... */];

  return (
    <div>
      <Header />
      <CompareContainer>
        <h1>Compare Devices</h1>
        <ButtonContainer>
          <Select
            options={timeOptions}
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
          />
          <Select
            options={intervalOptions}
            value={selectedInterval}
            onChange={(e) => setSelectedInterval(e.target.value)}
          />
        </ButtonContainer>
        <CheckboxContainer>
          {availableMetrics.map((metric) => (
            <Checkbox
              key={metric.value}
              name={metric.value}
              checked={selectedMetrics[metric.value]}
              onChange={(e) => {
                const value = e.target.checked;
                setSelectedMetrics((prevMetrics) => ({
                  ...prevMetrics,
                  [metric.value]: value,
                }));
              }}
              label={metric.label}
            />
          ))}
        </CheckboxContainer>
        <Select
          options={devices.map((device) => ({ label: device, value: device }))}
          value={selectedDevice1}
          onChange={(e) => setSelectedDevice1(e.target.value)}
          placeholder="Select Device for Chart 1"
        />
        {filteredData1.length > 0 && (
          <CustomLineChart
            data={filteredData1}
            selectedMetrics={selectedMetrics}
            strokeColors={strokeColors}
          />
        )}
        <Select
          options={devices.map((device) => ({ label: device, value: device }))}
          value={selectedDevice2}
          onChange={(e) => setSelectedDevice2(e.target.value)}
          placeholder="Select Device for Chart 2"
        />
        {filteredData2.length > 0 && (
          <CustomLineChart
            data={filteredData2}
            selectedMetrics={selectedMetrics}
            strokeColors={strokeColors}
          />
        )}
      </CompareContainer>
    </div>
  );
};

export default Compare;
