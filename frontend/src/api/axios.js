import axios from 'axios';

const axiosClient = axios.create({
  baseURL:  import.meta.env.VITE_API_BASE_URL, // your backend port
  // withCredentials: true, // if using cookies/jwt
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
