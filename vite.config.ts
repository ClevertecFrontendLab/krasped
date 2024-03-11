import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { antdDayjs } from 'antd-dayjs-vite-plugin';

export default defineConfig({
    plugins: [react(), antdDayjs()],
    server: {
        host: true,
        port: 3000,
    },
    resolve: {
        alias: {
            '@public': path.resolve(__dirname, 'public'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@assets': path.resolve(__dirname, 'src/assets'),
            '@config': path.resolve(__dirname, 'src/config'),
            '@constants': path.resolve(__dirname, 'src/constants'),
            '@hooks': path.resolve(__dirname, 'src/hooks'),
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@redux': path.resolve(__dirname, 'src/redux'),
            '@types': path.resolve(__dirname, 'src/types'),
            '@utils': path.resolve(__dirname, 'src/utils'),
        },
    },
});
