import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

import monacoEditorPlugin from 'vite-plugin-monaco-editor';

const monacoPlugin = (monacoEditorPlugin.default || monacoEditorPlugin);

export default defineConfig({
  build: {
    outDir: 'build',
  },
  // Make all URLs relative
  base: "",
  plugins: [
    react(),
    monacoPlugin({
      languageWorkers: ['editorWorkerService', 'json'],
      customWorkers: [
        {
          label: 'graphql',
          entry: 'monaco-graphql/esm/graphql.worker.js',
        },
      ],
    }),
  ],
});
