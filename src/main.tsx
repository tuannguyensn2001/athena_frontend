import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import App from './App';
import './styles/global.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={new QueryClient()}>
            <ReactQueryDevtools />
            <App />
        </QueryClientProvider>
    </React.StrictMode>,
);
