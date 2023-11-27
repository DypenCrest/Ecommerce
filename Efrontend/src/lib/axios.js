import axios from "axios";

const $axios = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 5000,
});

// access token on every request
$axios.interceptors.request.use(function (config) {
  const accesstoken = localStorage.getItem("accesstoken");

  if (accesstoken) {
    config.headers.Authorization = `Bearer ${accesstoken}`;
  }
  return config;
});

export { $axios };
