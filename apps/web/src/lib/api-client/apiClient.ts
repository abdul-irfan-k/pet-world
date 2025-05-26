import axios from 'axios';

export const apiClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api/v1/',
  withCredentials: true,
});

apiClient.interceptors.response.use(
  response => response,
  async error => {
    if (
      error.response.statusCode === 401 &&
      error.response.data.message === 'ACCESS_TOKEN_EXPIRED'
    ) {
      try {
        const originalRequest = error.config;
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh-token`,
          {},
          {
            withCredentials: true,
          },
        );
        return apiClient(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
  },
);
