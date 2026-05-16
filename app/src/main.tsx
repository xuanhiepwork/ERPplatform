/// <reference types="vite/client" />
import React from 'react';
// @ts-ignore
import ReactDOM from 'react-dom/client'; // Đã sửa: Thêm lệnh bỏ qua check type ở dòng này
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './app/App';
import '../default_shadcn_theme.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);