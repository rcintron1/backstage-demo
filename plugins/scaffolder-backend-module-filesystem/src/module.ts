import { createBackendModule } from '@backstage/backend-plugin-api';
import { catalogServiceRef } from '@backstage/plugin-catalog-node';
import { scaffolderActionsExtensionPoint } from '@backstage/plugin-scaffolder-node';
import { createPublishFilesystemAction } from './actions/publishFilesystem';

export const scaffolderModuleFilesystem = createBackendModule({
  pluginId: 'scaffolder',
  moduleId: 'filesystem',
  register(env) {
    env.registerInit({
      deps: {
        scaffolder: scaffolderActionsExtensionPoint,
        catalog: catalogServiceRef,
      },
      async init({ scaffolder, catalog }) {
        scaffolder.addActions(createPublishFilesystemAction({ catalog }));
      },
    });
  },
});
