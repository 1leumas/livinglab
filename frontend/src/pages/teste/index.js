import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header";
import CustomLineChart from "../../components/customLineChart";
import Loading from "../../components/loading/loading.jsx";
import Select from "../../components/select/Select";
import Checkbox from "../../components/checkbox";
import { ActionContainer, ButtonContainer } from "./styles";
import { CheckboxContainer } from "../../components/checkbox/styles";
import { CompareContainer } from "./styles";
import ExportToCSV from "../../components/exportToCSV";
import { ChartContainer } from "./styles";

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

  // Get devices
    const getDevices = async () => {
        const response = await axios.get("http://localhost:5000/api/compare/devices");
        setDevices(response.data);
    };

    // fetch data
    const fetchData = async () => {
        try {
            setLoading(true);
            const params = {
                time_range: selectedTimeRange,
                interval: selectedInterval,
                stations:
                    selectedDevice1 && selectedDevice2
                        ? `${selectedDevice1},${selectedDevice2}`
                        : undefined,
            };
            const response = await axios.get("http://localhost:5000/api/compare", {
                params,
            });
            setData(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };


  // Loading state
  if (loading) {
    return <Loading />;
  }

  /*

    Render

  */

  return (
    <div>
      <Header />

    </div>
  );
};

export default Compare;
