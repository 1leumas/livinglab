import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Dropdown from "../../components/Dropdown";
import { GlobalStyle } from "../../styles/global";
import {
  ChartContainer,
  Container,
  DropdownContainer,
  CardContainer,
  StationTitle,
} from "./styles";
import Loading from "../../components/Loading";
import { getUnitForLabel, getPeakValues } from "../../utils/getPeakValues";
import { chartOptions } from "../../utils/chartOptions";
import SquareCard from "../../components/SquareCard";

// Dropdown options for time range and interval selection
const timeRangeOptions = [
  { label: "Last Day", value: "lastDay" },
  { label: "Last Week", value: "lastWeek" },
  { label: "Last Month", value: "lastMonth" },
  { label: "Last 3 Months", value: "last3Months" },
  { label: "All Data", value: "allTime" },
];

const intervalOptions = [
  { label: "1h", value: "1h" },
  { label: "2h", value: "2h" },
  { label: "4h", value: "4h" },
  { label: "7h", value: "7h" },
  { label: "All Data", value: "all" },
];



/**
 * Aeroporto is a React component that renders environmental data for a specific station.
 * It displays a line chart with multiple datasets and peak value cards for each dataset.
 */

const Aeroporto = () => {
  // State hooks for managing chart data, time range, interval, loading status, and errors
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  const [timeRange, setTimeRange] = useState("lastDay");
  const [interval, setInterval] = useState("2h");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect hook to fetch data on component mount and when time range or interval changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/aeroporto?time_range=${timeRange}&interval=${interval}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok ", response.statusText);
        }
        const data = await response.json();
        const filteredData = data.data.filter(
          (d) => d.emw_temperature !== null
        );

        setChartData({
          labels: filteredData.map((d) => new Date(d.time).toLocaleString()),
          datasets: [
            {
              label: "Temperature",
              data: filteredData.map((d) => d.emw_temperature),
              backgroundColor: "rgba(255, 69, 0, 0.8)", // Red-Orange
              borderColor: "rgba(255, 69, 0, 1)", // Red-Orange Border
              pointRadius: 1,
              borderWidth: 2,
            },
            {
              label: "Humidity",
              data: filteredData.map((d) => d.emw_humidity),
              backgroundColor: "rgba(30, 144, 255, 0.8)", // Dodger Blue
              borderColor: "rgba(30, 144, 255, 1)", // Dodger Blue Border
              pointRadius: 1,
              borderWidth: 2,
            },
            {
              label: "Atmospheric Pressure",
              data: filteredData.map((d) => d.emw_atm_pres),
              backgroundColor: "rgba(50, 205, 50, 0.8)", // Lime Green
              borderColor: "rgba(50, 205, 50, 1)", // Lime Green Border
              pointRadius: 1,
              borderWidth: 2,
            },
            {
              label: "UV",
              data: filteredData.map((d) => d.emw_uv),
              backgroundColor: "rgba(138, 43, 226, 0.8)", // Blue Violet
              borderColor: "rgba(138, 43, 226, 1)", // Blue Violet Border
              pointRadius: 1,
              borderWidth: 2,
            },
            {
              label: "Luminosity",
              data: filteredData.map((d) => d.emw_luminosity),
              backgroundColor: "rgba(255, 215, 0, 0.8)", // Gold
              borderColor: "rgba(255, 215, 0, 1)", // Gold Border
              pointRadius: 1,
              borderWidth: 2,
            },
            {
              label: "Rain Level",
              data: filteredData.map((d) => d.emw_rain_lvl),
              backgroundColor: "rgba(70, 130, 180, 0.8)", // Steel Blue
              borderColor: "rgba(70, 130, 180, 1)", // Steel Blue Border
              pointRadius: 1,
              borderWidth: 2,
            },
            {
              label: "Average Wind Speed",
              data: filteredData.map((d) => d.emw_avg_wind_speed),
              backgroundColor: "rgba(210, 105, 30, 0.8)", // Chocolate
              borderColor: "rgba(210, 105, 30, 1)", // Chocolate Border
              pointRadius: 1,
              borderWidth: 2,
            },
            {
              label: "Gust Wind Speed",
              data: filteredData.map((d) => d.emw_gust_wind_speed),
              backgroundColor: "rgba(106, 90, 205, 0.8)", // Slate Blue
              borderColor: "rgba(106, 90, 205, 1)", // Slate Blue Border
              pointRadius: 1,
              borderWidth: 2,
            },
            {
              label: "Solar Radiation",
              data: filteredData.map((d) => d.emw_solar_radiation),
              backgroundColor: "rgba(255, 140, 0, 0.8)", // Dark Orange
              borderColor: "rgba(255, 140, 0, 1)", // Dark Orange Border
              pointRadius: 1,
              borderWidth: 2,
            },
            {
              label: "Internal Temperature",
              data: filteredData.map((d) => d.internal_temperature),
              backgroundColor: "rgba(219, 112, 147, 0.8)", // Pale Violet Red
              borderColor: "rgba(219, 112, 147, 1)", // Pale Violet Red Border
              pointRadius: 1,
              borderWidth: 2,
            },
            {
              label: "Internal Humidity",
              data: filteredData.map((d) => d.internal_humidity),
              backgroundColor: "rgba(72, 209, 204, 0.8)", // Medium Turquoise
              borderColor: "rgba(72, 209, 204, 1)", // Medium Turquoise Border
              pointRadius: 1,
              borderWidth: 2,
            },
          ],
        });
      } catch (error) {
        setError(error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange, interval]);

  // Event handlers for dropdown changes
  const handleTimeRangeChange = (event) => setTimeRange(event.target.value);
  const handleIntervalChange = (event) => setInterval(event.target.value);

  // Conditional rendering based on loading and error states
  if (error) return <div>Error: {error.message}</div>;
  if (!chartData) return <div>No weather data available</div>;

  // Calculate peak values for each dataset
  const peakValues = getPeakValues(chartData.datasets);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <GlobalStyle />
          <Container>
            <StationTitle>Estação Aeroporto</StationTitle>
            <DropdownContainer>
              <Dropdown
                options={timeRangeOptions}
                onChange={handleTimeRangeChange}
                value={timeRange}
              />
              <Dropdown
                options={intervalOptions}
                onChange={handleIntervalChange}
                value={interval}
              />
            </DropdownContainer>

            <ChartContainer>
              <Line options={chartOptions} data={chartData} />
            </ChartContainer>

            <h2>Peak Values</h2>
            <CardContainer>
              {peakValues.map((value, index) => (
                <SquareCard
                  key={index}
                  label={value.label}
                  value={value.peakValue}
                  unit={getUnitForLabel(value.label)}
                />
              ))}
            </CardContainer>
          </Container>
        </>
      )}
    </>
  );
};

export default Aeroporto;
