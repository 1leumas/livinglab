import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { GlobalStyle } from "../../styles/global";
import { DataCard } from "./styles";
import { DataCardTitle, DataCardValue, Container } from "./styles";

/**
 * Home Component
 *
 * esse componente é responsável por renderizar a página inicial
 * ele mostra o ultimo dado captado pelo dispositivo
 *
 */

function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/api/latest");
        if (!response.ok) {
          throw new Error("Network response was not ok ", response.statusText);
        }
        const data = await response.json();
        setWeatherData(data.data[0]);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <Loading />;
  if (error) return <div>Error: {error.message}</div>;
  if (!weatherData) return <div>No weather data available</div>;

  return (
    <>
      <GlobalStyle />
      <Container>
        <DataCard>
          <DataCardTitle>Latest Data</DataCardTitle>
          <DataCardValue>{weatherData.deviceName}</DataCardValue>
          <DataCardValue>Temperature: {weatherData.temperature}°C</DataCardValue>
          <DataCardValue>Humidity: {weatherData.humidity}%</DataCardValue>
          <DataCardValue>Noise: {weatherData.noise}dB</DataCardValue>
          <DataCardValue>Voltage: {weatherData.voltage}V</DataCardValue>
          <DataCardValue>PM2.5: {weatherData.pm2_5}μg/m³</DataCardValue>
          <DataCardValue>Time: {new Date(weatherData.time).toLocaleString()}</DataCardValue>
        </DataCard>
      </Container>
    </>
  );
}

export default Home;
