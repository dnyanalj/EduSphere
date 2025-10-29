import axiosClient from './axios.js';

export const createTest = (testData) =>
    axiosClient.post('/examiner/create-test', testData);

export const getAllTests = () =>
    axiosClient.get('/examiner/tests');
