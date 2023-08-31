import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const CustomTooltip = ({ active, payload }) => { //cria o tooltip
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`Time : ${payload[0].payload.time}`}</p>
        <p className="label">{`Temperature : ${payload[0].value} °C`}</p>
        <p className="label">{`Humidity : ${payload[1].value} %`}</p>
      </div>
    );
  }

  return null;
};

const transformData = (rawData) => {
  return rawData.data
    .filter(item => item[3] !== 0 && item[8] !== 0)  // nao mostra onde a temperatura ou humidade é 0
    .map(item => ({
      id: item[0],
      station: item[2], //pega os dados da estacao
      temperature: item[3], //pega os dados da temperatura
      humidity: item[8], //pega os dados da humidade
      time: new Date(item[15]).toLocaleString(), //transforma a data para o formato local
    }));
};

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:5000/api/data/nit2xli'); //conexao com o backend

      const transformedData = transformData(result.data); //transforma os dados para o grafico
      setData(transformedData); //atualiza o estado
    };

    fetchData(); //chama a funcao
  }, []);

  return ( //renderiza o grafico
    <div>
      {data ? (
        <LineChart width={1000} height={450} data={data}>
          <XAxis dataKey="time" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="humidity" stroke="#82ca9d" />
        </LineChart>
      ) : 'Loading...'}
    </div>
  );
}

export default App;
