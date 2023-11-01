import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/header";
import CustomLineChart from "../../components/customLineChart";
import Loading from "../../components/loading/loading.jsx";
import Select from "../../components/select/Select";
import Checkbox from "../../components/checkbox";
import { ActionContainer, ButtonContainer, CompareContainer, ChartContainer } from "./styles";
import ExportToCSV from "../../components/exportToCSV";
import { CheckboxContainer } from "../../components/checkbox/styles";

const Compare = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [devices, setDevices] = useState([]);
  const [selectedDevice1, setSelectedDevice1] = useState("");
  const [selectedDevice2, setSelectedDevice2] = useState("");
  const [selectedTimeRange, setSelectedTimeRange] = useState("lastDay");
  const [selectedInterval, setSelectedInterval] = useState("all");
  const [selectedMetrics, setSelectedMetrics] = useState({
    emw_temperature: true,
    emw_humidity: true,
    emw_rain_lvl: false,
    emw_avg_wind_speed: false,
    emw_atm_pres: false,
    emw_uv: false,
    emw_solar_radiation: false,
    emw_luminosity: false,
  });

  const strokeColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#000000", "#00ff00", "#ff0000", "#0000ff"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const params = { time_range: selectedTimeRange, interval: selectedInterval };
        const response = await axios.get("http://localhost:5000/api/compare", { params });
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching compare data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchStations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/compare/stations");
        setDevices(response.data.stations);
      } catch (error) {
        console.error("Error fetching stations:", error);
      }
    };

    fetchData();
    fetchStations();
  }, [selectedTimeRange, selectedInterval, selectedDevice1, selectedDevice2]);

  const transformData = (data, device) => {
    return data
      .filter((item) => item.deviceName === device)
      .map((item) => ({
        time: new Date(item.time).toLocaleString(),
        ...item,
      }));
  };

  const filteredData1 = selectedDevice1 ? transformData(data, selectedDevice1) : [];
  const filteredData2 = selectedDevice2 ? transformData(data, selectedDevice2) : [];

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Header />
      <CompareContainer>
        <h2>Compare Devices</h2>
        <ButtonContainer>
          {/* Time Range and Interval Selectors */}
          <Select
            options={[
              { label: "Last Day", value: "lastDay" },
              { label: "Last Week", value: "lastWeek" },
              { label: "Last Month", value: "lastMonth" },
              { label: "Last 3 Months", value: "last3Months" },
              { label: "All", value: "allTime" },
            ]}
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
          />
          <Select
            options={[
              { label: "1 Hour", value: "1h" },
              { label: "2 Hours", value: "2h" },
              { label: "4 Hours", value: "4h" },
              { label: "6 Hours", value: "6h" },
              { label: "8 Hours", value: "8h" },
              { label: "12 Hours", value: "12h" },
              { label: "All Data", value: "all" },
            ]}
            value={selectedInterval}
            onChange={(e) => setSelectedInterval(e.target.value)}
          />
        </ButtonContainer>

        {/* Metrics Checkboxes */}
        <CheckboxContainer>
          {Object.keys(selectedMetrics).map((metric) => (
            <Checkbox
              key={metric}
              name={metric}
              checked={selectedMetrics[metric]}
              onChange={(e) => setSelectedMetrics({ ...selectedMetrics, [metric]: e.target.checked })}
              label={metric.replace(/emw_/, "").replace(/_/g, " ")}
            />
          ))}
        </CheckboxContainer>

        {/* Chart for Device 1 */}
        <ChartContainer>
          <ActionContainer>
            <Select
              options={devices.map((device) => ({ label: device, value: device }))}
              value={selectedDevice1}
              onChange={(e) => setSelectedDevice1(e.target.value)}
              placeholder="Select Device for Chart 1"
            />
            <ExportToCSV data={filteredData1} fileName="station_data_1.csv" />
          </ActionContainer>
          {filteredData1.length > 0 && (
            <CustomLineChart data={filteredData1} selectedMetrics={selectedMetrics} strokeColors={strokeColors} />
          )}
        </ChartContainer>

        {/* Chart for Device 2 */}
        <ChartContainer>
          <ActionContainer>
            <Select
              options={devices.map((device) => ({ label: device, value: device }))}
              value={selectedDevice2}
              onChange={(e) => setSelectedDevice2(e.target.value)}
              placeholder="Select Device for Chart 2"
            />
            <ExportToCSV data={filteredData2} fileName="station_data_2.csv" />
          </ActionContainer>
          {filteredData2.length > 0 && (
            <CustomLineChart data={filteredData2} selectedMetrics={selectedMetrics} strokeColors={strokeColors} />
          )}
        </ChartContainer>
      </CompareContainer>
    </div>
  );
};

export default Compare;
