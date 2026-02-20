import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL + "/api/v1",

  withCredentials: true,
});
export default AxiosInstance;
