import axios from "axios";
import { serverApi } from "../../lib/config";

const axiosInstance = axios.create({
  baseURL: serverApi,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
