import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
