import { axiosApiInstance } from "./api";

const getAirportWeatherData = async () => {
  try {
    const res = await axiosApiInstance.get("/aeroporto");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const getCruiseWeatherData = async () => {
  try {
    const res = await axiosApiInstance.get("/cruzeiro");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const getParticlesWeatherData = async () => {
  try {
    const res = await axiosApiInstance.get("/particulas");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const getLatestWeatherData = async () => {
  try {
    const res = await axiosApiInstance.get("/latest");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const WeatherServices = {
  getCruiseWeatherData,
  getParticlesWeatherData,
  getAirportWeatherData,
  getLatestWeatherData,
};
