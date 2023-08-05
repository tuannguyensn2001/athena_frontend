import { ConfigProvider } from 'antd';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import App from './App';
import './styles/global.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={new QueryClient()}>
            <ReactQueryDevtools />
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#0f766e',
                    },
                }}
            >
                <App />
            </ConfigProvider>
        </QueryClientProvider>
    </React.StrictMode>,
);
