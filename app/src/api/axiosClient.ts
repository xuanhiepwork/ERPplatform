import axios, { AxiosError } from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1',
  headers: { 'Content-Type': 'application/json' }
});

// Tự động đính kèm JWT Token vào mỗi Request
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Centralized response/error parsing so callers can rely on `error.message`
axiosClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // If server responded with a status/code
    if (error.response) {
      const { status, data } = error.response as any;
      let message = 'Request failed';

      if (data) {
        if (typeof data === 'string') message = data;
        else if (data.message) message = data.message;
        else if (data.error && data.error.message) message = data.error.message;
        else if (data.errors) {
          try {
            const msgs = Object.values(data.errors).flat().map((v: any) => (Array.isArray(v) ? v.join(', ') : v));
            message = msgs.join('; ');
          } catch (e) {
            // ignore parsing error
          }
        } else {
          try {
            message = JSON.stringify(data);
          } catch (e) {
            // fallback to default
          }
        }
      }

      const enhanced: any = new Error(message);
      enhanced.response = error.response;
      enhanced.status = status;

      // On 401, clear stored session to avoid stale auth state
      if (status === 401) {
        try {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.dispatchEvent(new Event('auth-unauthorized'));
        } catch (e) {
          // ignore
        }
      }

      return Promise.reject(enhanced);
    }

    // No response received (network error)
    if (error.request) {
      const enhanced: any = new Error('Network error: unable to reach server.');
      enhanced.request = error.request;
      return Promise.reject(enhanced);
    }

    // Something else happened
    return Promise.reject(error);
  }
);

export default axiosClient;