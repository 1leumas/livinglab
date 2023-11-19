import axios from "axios";

export const axiosApiInstance = axios.create({
  baseURL: "http://localhost:5000/api/",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});
