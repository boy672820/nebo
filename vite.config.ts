import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(() => {
  return {
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
  };
});

// import { defineConfig } from 'vite';
// import { VitePluginNode } from 'vite-plugin-node';
// // import tsconfigPaths from 'vite-tsconfig-paths';
// import { resolve } from 'path';

// export default defineConfig({
//   plugins: [
//     // tsconfigPaths(),
//     ...VitePluginNode({
//       adapter: 'nest',
//       appPath: './src/main.ts',
//       tsCompiler: 'swc',
//     }),
//   ],
//   resolve: {
//     alias: {
//       '@app/*': resolve(__dirname, 'src/*'),
//       '@core/*': resolve(__dirname, 'core/src/*'),
//       '@libs/*': resolve(__dirname, 'core/src/libs/*'),
//       '@utils/*': resolve(__dirname, 'core/src/utils/*'),
//       '@providers/*': resolve(__dirname, 'core/src/providers/*'),
//       '@config/*': resolve(__dirname, 'config/*'),
//     },
//   },
// });
