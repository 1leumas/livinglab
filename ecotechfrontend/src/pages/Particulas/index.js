import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-moment";
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

//Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

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
 * Particulas component displays a chart and peak values for environmental data related to microparticles.
 */

const Particulas = () => {
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
          `http://localhost:5000/api/particulas?time_range=${timeRange}&interval=${interval}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok ", response.statusText);
        }
        const data = await response.json();
        const filteredData = data.data.filter((d) => d.pm2_5 !== null);

        setChartData({
          labels: filteredData.map((d) => new Date(d.time).toLocaleString()),
          datasets: [
            {
              label: "Temperature",
              data: filteredData.map((d) => d.temperature),
              backgroundColor: "rgba(255, 159, 64, 0.8)", // Orange
              borderColor: "rgba(255, 159, 64, 0.8)", // Orange
              pointRadius: 1,
              borderWidth: 2,
            },
            {
              label: "Humidity",
              data: filteredData.map((d) => d.humidity),
              backgroundColor: "rgba(54, 162, 235, 0.8)", // Blue
              borderColor: "rgba(54, 162, 235, 0.8)", // Blue
              pointRadius: 1,
              borderWidth: 2,
            },
            {
              label: "Noise",
              data: filteredData.map((d) => d.noise),
              backgroundColor: "rgba(75, 192, 192, 0.8)", // Teal
              borderColor: "rgba(75, 192, 192, 0.8)", // Teal
              pointRadius: 1,
              borderWidth: 2,
            },
            {
              label: "Voltage",
              data: filteredData.map((d) => d.voltage),
              backgroundColor: "rgba(153, 102, 255, 0.8)", // Purple
              borderColor: "rgba(153, 102, 255, 0.8)", // Purple
              pointRadius: 1,
              borderWidth: 2,
            },
            {
              label: "PM2.5",
              data: filteredData.map((d) => d.pm2_5),
              backgroundColor: "rgba(255, 99, 132, 0.8)", // Red
              borderColor: "rgba(255, 99, 132, 0.8)", // Red
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
  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
  if (!chartData) return <div>No weather data available</div>;

  // Calculate peak values for each dataset
  const peakValues = getPeakValues(chartData.datasets);

  return (
    <>
      <GlobalStyle />
      <Container>
        <StationTitle>Micropartículas Rótula do Tafarel</StationTitle>
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
              unit={getUnitForLabel(value.label)} // Assuming you have a function to get the unit based on the label
            />
          ))}
        </CardContainer>
      </Container>
    </>
  );
};

export default Particulas;
