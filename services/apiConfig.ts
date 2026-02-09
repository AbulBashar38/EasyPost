import axios from "axios";

const BASE_URL = "http://localhost:5050/api";

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error);

    // TODO: Add global error handling (e.g. token refresh, logout on 401)
    return Promise.reject(error);
  },
);
