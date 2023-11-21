import { getLatestData } from "../../../services/apiServices";
import { formatDateAndTime } from "../../../utils/dateFormatter";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import { DataCard, DataCardValue, Container } from "./styles";

const Home = () => {
  const [data, setData] = useState();

  useEffect(() => {
    getLatestData().then((data) => {
      setData(data.data);
      //console.log(data.data);
    });
  }, []);

  if (!data) return <Loading />;

  return (
    <Container>
      <DataCard>
        <h1>Latest Data</h1>
        <DataCardValue>{data[0].deviceName}</DataCardValue>
        <DataCardValue>{formatDateAndTime(data[0].time)}</DataCardValue>
        <DataCardValue>Temperature: {data[0].temperature}°C</DataCardValue>
        <DataCardValue>Humidity: {data[0].humidity}%</DataCardValue>
        <DataCardValue>Noise: {data[0].noise}dB</DataCardValue>
        <DataCardValue>Voltage: {data[0].voltage}V</DataCardValue>
        <DataCardValue>PM2.5: {data[0].pm2_5}μg/m³</DataCardValue>
      </DataCard>
    </Container>
  );
};

export default Home;
