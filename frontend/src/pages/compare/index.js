// imports
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
import ExportToCSV from "../../components/exportToCSV";

const Compare = () => {
  /*

    Variables

  */
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [devices, setDevices] = useState([]);
  const [selectedDevice1, setSelectedDevice1] = useState("");
  const [selectedDevice2, setSelectedDevice2] = useState("");
  const [selectedTimeRange, setSelectedTimeRange] = useState("lastDay");
  const [selectedInterval, setSelectedInterval] = useState("all");
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
    { label: "2 Hours", value: "2h" },
    { label: "4 Hours", value: "4h" },
    { label: "6 Hours", value: "6h" },
    { label: "8 Hours", value: "8h" },
    { label: "12 Hours", value: "12h" },
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

  const strokeColors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7300",
    "#000000",
    "#00ff00",
    "#ff0000",
    "#0000ff",
  ];

  /*

    Functions

  */

  // pegar os dados da API e transformar em um array de objetos
  useEffect(() => {
    console.log("Component Mount");
    setLoading(true);
    console.log("Fetching Data");
    axios
      .get(`http://localhost:5000/api/compare?time_range=${selectedTimeRange}`)
      .then((response) => {
        const rawData = response.data.data;
        // pegar apenas o que queremos do json
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
        // pegar apenas os devices únicos
        const uniqueDevices = [
          ...new Set(transformedData.map((item) => item.device)),
        ];
        setDevices(uniqueDevices);
        setData(transformedData);
        console.log("Data fetched");
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching compare data:", error);
        setLoading(false);
      });
  }, [selectedTimeRange]);

  // Filtrar os dados de acordo com o device e o intervalo selecionados
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

    console.log("Data filtered");
    return filteredData;
  };

  // variáveis para guardar os dados filtrados
  const filteredData1 = filterDataByDeviceAndInterval(selectedDevice1);
  const filteredData2 = filterDataByDeviceAndInterval(selectedDevice2);

  // se estiver carregando, mostrar o loading
  if (loading) {
    return <Loading />;
  }

  /*

    Render

  */

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

        <ExportToCSV data={filteredData1} fileName="station_data_1.csv" />

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

        <ExportToCSV data={filteredData2} fileName="station_data_2.csv" />

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
