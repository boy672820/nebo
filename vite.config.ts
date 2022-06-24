import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
import tsconfigPaths from 'vite-tsconfig-paths';

export default () => {
  // Main enviroment & development mode
  require('dotenv').config({ path: './.env' });

  return defineConfig({
    build: {
      target: 'es2020',
    },
    server: {
      port: Number(process.env.PORT) || 3000,
      watch: {
        usePolling: true,
      },
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
        'argon2',
        'fastify-swagger',
      ],
    },
    plugins: [
      tsconfigPaths(),
      ...VitePluginNode({
        adapter: 'nest',
        appPath: './src/main.ts',
        exportName: 'viteNodeApp',
        tsCompiler: 'swc',
      }),
    ],
  });
};
