import axios from 'axios';
import { message } from 'antd';
import { getRefreshTokenCookie, getTokenCookie, setRefreshTokenCookie, setTokenCookie } from './cookie';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL + '/api/v1',
  timeout: 10000
});

instance.interceptors.request.use(async function (config) {
  const token = await getTokenCookie();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token.value}`;
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});

let isRefreshing = false;
type FailedQueueItem = {
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
};
let failedQueue: FailedQueueItem[] = [];

const processQueue = (error: unknown, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

instance.interceptors.response.use(function (response) {
  if (response.data.msg) {
    message.success(response.data.msg)
  }
  return response.data;
}, async function (error) {
  const originalRequest = error.config;

  if (error && error.response) {
    switch (error.response.status) {
      case 401:
        // Check if we already tried to refresh for this request
        if (originalRequest._retry) {
          // Refresh failed, redirect to login
          window && (location.href = '/user/login');
          return Promise.reject(error);
        }

        // If already refreshing, queue this request
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(token => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return instance(originalRequest);
          }).catch(err => {
            return Promise.reject(err);
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const token = await getRefreshTokenCookie();
          if (token) {
            // Call refresh token API
            const refreshResponse = await instance.post('/User/refresh-token', {
              refreshToken: token.value
            });

            if (refreshResponse.data && refreshResponse.data.accessToken) {
              const newAccessToken = refreshResponse.data.accessToken;
              const newRefreshToken = refreshResponse.data.refreshToken;

              // Update token in storage/cookie
              await setTokenCookie(newAccessToken);
              await setRefreshTokenCookie(newRefreshToken)

              // Update default authorization header
              instance.defaults.headers.common['Authorization'] = 'Bearer ' + newAccessToken;

              // Update the failed request's header
              originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;

              // Process queued requests
              processQueue(null, newAccessToken);

              // Retry the original request
              return instance(originalRequest);
            } else {
              throw new Error('Invalid refresh response');
            }
          } else {
            throw new Error('No refresh token available');
          }
        } catch (refreshError) {
          // Refresh failed, process queue with error and redirect
          processQueue(refreshError, null);
          window && (location.href = '/user/login');
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      case 500:
        message.error(error.response.data.msg)

    }
  }
  return Promise.reject(error);
});

export default instance
