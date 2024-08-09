import axios from 'axios';
import Cookies from 'js-cookie';
export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.request.use((config) => {
  if (config.url?.includes('/products')) {
    const access_token = Cookies.get('access_token');
    if (access_token) {
      config.headers['Authorization'] = `Bearer ${access_token}`;
    }
  }
  return config;
});
