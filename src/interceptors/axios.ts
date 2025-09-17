//@ts-nocheck
import axios from "axios";

const defaultOptions = {
  baseURL: 'import.meta.env.VITE_BASE_URL',
  headers: {
    "Content-Type": "application/json",
  },
};

const instance = axios.create(defaultOptions);

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const locale = localStorage.getItem("CURRENT_LANGUAGE") || "en";

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["Accept-Language"] = locale;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
