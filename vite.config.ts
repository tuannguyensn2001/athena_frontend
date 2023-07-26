import { loadEnv } from 'vite';
import * as path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default ({ mode }: any) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
    return defineConfig({
        plugins: [react()],
        resolve: {
            alias: {
                '~': path.resolve(__dirname, 'src'),
            },
        },
        test: {
            environment: 'jsdom',
            globals: true,
        },
        // server: {
        //     port: 6000,
        // },
    });
};
