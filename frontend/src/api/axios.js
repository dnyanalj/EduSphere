import axios from 'axios';

const axiosClient = axios.create({
  baseURL:  import.meta.env.VITE_API_BASE_URL, // your backend port
  withCredentials: true, // if using cookies/jwt
});

export default axiosClient;
