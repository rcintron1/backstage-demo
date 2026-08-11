import { createApp } from '@backstage/frontend-defaults';
import mcpChatPlugin from '@backstage-community/plugin-mcp-chat/alpha';
import techRadarPlugin from '@backstage-community/plugin-tech-radar/alpha';
import catalogPlugin from '@backstage/plugin-catalog/alpha';
import snykPlugin from 'backstage-plugin-snyk/alpha';
import { navModule } from './modules/nav';
import { techRadarModule } from './modules/techRadar';

export default createApp({
  features: [
    catalogPlugin,
    navModule,
    mcpChatPlugin,
    snykPlugin,
    techRadarPlugin.withOverrides({
      extensions: [
        techRadarPlugin.getExtension('api:tech-radar').override({
          disabled: true,
        }),
      ],
    }),
    techRadarModule,
  ],
});
