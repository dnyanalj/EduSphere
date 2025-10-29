import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:4000/api', // your backend port
  withCredentials: true, // if using cookies/jwt
});

export default axiosClient;
