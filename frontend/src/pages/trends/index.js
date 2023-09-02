import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TrendsContainer,
  ChartContainer,
  CustomTooltipContainer,
  ButtonContainer,
  CheckboxGroup,
} from "./styles";
import Header from "../../components/header";
import Loading from "../../components/loading/loading.jsx";
import Button from "../../components/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
} from "recharts";
import DateSelect from "../../components/dateSelect";
import Checkbox from "../../components/checkbox";

const transformData = (rawData) => {
  return rawData.map((item) => ({
    device: item[2],
    temperature: item[4],
    humidity: item[6],
    noise: item[3],
    voltage: item[5],
    time: new Date(item[8]).toLocaleString(),
  }));
};

const CustomYAxisTick = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={5}
        textAnchor="end"
        fill="#FFFFFF"
        fontSize={12}
        fontFamily="Arial"
      >
        {payload.value}
      </text>
    </g>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <CustomTooltipContainer key={data.time}>
        <p className="label">{`Time: ${data.time}`}</p>
        <p className="label">{`Device: ${data.device}`}</p>
        <p className="label">{`Temperature: ${data.temperature} °C`}</p>
        <p className="label">{`Humidity: ${data.humidity} %`}</p>
        <p className="label">{`Noise: ${data.noise}`}</p>
        <p className="label">{`Voltage: ${data.voltage}`}</p>
      </CustomTooltipContainer>
    );
  }
  return null;
};

const exportToCSV = (csvData, fileName) => {
  const csvRows = [];
  const headers = Object.keys(csvData[0]);
  csvRows.push(headers.join(","));
  for (const row of csvData) {
    const values = headers.map((header) => {
      const escaped = ("" + row[header]).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(","));
  }
  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  const link = document.createElement("a");
  link.download = fileName;
  link.href = URL.createObjectURL(blob);
  link.click();
};

const Trends = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState("lastDay");
  const [showDateSelect, setShowDateSelect] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState({
    temperature: true,
    humidity: true,
    noise: false,
    voltage: false,
  });

  const handleDateSearch = (startDate, endDate) => {
    fetchData({ startDate, endDate });
  };

  const handleMetricChange = (e) => {
    const value = e.target.checked;
    const name = e.target.name;
    setSelectedMetrics((prevMetrics) => ({
      ...prevMetrics,
      [name]: value,
    }));
  };

  const fetchData = async (dateRange = null) => {
    try {
      setLoading(true);
      let url = `http://localhost:5000/api/trends?time_range=${selectedTimeRange}`;

      if (dateRange) {
        url += `&start_date=${dateRange.startDate}&end_date=${dateRange.endDate}`;
      }

      const response = await axios.get(url);
      const transformedData = transformData(response.data.data);
      setData(transformedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching trends data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTimeRange]);

  return (
    <div>
      <Header />
      {showDateSelect && (
        <DateSelect
          onClose={() => setShowDateSelect(false)}
          onSearch={handleDateSearch}
        />
      )}
      {loading ? (
        <Loading message="Loading trends data..." />
      ) : (
        <TrendsContainer>
          <h2>Select Time Period:</h2>
          <ButtonContainer>
            <Button
              onClick={() => setSelectedTimeRange("lastDay")}
              selected={selectedTimeRange === "lastDay"}
            >
              Last Day
            </Button>
            <Button
              onClick={() => setSelectedTimeRange("lastWeek")}
              selected={selectedTimeRange === "lastWeek"}
            >
              Last Week
            </Button>
            <Button
              onClick={() => setSelectedTimeRange("lastMonth")}
              selected={selectedTimeRange === "lastMonth"}
            >
              Last Month
            </Button>
            <Button
              onClick={() => setSelectedTimeRange("last3Months")}
              selected={selectedTimeRange === "last3Months"}
            >
              Last 3 Months
            </Button>
            <Button
              onClick={() => setSelectedTimeRange("allTime")}
              selected={selectedTimeRange === "allTime"}
            >
              All Time
            </Button>
            <Button onClick={() => setShowDateSelect(true)}>
              Select Custom Range
            </Button>
            <Button onClick={() => exportToCSV(data, "trends_data.csv")}>
              Export to CSV
            </Button>
          </ButtonContainer>
          <CheckboxGroup>
            <Checkbox
              name="temperature"
              checked={selectedMetrics.temperature}
              onChange={handleMetricChange}
              label="Temperature"
            />
            <Checkbox
              name="humidity"
              checked={selectedMetrics.humidity}
              onChange={handleMetricChange}
              label="Humidity"
            />
            <Checkbox
              name="noise"
              checked={selectedMetrics.noise}
              onChange={handleMetricChange}
              label="Noise"
            />
            <Checkbox
              name="voltage"
              checked={selectedMetrics.voltage}
              onChange={handleMetricChange}
              label="Voltage"
            />
          </CheckboxGroup>
          <ChartContainer>
            <LineChart
              width={1250}
              height={400}
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <rect
                x={0}
                y={0}
                width={800}
                height={400}
                fill="rgb(97, 97, 97)"
              />
              <XAxis dataKey="time" hide={true} />
              <YAxis tick={<CustomYAxisTick />} />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Brush dataKey="time" height={30} stroke="gray" />
              {selectedMetrics.temperature && (
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="#8884d8"
                  dot={false}
                />
              )}
              {selectedMetrics.humidity && (
                <Line
                  type="monotone"
                  dataKey="humidity"
                  stroke="#82ca9d"
                  dot={false}
                />
              )}
              {selectedMetrics.noise && (
                <Line
                  type="monotone"
                  dataKey="noise"
                  stroke="#ffc658"
                  dot={false}
                />
              )}
              {selectedMetrics.voltage && (
                <Line
                  type="monotone"
                  dataKey="voltage"
                  stroke="#ff7300"
                  dot={false}
                />
              )}
            </LineChart>
          </ChartContainer>
        </TrendsContainer>
      )}
    </div>
  );
};

export default Trends;
