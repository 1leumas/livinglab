import {
  fetchAeroportoData,
  fetchParticlesData,
  fetchCruzeiroData,
} from "../../../services/apiServices";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import Chart from "../../components/Chart";
import PeakDataCards from "../../components/PeakDataCards";
import { TitleContainer } from "./styles";
import { useLocation } from "react-router-dom";
import {
  timeRangeOptions,
  intervalOptions,
} from "../../../utils/dropdownOptions";

const fetchDataBasedOnPath = (path, timeRange, interval) => {
  switch (path) {
    case "/aeroporto":
      return fetchAeroportoData(timeRange, interval);
    case "/particles":
      return fetchParticlesData(timeRange, interval);
    case "/cruzeiro":
      return fetchCruzeiroData(timeRange, interval);
    default:
      return Promise.resolve({ data: [] });
  }
};

const determineTitle = (path) => {
  switch (path) {
    case "/aeroporto":
      return "Estação Aeroporto";
    case "/particles":
      return "Micropartículas Rótula do Tafarel";
    case "/cruzeiro":
      return "Estação Cruzeiro";
    default:
      return "Default Title";
  }
};

const DynamicPage = () => {
  const [data, setData] = useState([]);
  const [timeRange, setTimeRange] = useState("lastWeek");
  const [interval, setInterval] = useState("all");
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const path = location.pathname;

  useEffect(() => {
    setLoading(true);
    fetchDataBasedOnPath(path, timeRange, interval)
      .then((dataResponse) => {
        setData(dataResponse.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fetch data error:", error);
        setLoading(false);
      });
  }, [path, timeRange, interval]);

  const title = determineTitle(path);

  return (
    <>
      <TitleContainer>
        <h1>{title}</h1>
      </TitleContainer>
      <div>
        <label>
          Time Range:
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            {timeRangeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          Interval:
          <select
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
          >
            {intervalOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <Chart data={data} />
      <PeakDataCards data={data} />

      {loading ? <Loading /> : <></>}
    </>
  );
};

export default DynamicPage;
