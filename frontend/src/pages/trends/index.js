import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TrendsContainer,
  TimeRangeButton,
  ChartContainer,
  CustomTooltipContainer,
  ExportButton,
  ButtonContainer,
} from "./styles";
import Header from "../../components/header";
import Loading from "../../components/loading/loading.jsx";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

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
  const csvString = csvRows.join("\\n");
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/trends?time_range=${selectedTimeRange}`
        );
        const transformedData = transformData(response.data.data);
        setData(transformedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trends data:", error);
        setLoading(false);
      }
    };

    fetchData();
    //console.log(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTimeRange]);

  return (
    <div>
      <Header />
      {loading ? (
        <Loading message="Loading trends data..." />
      ) : (
        <TrendsContainer>
          <h2>Select Time Period:</h2>
          <ButtonContainer>
            <TimeRangeButton
              onClick={() => setSelectedTimeRange("lastDay")}
              selected={selectedTimeRange === "lastDay"}
            >
              Last Day
            </TimeRangeButton>
            <TimeRangeButton
              onClick={() => setSelectedTimeRange("lastWeek")}
              selected={selectedTimeRange === "lastWeek"}
            >
              Last Week
            </TimeRangeButton>
            <TimeRangeButton
              onClick={() => setSelectedTimeRange("lastMonth")}
              selected={selectedTimeRange === "lastMonth"}
            >
              Last Month
            </TimeRangeButton>
            <TimeRangeButton
              onClick={() => setSelectedTimeRange("last3Months")}
              selected={selectedTimeRange === "last3Months"}
            >
              Last 3 Months
            </TimeRangeButton>
            <TimeRangeButton
              onClick={() => setSelectedTimeRange("allTime")}
              selected={selectedTimeRange === "allTime"}
            >
              All Time
            </TimeRangeButton>
            <ExportButton onClick={() => exportToCSV(data, "trends_data.csv")}>
              Export to CSV
            </ExportButton>
          </ButtonContainer>
          <ChartContainer>
            <LineChart
              width={1000}
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
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#8884d8"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="humidity"
                stroke="#82ca9d"
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </TrendsContainer>
      )}
    </div>
  );
};

export default Trends;
