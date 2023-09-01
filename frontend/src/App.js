import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Header from "./components/header";
import SearchBar from "./components/searchBar";

//tooltip
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`Time: ${payload[0].payload.time}`}</p>
        <p className="label">{`Temperature: ${payload[0].value} °C`}</p>
        <p className="label">{`Humidity: ${payload[1].value} %`}</p>
        <p className="label">{`Pressure: ${payload[0].payload.pressure} mbar`}</p>
      </div>
    );
  }
  return null;
};

//transformar o data em algo mais legível
const transformData = (rawData, date = null) => {
  let transformedData = rawData.data
    .filter((item) => item[7] !== 0 && item[8] !== 0)
    .map((item) => ({
      id: item[0],
      station: item[2],
      temperature: item[7],
      humidity: item[8],
      pressure: item[12],
      time: new Date(item[15]).toISOString(),
    }))
    .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

  if (date) {
    transformedData = transformedData.filter((item) => {
      const itemDate = new Date(item.time);
      const searchDate = new Date(date);
      return (
        itemDate.getUTCDate() === searchDate.getUTCDate() &&
        itemDate.getUTCMonth() === searchDate.getUTCMonth() &&
        itemDate.getUTCFullYear() === searchDate.getUTCFullYear()
      );
    });
  } else {
    const filteredData = [];
    let lastTime = null;

    for (const item of transformedData) {
      const itemTime = new Date(item.time).getTime();

      if (!lastTime || Math.abs(itemTime - lastTime) >= 5 * 60 * 60 * 1000) {
        // 5 horas em milissegundos
        lastTime = itemTime;
        filteredData.push(item);
      }
    }

    transformedData = filteredData;
  }

  return transformedData;
};

// App principal
function App() {
  const [data, setData] = useState(null);
  // eslint-disable-next-line
  const [searchDate, setSearchDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  //fetch data / conexao com o backend
  const fetchData = async (date = null) => {
    setIsLoading(true);
    try {
      const result = await axios.get('http://localhost:5000/api/data/nit2xli');  // Replace with your API
      let transformedData = transformData(result.data, date);
      setData(transformedData);
    } catch (error) {
      console.error("There was an issue fetching data:", error);
    }
    setIsLoading(false);
    console.log('Data fetched!');
  };

  useEffect(() => {
    console.log('Fetching data...');
    fetchData();
  }, []);

  // renderiza o app
  return (
    <div>
      <Header />
      <SearchBar setSearchDate={setSearchDate} fetchData={fetchData} />
      {isLoading ? 'Loading...' : (
        data ? (
          <LineChart width={1000} height={450} data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="temperature" stroke="#8884d8" dot={false} />
          <Line type="monotone" dataKey="humidity" stroke="#82ca9d" dot={false} />
          </LineChart>
        ) : 'Data not available'
      )}
    </div>
  );
}

export default App;