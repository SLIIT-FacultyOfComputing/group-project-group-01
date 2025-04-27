// src/api/batchApi.js
import api from './axiosInstance';

// Get all batches
export const getBatches = async () => {
  const response = await api.get('/seeds');
  return { data: response.data };
};

// Get batch by ID
export const getBatchById = async (id) => {
  const response = await api.get(`/seeds/${id}`);
  return { data: response.data };
};

// Create new batch
export const createBatch = async (batchData) => {
  const response = await api.post('/seeds', batchData);
  return { data: response.data };
};

// Update batch daily progress
export const updateBatchProgress = async (id, updateData) => {
  const response = await api.put(`/seeds/${id}/update`, updateData);
  return { data: response.data };
};

// Delete batch (if you have a DELETE endpoint)
export const deleteBatch = async (id) => {
  const response = await api.delete(`/seeds/${id}`);
  return { data: response.data };
};

export const getBatchesStats = async () => {
  const response = await api.get('/seeds/stats');
  return { data: response.data };
};

