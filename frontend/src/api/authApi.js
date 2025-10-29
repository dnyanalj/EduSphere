import axiosClient from './axios.js';

export const signup = (data) => axiosClient.post('/auth/signup', data);
export const login = (data) => axiosClient.post('/auth/login', data);
