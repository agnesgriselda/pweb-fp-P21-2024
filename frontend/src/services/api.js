import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

export const submitFeedback = async (data) => {
  return await api.post('/feedback', data);
};

export const loginUser = async (data) => {
  return await api.post('/auth/login', data);
};
