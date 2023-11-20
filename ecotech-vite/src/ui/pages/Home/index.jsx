import { getLatestData } from "../../../services/apiServices";
import formatDateAndTime from "../../../utils/dateFormatter";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import { DataCard, DataCardValue, Container } from "./styles";

const Home = () => {
  const [data, setData] = useState();

  useEffect(() => {
    getLatestData().then((data) => {
      setData(data[0]);
    });
  }, []);

  if (!data) return <Loading />;

  return (
    <Container>
      <DataCard>
        <h1>Latest Data</h1>
        <DataCardValue>{data.deviceName}</DataCardValue>
        <DataCardValue>{formatDateAndTime(data.time)}</DataCardValue>
        <DataCardValue>Temperature: {data.temperature}°C</DataCardValue>
        <DataCardValue>Humidity: {data.humidity}%</DataCardValue>
        <DataCardValue>Noise: {data.noise}dB</DataCardValue>
        <DataCardValue>Voltage: {data.voltage}V</DataCardValue>
        <DataCardValue>PM2.5: {data.pm2_5}μg/m³</DataCardValue>
      </DataCard>
    </Container>
  );
};

export default Home;
