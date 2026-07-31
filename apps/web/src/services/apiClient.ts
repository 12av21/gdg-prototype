import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token to every request automatically
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('scip_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 Unauthorized — clear token and redirect to login
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('scip_token');
      localStorage.removeItem('scip_user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
