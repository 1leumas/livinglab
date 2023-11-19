import { useState, useEffect } from "react";
import { WeatherServices } from "./services/handlers";
import Chart from "./components/Chart";
import { Particles } from "./interfaces/weather";

export default function App() {
  const [data, setData] = useState<Particles[]>([]);

  const fetchData = async () => {
    try {
      const result = await WeatherServices.getParticlesWeatherData();

      if (result) {
        const filteredData = result.data.filter(
          (item: Particles) =>
            item.temperature !== null &&
            item.humidity !== null &&
            item.pm2_5 !== null,
        );

        setData(filteredData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();

  }, []);

  return (
    <>
      <Chart data={data} />
    </>
  );
}
