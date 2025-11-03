// import { answer } from '../../../backend/src/prisma.js';
import axiosClient from './axios.js';

export const getScheduledTests = () => axiosClient.get('/candidate/tests');
export const startAttempt = (testId) => axiosClient.post('/candidate/start-attempt', { testId });
export const getExamQuestions = (attemptId) => axiosClient.get(`/candidate/attempt/${attemptId}/questions`);
export const submitExam=(attemptId, answers) => axiosClient.post(`/candidate/attempt/${attemptId}/finish`, { answers });
// export const finishAttempt = (attemptId) => axiosClient.post(`/candidate/${attemptId}/finish`, { answers });
export const getResult = (attemptId) => axiosClient.get(`/candidate/result/${attemptId}`);
