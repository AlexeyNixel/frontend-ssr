import axios from 'axios';

export const axiosApi = axios.create({
  baseURL: import.meta.env['VITE_BASE_URL'],
  timeout: 1000,
});

if (process.client) {
  axiosApi.defaults.headers.common[
    'Authorization'
  ] = `Bearer ${localStorage.getItem('token')!}`;
}

axiosApi.interceptors.response.use((response) => {
  const { data } = response;
  return data;
});
