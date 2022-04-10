import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
import tsconfigPaths from 'vite-tsconfig-paths';

export default () => {
  // Main enviroment & development mode
  require('dotenv').config({ path: './.env' });
  require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` });

  return defineConfig({
    server: {
      port: process.env.PORT || 3000,
    },
    build: {
      target: 'es2020',
    },
    optimizeDeps: {
      // Vite does not work well with optionnal dependencies, mark them as ignored for now
      exclude: [
        '@nestjs/platform-socket.io',
        '@nestjs/websockets',
        '@nestjs/microservices',
        'amqp-connection-manager',
        'amqplib',
        'nats',
        '@grpc/proto-loader',
        '@grpc/grpc-js',
        'redis',
        'kafkajs',
        'mqtt',
        'cache-manager',
        'class-transformer',
        'class-validator',
      ],
    },
    plugins: [
      tsconfigPaths(),
      ...VitePluginNode({
        adapter: 'nest',
        appPath: './src/main.ts',
        tsCompiler: 'swc',
      }),
    ],
  });
};
