import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'AI Monetisation',
      description: 'Shared workspace for AI Monetisation (Credit Management).',
      social: {
        github: 'https://github.com/xero-internal-actions-poc/design-internal/tree/main/apps/ai-monetization',
      },
      sidebar: [
        {
          label: 'Status',
          items: [
            { label: 'Project status', slug: 'status/project-status' },
            { label: 'Inventory & next steps', slug: 'status/inventory' },
          ],
        },
        {
          label: 'Meeting notes',
          autogenerate: { directory: 'meeting-notes' },
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'reference' },
        },
      ],
    }),
  ],
});
