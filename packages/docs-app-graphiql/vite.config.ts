import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import $monacoEditorPlugin from 'vite-plugin-monaco-editor';

// @ts-expect-error Expect error
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const monacoEditorPlugin = $monacoEditorPlugin.default ?? $monacoEditorPlugin;

export default defineConfig({
  build: {
    outDir: 'build',
  },
  // Make all URLs relative
  base: "",
  plugins: [
    react(),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    monacoEditorPlugin({
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
