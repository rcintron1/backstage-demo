import { resolve as resolvePath, isAbsolute, relative, dirname } from 'node:path';
import { pathToFileURL } from 'node:url';
import fs from 'fs-extra';
import { stringifyEntityRef, Entity } from '@backstage/catalog-model';
import { InputError } from '@backstage/errors';
import { CatalogService } from '@backstage/plugin-catalog-node';
import { createTemplateAction } from '@backstage/plugin-scaffolder-node';

function findAppRoot(startDir: string): string {
  let dir = startDir;
  for (let i = 0; i < 10; i++) {
    if (fs.existsSync(resolvePath(dir, 'app-config.yaml'))) {
      return dir;
    }
    const parent = dirname(dir);
    if (parent === dir) {
      break;
    }
    dir = parent;
  }
  throw new InputError(
    'Could not locate Backstage app root (app-config.yaml) for filesystem publish',
  );
}

export function createPublishFilesystemAction(options: {
  catalog: CatalogService;
}) {
  const { catalog } = options;

  return createTemplateAction({
    id: 'publish:filesystem',
    description:
      'Copies the workspace to a local folder under scaffolded/ and registers catalog-info.yaml',
    schema: {
      input: {
        path: z =>
          z
            .string({
              description:
                'Destination folder name or relative path under scaffolded/',
            })
            .min(1),
        catalogInfoPath: z =>
          z
            .string({
              description:
                'Relative path to catalog-info.yaml inside the published project',
            })
            .optional()
            .default('catalog-info.yaml'),
      },
      output: {
        remoteUrl: z =>
          z.string({ description: 'Absolute path to the published project' }),
        catalogInfoUrl: z =>
          z.string({ description: 'file:// URL to catalog-info.yaml' }),
        entityRef: z =>
          z
            .string({ description: 'Entity ref of the registered component' })
            .optional(),
      },
    },
    async handler(ctx) {
      const appRoot = findAppRoot(__dirname);
      const scaffoldedRoot = resolvePath(appRoot, 'scaffolded');

      const relativeTarget = ctx.input.path.replace(/^[/\\]+/, '');
      if (
        relativeTarget.includes('..') ||
        isAbsolute(ctx.input.path) ||
        relativeTarget.length === 0
      ) {
        throw new InputError(
          'path must be a non-empty relative path without ".." segments',
        );
      }

      const destination = resolvePath(scaffoldedRoot, relativeTarget);
      const relativeToScaffolded = relative(scaffoldedRoot, destination);
      if (
        relativeToScaffolded.startsWith('..') ||
        isAbsolute(relativeToScaffolded)
      ) {
        throw new InputError(
          'path must resolve under the scaffolded/ directory',
        );
      }

      await fs.ensureDir(scaffoldedRoot);
      await fs.remove(destination);
      await fs.copy(ctx.workspacePath, destination);

      const catalogInfoAbs = resolvePath(
        destination,
        ctx.input.catalogInfoPath ?? 'catalog-info.yaml',
      );
      if (!(await fs.pathExists(catalogInfoAbs))) {
        throw new InputError(
          `catalog-info.yaml not found at ${catalogInfoAbs}`,
        );
      }

      const catalogInfoUrl = pathToFileURL(catalogInfoAbs).href;
      ctx.logger.info(`Published project to ${destination}`);

      const credentials = await ctx.getInitiatorCredentials();
      await catalog.addLocation(
        {
          type: 'file',
          target: catalogInfoAbs,
        },
        { credentials },
      );

      const dryRun = await catalog.addLocation(
        {
          dryRun: true,
          type: 'file',
          target: catalogInfoAbs,
        },
        { credentials },
      );

      const entities = dryRun.entities as Entity[];
      const entity =
        entities.find(
          e =>
            !e.metadata.name.startsWith('generated-') && e.kind === 'Component',
        ) ??
        entities.find(e => !e.metadata.name.startsWith('generated-')) ??
        entities[0];

      ctx.output('remoteUrl', destination);
      ctx.output('catalogInfoUrl', catalogInfoUrl);
      if (entity) {
        ctx.output('entityRef', stringifyEntityRef(entity));
      }
    },
  });
}
