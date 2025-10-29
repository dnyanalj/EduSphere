import axiosClient from './axios.js';

export const getScheduledTests = () => axiosClient.get('/candidate/tests');
export const startAttempt = (testId) => axiosClient.post('/candidate/start-attempt', { testId });
export const saveAnswer = (attemptId, data) => axiosClient.post(`/candidate/${attemptId}/save-answer`, data);
export const finishAttempt = (attemptId) => axiosClient.post(`/candidate/${attemptId}/finish`);
