import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  withCredentials: true, // Garante que cookies (como o refresh token) são enviados
});

let isRefreshing = false;
let failedRequestsQueue = [];

const processQueue = (error, token = null) => {
  failedRequestsQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedRequestsQueue = [];
};

api.interceptors.response.use(
  (response) => {
    // Retorna a resposta diretamente se for bem-sucedida
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Condições para tentar atualizar o token:
    // 1. O erro é 401 ou 403.
    // 2. A requisição ainda não foi tentada novamente.
    // 3. A URL da requisição não é o próprio endpoint de refresh.
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry &&
      !originalRequest.url.endsWith('/refresh')
    ) {
      if (isRefreshing) {
        // Se já houver uma atualização em andamento, enfileira a requisição
        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            resolve: (token) => {
              originalRequest.headers['Authorization'] = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            reject: (err) => {
              reject(err);
            },
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        console.log('Tentando atualizar o token...');
        // **CORREÇÃO AQUI**: A chamada para /refresh deve usar withCredentials: true (padrão da instância)
        // para enviar o cookie do refresh token.
        const { data } = await api.post('/refresh'); 
        const newAccessToken = data.accessToken;
        
        console.log('Token atualizado com sucesso.');

        // Atualiza o header padrão para futuras requisições
        api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        
        // Processa a fila de requisições que falharam com o novo token
        processQueue(null, newAccessToken);

        // Atualiza o header da requisição original que falhou
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        
        // Tenta novamente a requisição original
        return api(originalRequest);

      } catch (refreshError) {
        console.error('Falha ao atualizar o token. Redirecionando para login.', refreshError);
        
        processQueue(refreshError, null);
        
        // Previne loop de redirecionamento se já estiver na página de login
        if (window.location.pathname !== '/login') {
          window.location.href = '/login'; 
        }
        
        return Promise.reject(refreshError);

      } finally {
        isRefreshing = false;
      }
    }

    // Para todos os outros erros, rejeita a promessa
    return Promise.reject(error);
  }
);

export default api;
