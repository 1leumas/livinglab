import { axiosApiInstance } from "./axiosConfig";

export const fetchCruzeiroData = async (timeRange, interval) => {
  try {
    const res = await axiosApiInstance.get(
      `/cruzeiro?time_range=${timeRange}&interval=${interval}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAeroportoData = async (timeRange, interval) => {
  try {
    const res = await axiosApiInstance.get(
      `/aeroporto?time_range=${timeRange}&interval=${interval}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchParticlesData = async (timeRange, interval) => {
  try {
    const res = await axiosApiInstance.get(
      `/particles?time_range=${timeRange}&interval=${interval}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getLatestData = async () => {
  try {
    const res = await axiosApiInstance.get("/latest");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
