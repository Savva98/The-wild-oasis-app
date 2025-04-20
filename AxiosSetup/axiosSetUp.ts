import axios from "axios";
const url = import.meta.env.VITE_API_URL as string;
const api = axios.create({
  baseURL: url,
  withCredentials: true,
});

export default api;
