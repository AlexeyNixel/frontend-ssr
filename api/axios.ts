import axios from 'axios';

export const axiosApi = axios.create({
  baseURL: import.meta.env['VITE_BASE_URL'],
  timeout: 1000,
});

axiosApi.interceptors.response.use(
  (response) => {
    const { data } = response;
    return data;
  },
);