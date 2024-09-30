import axios from 'axios';

export const axiosApi = axios.create({
  baseURL: import.meta.client
    ? import.meta.env['VITE_BASE_URL']
    : import.meta.env['VITE_SERVER_BASE_URL'],
  timeout: 0,
});

if (process.client) {
  axiosApi.defaults.headers.common['Authorization'] =
    `Bearer ${localStorage.getItem('token')!}`;
}

axiosApi.interceptors.response.use((response) => {
  const { data } = response;
  return data;
});
