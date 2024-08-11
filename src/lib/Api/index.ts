import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Substitua pela URL da sua API
});

export default api;