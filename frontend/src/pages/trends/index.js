// imports
import React, { useState, useEffect } from "react";
import axios from "axios";
import { TrendsContainer, ChartContainer } from "./styles";
import Header from "../../components/header";
import Loading from "../../components/loading/loading.jsx";
import Select from "../../components/select/Select";
import IntervalSelect from "../../components/intervalSelect";
import CustomLineChart from "../../components/customLineChart";
import ExportToCSV from "../../components/exportToCSV";
import DateSelect from "../../components/dateSelect";
import Checkbox from "../../components/checkbox";
import { ButtonContainer, CheckboxGroup } from "./styles";

const Trends = () => {
  /*

    Variables

  */
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState("lastDay");
  const [showDateSelect, setShowDateSelect] = useState(false);
  const [selectedMetrics, setSelectedMetrics] = useState({
    temperature: true,
    humidity: true,
    noise: false,
    voltage: false,
  });
  const [selectedInterval, setSelectedInterval] = useState("all");
  const [customInterval, setCustomInterval] = useState(1);
  const [showIntervalSelect, setShowIntervalSelect] = useState(false);
  const [originalData, setOriginalData] = useState([]);

  const timeOptions = [
    { label: "Last Day", value: "lastDay" },
    { label: "Last Week", value: "lastWeek" },
    { label: "Last Month", value: "lastMonth" },
    { label: "Last 3 Months", value: "last3Months" },
    { label: "Custom", value: "custom" },
    { label: "All", value: "allTime" },
  ];

  const intervalOptions = [
    { label: "1 Hour", value: "1h" },
    { label: "4 Hours", value: "4h" },
    { label: "12 Hours", value: "12h" },
    { label: "Custom", value: "custom" },
    { label: "All Data", value: "all" },
  ];

  const availableMetrics = [
    { label: "Temperature", value: "temperature" },
    { label: "Humidity", value: "humidity" },
    { label: "Noise", value: "noise" },
    { label: "Voltage", value: "voltage" },
  ];

  const strokeColors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7300",
    "#000000",
    "#00ff00",
    "#ff0000",
    "#0000ff",
  ];

  /*

    Functions

  */

  // Busca os dados da API
  const fetchData = async (dateRange = null) => {
    console.log("Fetching Data");
    try {
      setLoading(true);
      let url = `http://localhost:5000/api/trends?time_range=${selectedTimeRange}`;
      if (dateRange) {
        url += `&start_date=${dateRange.startDate}&end_date=${dateRange.endDate}`;
      }
      const response = await axios.get(url);
      const transformedData = transformData(response.data.data);
      setData(transformedData);
      setOriginalData(transformedData); // cópia para os dados nao serem apagados na memória
      setLoading(false);
    } catch (error) {
      console.error("Error fetching trends data:", error);
      setLoading(false);
    }
  };

  // Transforma os dados da API em um array de objetos
  const transformData = (rawData) => {
    console.log("Transforming Data");
    return rawData.map((item) => ({
      device: item[2],
      temperature: item[4],
      humidity: item[6],
      noise: item[3],
      voltage: item[5],
      time: new Date(item[8]).toLocaleString(),
    }));
  };

  // Mudar o estado do intervalo de tempo (Horas) selecionado
  const filterData = (intervalToUse = customInterval) => {
    console.log("Filtering Data");
    let filteredData = [...originalData]; // Começamos com todos os dados

    if (selectedInterval !== "all") {
      let intervalInHours;

      if (selectedInterval === "custom") {
        intervalInHours = intervalToUse;
      } else {
        intervalInHours = parseInt(selectedInterval.replace("h", ""), 10);
      }

      let nextTime = new Date(filteredData[0].time).getTime();
      filteredData = filteredData.filter((item) => {
        const currTime = new Date(item.time).getTime();
        if (currTime >= nextTime) {
          nextTime = currTime + intervalInHours * 60 * 60 * 1000;
          return true;
        }
        return false;
      });
    }

    setData(filteredData);
  };
  
  // Mudar o estado do intervalo de tempo (Dias / Meses) selecionado
  const handleTimeRangeChange = (e) => {
    console.log("Time Range Change");
    const newTimeRange = e.target.value;

    if (newTimeRange === "custom") {
      setShowDateSelect(true);
      return;
    }

    setSelectedTimeRange(newTimeRange);
  };

  // Confirmar o intervalo de datas personalizado
  const handleDateSearch = (startDate, endDate) => {
    console.log("Custom Data Search");
    fetchData({ startDate, endDate });
  };

  // Confirmar o intervalo personalizado
  const handleIntervalConfirm = (customValue) => {
    console.log("Interval Custom Confirm");
    setCustomInterval(customValue);
    filterData(customValue);
    setShowIntervalSelect(false);
  };

  // Atualiza o estado do intervalo selecionado
  const handleIntervalChange = (e) => {
    console.log("Interval Change");
    const value = e.target.value;
    setSelectedInterval(value);
    if (value === "custom") {
      setShowIntervalSelect(true); // Abre o componente de seleção de intervalo personalizado
    } else {
      filterData();
    }
  };

  // Atualiza o estado do checkbox selecionado
  const handleMetricChange = (e) => {
    console.log("Metric Change");
    const value = e.target.checked;
    const name = e.target.name;
    setSelectedMetrics((prevMetrics) => ({
      ...prevMetrics,
      [name]: value,
    }));
  };

  // Quando o componente é montado, buscamos os dados
  useEffect(() => {
    console.log("Component Mount")
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTimeRange]);

  // Quando os dados são atualizados, filtramos novamente
  useEffect(() => {
    filterData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedInterval]);
  
  /*

    Render

  */

  return (
    <div>
      <Header />
      {showDateSelect && (
        <DateSelect
          onClose={() => setShowDateSelect(false)}
          onSearch={handleDateSearch}
        />
      )}
      {showIntervalSelect && (
        <IntervalSelect
          onClose={() => setShowIntervalSelect(false)}
          onConfirm={handleIntervalConfirm}
        />
      )}
      {loading ? (
        <Loading />
      ) : (
        <TrendsContainer>
          <h2>Select Time Period:</h2>
          <ButtonContainer>
            <Select
              options={timeOptions}
              value={selectedTimeRange}
              onChange={handleTimeRangeChange}
            />
            <Select
              options={intervalOptions}
              value={selectedInterval}
              onChange={handleIntervalChange}
            />
            <ExportToCSV data={data} fileName="trends_data.csv" />
          </ButtonContainer>
          <CheckboxGroup>
            {availableMetrics.map((metric) => (
              <Checkbox
                key={metric.value}
                name={metric.value}
                checked={selectedMetrics[metric.value]}
                onChange={handleMetricChange}
                label={metric.label}
              />
            ))}
          </CheckboxGroup>
          <ChartContainer>
            <CustomLineChart
              data={data}
              selectedMetrics={selectedMetrics}
              strokeColors={strokeColors}
            />
          </ChartContainer>
        </TrendsContainer>
      )}
    </div>
  );
};

export default Trends;
