import axios from "axios";

export const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL as string;
const api = axios.create({
  baseURL: BASE_URL,
});

export default api;
