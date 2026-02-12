import axios from 'axios';
import useAuthStore from '../store/useAuthStore';

import { ApiEndpoints } from '../types/endpoints';
import type { AuthResponseType, RefreshTokenRequestType } from '../types';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


axiosClient.interceptors.request.use(async (config) => {
  const { accessToken } = useAuthStore.getState();
  const { isTokenExpiringSoon } = useAuthStore.getState().actions;

  if (isTokenExpiringSoon() && !config.url?.includes('/auth/')) {
    try {
      await refreshAccessToken();
    } catch (error) {

      console.error('Pre-request token refresh failed:', error);
    }
  }
  if (accessToken && !config.url?.includes('/auth/login')) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
},
  (error) => Promise.reject(error)
)

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;


    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await refreshAccessToken();


        const { accessToken } = useAuthStore.getState();
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;


        return axiosClient(originalRequest);
      } catch (refreshError) {

        useAuthStore.getState().actions.logout();
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

async function refreshAccessToken(): Promise<string> {
  const { refreshToken, userInfo, actions } = useAuthStore.getState();

  console.log("Attempting to refresh access token...");
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const newData = await refreshAuthToken({
    refreshToken,
    userId: userInfo?.userId || ''
  });

  actions.setAuth({
    accessToken: newData.accessToken,
    idToken: newData.idToken,
    expiresAt: newData.expiresIn,
    isAuthenticated: true,
  });
  return newData.accessToken;
}

const refreshAuthToken = async (data: RefreshTokenRequestType) => {

  const response = await axiosClient.post<AuthResponseType>(ApiEndpoints.REFRESH_TOKEN, data);
  return response.data;
};

export default axiosClient;