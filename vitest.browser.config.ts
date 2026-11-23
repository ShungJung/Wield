import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    projects: [
      {
        test: {
          include: ['tests/browser/**/*.{test,spec}.ts', 'tests/**/*.browser.{test,spec}.ts'],
          name: 'browser',
          browser: {
            enabled: true,
            provider: playwright(),
            // https://vitest.dev/config/browser/playwright
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
});
