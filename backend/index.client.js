'use client';

import React, { useEffect, useState } from "react";

function WeatherContainer() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        const response = await fetch("http://localhost:5000/api/latest");
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        const data = await response.json();
        setWeatherData(data.data[0]);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    
    fetchWeatherData();

  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!weatherData) return <div>No weather data available</div>;

  return (
    <div className="p-4 bg-green-500 text-white">
      <h1 className="text-2xl font-bold">Weather Data</h1>
      <p>Temperature: {weatherData.temperature}°C</p>
      <p>Humidity: {weatherData.humidity}%</p>
      <p>Noise: {weatherData.noise}</p>
      <p>Voltage: {weatherData.voltage}V</p>
      <p>PM2.5: {weatherData.pm2_5}μg/m³</p>
      <p>Time: {new Date(weatherData.time).toLocaleString()}</p>
    </div>
  );
}

export default WeatherContainer;
