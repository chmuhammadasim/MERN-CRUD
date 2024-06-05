import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const register = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/register`, user);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/login`, user);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getItems = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/items`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const addItem = async (item, token) => {
  try {
    const response = await axios.post(`${API_URL}/items`, item, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateItem = async (id, item, token) => {
  try {
    const response = await axios.put(`${API_URL}/items/${id}`, item, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteItem = async (id, token) => {
  const response = await axios.delete(`${API_URL}/items/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
