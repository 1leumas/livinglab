import axios from "axios";

export const axiosApiInstance = axios.create({
  baseURL: "localhost:5000/api/",
  timeout: 10000,
  headers: { "Content/Type": "Application/json" },
});
