import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    // You can add any request interceptors here if needed
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => {
    // You can add any response interceptors here if needed
    return response;
  },
  (error) => {
    // Handle response errors
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, e.g., redirect to login
      console.error('ACESSO NÃO AUTORIZADO:', error);
    }
    if (error.response && error.response.status === 403) {
      // Handle forbidden access
      console.error('ACESSO PROIBIDO:', error);
      api.post('/refresh')
        .then((response) => {
          console.log('Token refreshed successfully:', response.data);
          const originalRequest = error.config;
          originalRequest.headers['Authorization'] = `Bearer ${response.data.token}`;
          return api(originalRequest);
        })
        .catch((refreshError) => {
          // Handle token refresh error
          console.error('Erro ao atualizar o token:', refreshError);
        });
    }
    return Promise.reject(error);
  }
);

export default api;
