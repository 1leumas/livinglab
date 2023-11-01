// imports
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TrendsContainer,
  ChartContainer,
  ButtonContainer,
  CheckboxGroup,
} from "./styles";
import Header from "../../components/header";
import Loading from "../../components/loading/loading.jsx";
import Select from "../../components/select/Select";
import IntervalSelect from "../../components/intervalSelect";
import CustomLineChart from "../../components/customLineChart";
import ExportToCSV from "../../components/exportToCSV";
import Checkbox from "../../components/checkbox";

const Trends = () => {
  /*

    Variables

  */
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState("lastDay");
  const [selectedMetrics, setSelectedMetrics] = useState({
    temperature: true,
    humidity: true,
    noise: false,
    voltage: false,
  });
  const [selectedInterval, setSelectedInterval] = useState("1h");
  const [showIntervalSelect, setShowIntervalSelect] = useState(false);

  const timeOptions = [
    { label: "Last Day", value: "lastDay" },
    { label: "Last Week", value: "lastWeek" },
    { label: "Last Month", value: "lastMonth" },
    { label: "Last 3 Months", value: "last3Months" },
    { label: "Custom", value: "custom" },
    { label: "All", value: "allTime" },
  ];

  const intervalOptions = [
    { label: "1 Hour", value: "1h" },
    { label: "4 Hours", value: "4h" },
    { label: "12 Hours", value: "12h" },
    { label: "Custom", value: "custom" },
    { label: "All Data", value: "all" },
  ];

  const availableMetrics = [
    { label: "Temperature", value: "temperature" },
    { label: "Humidity", value: "humidity" },
    { label: "Noise", value: "noise" },
    { label: "Voltage", value: "voltage" },
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

  // Busca os dados da API
  const fetchData = async (dateRange = null) => {
    try {
      setLoading(true);
      let url = `http://localhost:5000/api/trends?time_range=${selectedTimeRange}&interval=${selectedInterval}`;
      const response = await axios.get(url);
      const transformedData = response.data.data.map((item) => ({
        device: item.deviceName,
        temperature: item.temperature,
        humidity: item.humidity,
        noise: item.noise,
        voltage: item.voltage,
        time: new Date(item.time).toLocaleString(),
      }));
      setData(transformedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching trends data:", error);
      setLoading(false);
    }
  };

  const handleTimeRangeChange = (e) => {
    const newTimeRange = e.target.value;
    setSelectedTimeRange(newTimeRange);
    fetchData();
  };

  const handleIntervalChange = (e) => {
    const value = e.target.value;
    setSelectedInterval(value);
    if (value === "custom") {
      setShowIntervalSelect(true); // Abre o componente de seleção de intervalo personalizado
    } else {
      fetchData();
    }
  };

  const handleMetricChange = (e) => {
    const value = e.target.checked;
    const name = e.target.name;
    setSelectedMetrics((prevMetrics) => ({
      ...prevMetrics,
      [name]: value,
    }));
  };

  const handleIntervalConfirm = (customValue) => {
    setSelectedInterval(customValue);
    fetchData();
    setShowIntervalSelect(false);
  };

  useEffect(() => {
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTimeRange, selectedInterval]);

  /*

    Render

  */

  return (
    <div>
      <Header />
      {showIntervalSelect && (
        <IntervalSelect
          onClose={() => setShowIntervalSelect(false)}
          onConfirm={handleIntervalConfirm}
        />
      )}
      {loading ? (
        <Loading />
      ) : (
        <TrendsContainer>
          <h2>Select Time Period:</h2>
          <ButtonContainer>
            <Select
              options={timeOptions}
              value={selectedTimeRange}
              onChange={handleTimeRangeChange}
            />
            <Select
              options={intervalOptions}
              value={selectedInterval}
              onChange={handleIntervalChange}
            />
            <ExportToCSV data={data} fileName="trends_data.csv" />
          </ButtonContainer>
          <CheckboxGroup>
            {availableMetrics.map((metric) => (
              <Checkbox
                key={metric.value}
                name={metric.value}
                checked={selectedMetrics[metric.value]}
                onChange={handleMetricChange}
                label={metric.label}
              />
            ))}
          </CheckboxGroup>
          <ChartContainer>
            <CustomLineChart
              data={data}
              selectedMetrics={selectedMetrics}
              strokeColors={strokeColors}
            />
          </ChartContainer>
        </TrendsContainer>
      )}
    </div>
  );
};

export default Trends;
