import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.17.1.80:3333',
});

export default api;
