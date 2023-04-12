/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePluginNode } from 'vite-plugin-node';

export default defineConfig({
  test: {
    environment: 'node',
  },

  plugins: [
    tsconfigPaths(),
    ...VitePluginNode({
      tsCompiler: 'swc',
      appPath: './src/index.ts',
      adapter: 'nest',
    }),
  ],
  root: 'src',
});
