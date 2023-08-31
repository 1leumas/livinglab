import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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

const transformData = (rawData) => {
  const seenTimes = new Set();
  let transformedData = rawData.data
    .filter(item => item[7] !== 0 && item[8] !== 0)
    .filter(item => {
      const time = new Date(item[15]).getTime();
      if (seenTimes.has(time - (time % (3 * 60 * 60 * 1000)))) {
        return false;
      }
      seenTimes.add(time - (time % (3 * 60 * 60 * 1000)));
      return true;
    })
    .map(item => ({
      id: item[0],
      station: item[2],
      temperature: item[7],
      humidity: item[8],
      pressure: item[12],
      time: new Date(item[15]).toLocaleString(),
    }))
    .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());

  return transformedData;
};

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:5000/api/data/nit2xli');
      const transformedData = transformData(result.data);
      setData(transformedData);
    };

    fetchData();
  }, []);

  return (
    <div>
      {data ? (
        <LineChart width={1000} height={450} data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="temperature" stroke="#8884d8" dot={false} />
          <Line type="monotone" dataKey="humidity" stroke="#82ca9d" dot={false} />
        </LineChart>
      ) : 'Loading...'}
    </div>
  );
}

export default App;
