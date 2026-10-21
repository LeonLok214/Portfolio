import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',
    port: 5173,
    watch: {
      ignored: [
        '**/.git/**',
        '**/node_modules/**',
        '**/.pnpm-store/**',
        '**/.pnpm-cache/**',
        '**/.tmp/**',
        '**/_shots/**',
        '**/_shots_redesign/**',
        '**/_shots_media/**',
        '**/_shots_v8/**',
        '**/_shots_v9/**',
        '**/_shots_v10/**',
        '**/_shots_silk/**',
        '**/_shots_v11/**',
        '**/_shots_motion/**',
        '**/_shots_blue/**',
        '**/_incoming/**',
        '**/_incoming_english/**',
        '**/_review/**',
        '**/_review_ach/**',
        '**/_review_frames/**',
        '**/.tmpbuild/**',
        '**/_tools/**',
        '**/.browser-profile/**',
        '**/*.tmpdir',
        '**/*.tmpdir/**',
        '**/.*.tmpdir',
        '**/.*.tmpdir/**',
      ],
    },
  },
  optimizeDeps: {
    entries: ['index.html'],
  },
});
