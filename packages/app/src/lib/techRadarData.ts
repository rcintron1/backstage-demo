/**
 * Classic ThoughtWorks/Zalando radar layout:
 * rings inside→out: Adopt → Trial → Assess → Hold
 * quadrants clockwise from bottom-right
 */
export const techRadarData = {
  quadrants: [
    { id: 'languages-frameworks', name: 'Languages & Frameworks' },
    { id: 'data-stores', name: 'Data Stores' },
    { id: 'infrastructure', name: 'Infrastructure' },
    { id: 'messaging-compute', name: 'Messaging & Compute' },
  ],
  rings: [
    {
      id: 'adopt',
      name: 'ADOPT',
      color: '#5BA300',
      description: 'Technologies we use by default for new work.',
    },
    {
      id: 'trial',
      name: 'TRIAL',
      color: '#009EB0',
      description: 'Worth pursuing in a project that can handle risk.',
    },
    {
      id: 'assess',
      name: 'ASSESS',
      color: '#C7BA00',
      description: 'Explore to understand how it may affect us.',
    },
    {
      id: 'hold',
      name: 'HOLD',
      color: '#E09B96',
      description: 'Proceed with caution; prefer alternatives.',
    },
  ],
  entries: [
    // Languages & Frameworks
    {
      id: 'typescript',
      key: 'typescript',
      title: 'TypeScript',
      quadrant: 'languages-frameworks',
      description: 'Default language for web and Backstage work.',
      timeline: [
        {
          moved: 0,
          ringId: 'adopt',
          date: '2024-01-15',
          description: 'Standard for app and API TypeScript codebases.',
        },
      ],
      links: [{ url: 'https://www.typescriptlang.org/', title: 'Learn more' }],
    },
    {
      id: 'react',
      key: 'react',
      title: 'React',
      quadrant: 'languages-frameworks',
      description: 'Primary UI framework for web products.',
      timeline: [
        {
          moved: 0,
          ringId: 'adopt',
          date: '2024-01-15',
          description: 'Used across portfolio sites and demo apps.',
        },
      ],
      links: [{ url: 'https://react.dev/', title: 'Learn more' }],
    },
    {
      id: 'python',
      key: 'python',
      title: 'Python',
      quadrant: 'languages-frameworks',
      description: 'Preferred for trading scripts, ML, and automation.',
      timeline: [
        {
          moved: 0,
          ringId: 'adopt',
          date: '2024-03-01',
          description: 'Core language for tradingapp and AI experiments.',
        },
      ],
    },
    {
      id: 'swiftui',
      key: 'swiftui',
      title: 'SwiftUI',
      quadrant: 'languages-frameworks',
      description: 'iOS UI toolkit for new iPhone app scaffolds.',
      timeline: [
        {
          moved: 1,
          ringId: 'trial',
          date: '2026-08-01',
          description: 'Backstage iPhone template scaffolds SwiftUI apps.',
        },
      ],
    },
    {
      id: 'express',
      key: 'express',
      title: 'Express',
      quadrant: 'languages-frameworks',
      description: 'Lightweight Node HTTP framework.',
      timeline: [
        {
          moved: 0,
          ringId: 'adopt',
          date: '2024-06-01',
          description: 'Used in express-api-server and similar services.',
        },
      ],
    },
    {
      id: 'jquery',
      key: 'jquery',
      title: 'jQuery',
      quadrant: 'languages-frameworks',
      description: 'Legacy DOM utility — avoid for new UI work.',
      timeline: [
        {
          moved: -1,
          ringId: 'hold',
          date: '2023-01-01',
          description: 'Prefer React for new interfaces.',
        },
      ],
    },

    // Data Stores
    {
      id: 'postgresql',
      key: 'postgresql',
      title: 'PostgreSQL',
      quadrant: 'data-stores',
      description: 'Default relational database for services.',
      timeline: [
        {
          moved: 0,
          ringId: 'adopt',
          date: '2024-01-15',
          description: 'Running locally and used in production-shaped demos.',
        },
      ],
    },
    {
      id: 'sqlite',
      key: 'sqlite',
      title: 'SQLite',
      quadrant: 'data-stores',
      description: 'Convenient embedded DB for local Backstage demos.',
      timeline: [
        {
          moved: 0,
          ringId: 'trial',
          date: '2026-08-01',
          description: 'In-memory SQLite powers this Backstage demo.',
        },
      ],
    },
    {
      id: 'redis',
      key: 'redis',
      title: 'Redis',
      quadrant: 'data-stores',
      description: 'Caching and short-lived state.',
      timeline: [
        {
          moved: 0,
          ringId: 'assess',
          date: '2025-11-01',
          description: 'Evaluate for session/cache needs.',
        },
      ],
    },
    {
      id: 'mongodb',
      key: 'mongodb',
      title: 'MongoDB',
      quadrant: 'data-stores',
      description: 'Document store — only when document model fits.',
      timeline: [
        {
          moved: 0,
          ringId: 'hold',
          date: '2024-08-01',
          description: 'Prefer Postgres unless requirements demand documents.',
        },
      ],
    },

    // Infrastructure
    {
      id: 'backstage',
      key: 'backstage',
      title: 'Backstage',
      quadrant: 'infrastructure',
      description: 'Developer portal for catalog, templates, and tech radar.',
      timeline: [
        {
          moved: 1,
          ringId: 'trial',
          date: '2026-08-01',
          description: 'Local interview demo portal.',
        },
      ],
      links: [{ url: 'https://backstage.io/', title: 'Learn more' }],
    },
    {
      id: 'aws',
      key: 'aws',
      title: 'AWS',
      quadrant: 'infrastructure',
      description: 'Primary cloud for deployable workloads.',
      timeline: [
        {
          moved: 0,
          ringId: 'adopt',
          date: '2024-01-15',
          description: 'Used across certified-AI and infra projects.',
        },
      ],
    },
    {
      id: 'prometheus-grafana',
      key: 'prometheus-grafana',
      title: 'Prometheus + Grafana',
      quadrant: 'infrastructure',
      description: 'Metrics and dashboards for local GPU monitoring.',
      timeline: [
        {
          moved: 0,
          ringId: 'trial',
          date: '2025-06-01',
          description: 'mac-gpu-monitoring stack.',
        },
      ],
    },
    {
      id: 'docker',
      key: 'docker',
      title: 'Docker',
      quadrant: 'infrastructure',
      description: 'Container packaging — optional for this laptop demo.',
      timeline: [
        {
          moved: 0,
          ringId: 'assess',
          date: '2026-01-01',
          description: 'Useful when packaging multi-service stacks.',
        },
      ],
    },
    {
      id: 'heroku',
      key: 'heroku',
      title: 'Heroku',
      quadrant: 'infrastructure',
      description: 'PaaS for quick deploys — prefer AWS for new work.',
      timeline: [
        {
          moved: -1,
          ringId: 'hold',
          date: '2024-01-01',
          description: 'Keep existing apps; avoid new greenfield there.',
        },
      ],
    },

    // Messaging & Compute
    {
      id: 'nodejs',
      key: 'nodejs',
      title: 'Node.js',
      quadrant: 'messaging-compute',
      description: 'Default runtime for JS/TS services and Backstage.',
      timeline: [
        {
          moved: 0,
          ringId: 'adopt',
          date: '2024-01-15',
          description: 'Node 22 LTS for local portal and APIs.',
        },
      ],
    },
    {
      id: 'rest-apis',
      key: 'rest-apis',
      title: 'REST APIs',
      quadrant: 'messaging-compute',
      description: 'Default service integration style.',
      timeline: [
        {
          moved: 0,
          ringId: 'adopt',
          date: '2024-01-15',
          description: 'Primary interface between frontend and backends.',
        },
      ],
    },
    {
      id: 'ollama',
      key: 'ollama',
      title: 'Ollama',
      quadrant: 'messaging-compute',
      description: 'Local LLM runtime for experiments.',
      timeline: [
        {
          moved: 1,
          ringId: 'trial',
          date: '2025-09-01',
          description: 'Used with options-llm and RAG experiments.',
        },
      ],
    },
    {
      id: 'mcp',
      key: 'mcp',
      title: 'Model Context Protocol',
      quadrant: 'messaging-compute',
      description: 'Tooling protocol for agent/IDE integrations.',
      timeline: [
        {
          moved: 1,
          ringId: 'assess',
          date: '2026-06-01',
          description: 'Enabled in this Backstage demo via mcp-actions.',
        },
      ],
    },
    {
      id: 'soap',
      key: 'soap',
      title: 'SOAP',
      quadrant: 'messaging-compute',
      description: 'Legacy RPC style — avoid for new services.',
      timeline: [
        {
          moved: 0,
          ringId: 'hold',
          date: '2023-01-01',
          description: 'Prefer REST/JSON for new integrations.',
        },
      ],
    },
  ],
};
