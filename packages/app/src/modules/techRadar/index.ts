import {
  TechRadarApi,
  techRadarApiRef,
} from '@backstage-community/plugin-tech-radar';
import { TechRadarLoaderResponse } from '@backstage-community/plugin-tech-radar-common';
import {
  ApiBlueprint,
  createFrontendModule,
} from '@backstage/frontend-plugin-api';
import { techRadarData } from '../../lib/techRadarData';

class DemoTechRadarClient implements TechRadarApi {
  async load(): Promise<TechRadarLoaderResponse> {
    return {
      quadrants: techRadarData.quadrants,
      rings: techRadarData.rings,
      entries: techRadarData.entries.map(entry => ({
        ...entry,
        timeline: entry.timeline.map(item => ({
          ...item,
          date: new Date(item.date),
        })),
      })),
    };
  }
}

/** Overrides the default Tech Radar API with demo quadrant/ring data. */
export const techRadarModule = createFrontendModule({
  pluginId: 'tech-radar',
  extensions: [
    ApiBlueprint.make({
      name: 'demo-data',
      params: defineParams =>
        defineParams({
          api: techRadarApiRef,
          deps: {},
          factory: () => new DemoTechRadarClient(),
        }),
    }),
  ],
});
