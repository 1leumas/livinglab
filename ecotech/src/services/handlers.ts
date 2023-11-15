import { axiosApiInstance } from "./api";

const getAirportWeatherData = async () => {
  try {
    const res = axiosApiInstance.get("/aeroporto");
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getCruiseWeatherData = async () => {
  try {
    const res = axiosApiInstance.get("/cruzeiro");
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getParticlesWeatherData = async () => {
  try {
    const res = axiosApiInstance.get("/particulas");
    return res;
  } catch (error) {
    console.log(error);
  }
};

const getLatestWeatherData = async () => {
  try {
    const res = axiosApiInstance.get("/latest");
    return res;
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
