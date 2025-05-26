import axios from 'axios';

export const apiClient = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api/v1/',
  withCredentials: true,
});

apiClient.interceptors.response.use(
  response => response,
  async error => {
    console.log('error response', error);
    const originalRequest = error.config;

    if (
      originalRequest &&
      error.response &&
      error.response.data &&
      error.response.data.code === 401 &&
      error.response.data.message === 'ACCESS_TOKEN_EXPIRED' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}auth/refresh-token`,
          {},
          {
            withCredentials: true,
          },
        );
        return apiClient(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
