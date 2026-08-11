#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const TEMPLATES = {
  'iphone-app': {
    title: 'iPhone App',
    path: 'templates/iphone-app',
    summary:
      'Scaffolds a SwiftUI iPhone app to a local folder under scaffolded/ (no GitHub required).',
    steps: [
      'Open Backstage and go to Create in the sidebar.',
      'Choose the "iPhone App" template.',
      'Enter App Name (letters/numbers, e.g. DemoNotes), Bundle Identifier (e.g. com.example.DemoNotes), description, and owner (guests).',
      'Run the template. Files are written to scaffolded/<AppName>/.',
      'The new app is registered in the Software Catalog under system laptop-apps.',
      'Open scaffolded/<AppName>/App in Xcode (or copy Swift sources into a new iOS App project) and run on the Simulator.',
    ],
    parameters: [
      'name — Swift-friendly app/folder name',
      'description — shown in the Catalog',
      'bundleId — iOS bundle identifier',
      'owner — Catalog owner (Group), default guests',
    ],
    tips: [
      'No GitHub token is needed; publish uses the local publish:filesystem action.',
      'Generated projects are gitignored under scaffolded/.',
      'Use Create → Templates and search for "iPhone" if you do not see it immediately.',
    ],
  },
  'example-nodejs-template': {
    title: 'Example Node.js Template',
    path: 'examples/template',
    summary:
      'Stock Backstage example that scaffolds a simple Node.js service and publishes to GitHub.',
    steps: [
      'Open Create and choose "Example Node.js Template".',
      'Enter a unique component name.',
      'Choose a GitHub repository location via the Repo URL picker (github.com).',
      'Run the template. It fetches the skeleton, publishes to GitHub, registers the component, and sends a notification.',
      'Open the repository link or Catalog entity from the template output.',
    ],
    parameters: [
      'name — unique component name',
      'repoUrl — GitHub repository location (requires GitHub integration/token)',
    ],
    tips: [
      'Requires a configured GitHub token in app-config (integrations.github) for publish:github.',
      'For local demos without GitHub, prefer the iPhone App template instead.',
      'Skeleton content lives under examples/template/content/.',
    ],
  },
};

function formatGuide(id) {
  const t = TEMPLATES[id];
  if (!t) {
    return `Unknown template "${id}". Available: ${Object.keys(TEMPLATES).join(', ')}`;
  }
  return [
    `# ${t.title} (${id})`,
    '',
    t.summary,
    '',
    `Location: ${t.path}`,
    '',
    '## How to use',
    ...t.steps.map((s, i) => `${i + 1}. ${s}`),
    '',
    '## Parameters',
    ...t.parameters.map(p => `- ${p}`),
    '',
    '## Tips',
    ...t.tips.map(tip => `- ${tip}`),
  ].join('\n');
}

const server = new McpServer({
  name: 'template-help',
  version: '1.0.0',
});

server.tool(
  'list_example_templates',
  'List example Software Templates available in this Backstage demo and a one-line summary of each.',
  {},
  async () => {
    const lines = Object.entries(TEMPLATES).map(
      ([id, t]) => `- ${id}: ${t.title} — ${t.summary}`,
    );
    return {
      content: [
        {
          type: 'text',
          text: ['Example templates in this portal:', ...lines].join('\n'),
        },
      ],
    };
  },
);

server.tool(
  'get_template_usage_guide',
  'Get step-by-step instructions for using a specific example Software Template.',
  {
    templateId: z
      .string()
      .describe(
        'Template id, e.g. iphone-app or example-nodejs-template',
      ),
  },
  async ({ templateId }) => {
    const id = String(templateId || '')
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-');
    const normalized =
      id.includes('iphone') || id.includes('ios') || id.includes('swift')
        ? 'iphone-app'
        : id.includes('node') || id.includes('example')
          ? 'example-nodejs-template'
          : id;
    return {
      content: [{ type: 'text', text: formatGuide(normalized) }],
    };
  },
);

server.tool(
  'compare_example_templates',
  'Explain when to use the iPhone App template vs the Example Node.js template.',
  {},
  async () => ({
    content: [
      {
        type: 'text',
        text: [
          '# Which template should I use?',
          '',
          '- Use **iPhone App** for local interview demos: no GitHub token, writes to scaffolded/, registers in Catalog.',
          '- Use **Example Node.js Template** to show full GitHub publish + catalog register (needs GITHUB_TOKEN / integrations.github).',
          '',
          'Both appear under Create → Templates.',
        ].join('\n'),
      },
    ],
  }),
);

const transport = new StdioServerTransport();
await server.connect(transport);
