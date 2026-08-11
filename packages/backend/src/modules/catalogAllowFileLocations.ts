import { createBackendModule } from '@backstage/backend-plugin-api';
import { catalogLocationsExtensionPoint } from '@backstage/plugin-catalog-node';

/**
 * Allow runtime registration of file:// catalog locations so local
 * Software Templates can publish:filesystem and register into the catalog.
 */
export default createBackendModule({
  pluginId: 'catalog',
  moduleId: 'allow-file-locations',
  register(env) {
    env.registerInit({
      deps: {
        locations: catalogLocationsExtensionPoint,
      },
      async init({ locations }) {
        locations.setAllowedLocationTypes(['url', 'file']);
      },
    });
  },
});
