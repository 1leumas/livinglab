import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import Loading from "../../components/loading/loading.jsx";
import { HomeContainer, DataCard } from "./styles";

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/latest");
        const data = await response.json();
        if (data.status === "success" && data.data.length > 0) {
          setData(data.data[0]);
        } else {
          console.error("No data found");
        }
      } catch (error) {
        console.error("Error fetching latest data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      <HomeContainer>
        <h2>Latest Data</h2>
        {data ? (
          <DataCard>
            <p>Device: {data.deviceName}</p>
            <h3>Temperature: {data.temperature.toFixed(2)}°C</h3>
            <p>Humidity: {data.humidity.toFixed(2)}%</p>
            <p>Noise: {data.noise.toFixed(2)}</p>
            <p>Voltage: {data.voltage.toFixed(2)}</p>
            <p>Time: {new Date(data.time).toLocaleString()}</p>
          </DataCard>
        ) : (
          <Loading />
        )}
      </HomeContainer>
    </div>
  );
};

export default Home;
