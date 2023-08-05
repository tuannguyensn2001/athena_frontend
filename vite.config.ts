import react from '@vitejs/plugin-react';
import * as path from 'path';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

export default ({ mode }: never) => {
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
            css: true,
            setupFiles: './src/test/setup.ts',
        },
        // server: {
        //     port: 6000,
        // },
    });
};
