// frontend/src/api/axiosConfig.ts
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

// Automatically attach the token to every request if it exists
API.interceptors.request.use((req) => {
  const user = localStorage.getItem('user');
  if (user) {
    const parsedUser = JSON.parse(user);
    if (parsedUser.token) {
      req.headers.Authorization = `Bearer ${parsedUser.token}`;
    }
  }
  return req;
});

export default API;