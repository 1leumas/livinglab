import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import { LatestDataCard } from "./styles";
import Loading from "../../components/loading/loading.jsx";

const Home = () => {
  const [latestData, setLatestData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/data/latest")
      .then((response) => response.json())
      .then((data) => setLatestData(data.latest_data))
      .catch((error) => console.log("Error fetching latest data:", error));

    console.log(latestData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      {latestData ? (
        <LatestDataCard>
          <p>Device: {latestData[2]}</p>
          <h3>Temperature: {latestData[4]}°C</h3>
          <p>Humidity: {latestData[6]}%</p>
          <p>Noise: {latestData[3]}</p>
          <p>Voltage: {latestData[5]}</p>
          <p>Time: {latestData[8]}</p>
        </LatestDataCard>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Home;
