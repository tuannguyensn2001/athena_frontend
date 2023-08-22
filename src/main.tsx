import { ConfigProvider, theme } from 'antd';
import * as ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import App from './App';
import './styles/global.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <QueryClientProvider
        client={
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                    },
                },
            })
        }
    >
        <ReactQueryDevtools />
        <ConfigProvider
            theme={{
                token: {
                    // colorPrimary: '#0f766e',
                },
            }}
        >
            <App />
        </ConfigProvider>
    </QueryClientProvider>,
);
