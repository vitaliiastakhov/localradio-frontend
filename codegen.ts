import type { CodegenConfig } from '@graphql-codegen/cli';

const schema = process.env.NEXT_PUBLIC_STRAPI_API_URL_GRAPHQL;

const config: CodegenConfig = {
  schema: schema,
  documents: ['./src/**/*.graphql'],
  generates: {
    './src/shared/api/graphql/__generated__/schema.graphql.ts': {
      plugins: ['typescript'],
    },
    './src/shared/api/graphql/': {
      plugins: ['typescript-operations', 'typed-document-node'],
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.graphql.interface.ts',
        baseTypesPath: '/__generated__/schema.graphql.ts',
      },
    },
  },
};
export default config;
