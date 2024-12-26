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

export const getCrowdfunds = async () => {
  return await api.get('/crowdfunds');
};

export const getAllCrowdfunds = async () => {
  return await api.get('/admin/crowdfund');
};

export const getCrowdfundById = async (id) => {
  return await api.get(`/admin/crowdfund/${id}`); 
};


export const createCrowdfund = async (data) => {
  return await api.post('/admin/crowdfund', data);
};

export const updateCrowdfund = async (id, data) => {
  return await api.put(`/admin/crowdfund/${id}`, data);
};

export const deleteCrowdfund = async (id) => {
  return await api.delete(`/admin/crowdfund/${id}`);
};

export const deleteComment = async (commentId) => {
  return await api.delete(`/admin/comment/${commentId}`);
};
