import axios from 'axios';

export const baseApi = axios.create({
  baseURL: import.meta.env['VITE_BASE_URL'],
  timeout: 0,
});

if (process.client) {
  baseApi.defaults.headers.common['Authorization'] =
    `Bearer ${localStorage.getItem('token')!}`;
}

baseApi.interceptors.response.use((response) => {
  const { data } = response;
  return data;
});
