import { env } from './.env';

export const environment = {
  production: true,
  hmr: false,
  version: env.npm_package_version,
  serverUrl: 'https://api.chucknorris.io',
  api: '',
  defaultLanguage: 'en-US',
  supportedLanguages: ['en-US', 'fr-FR']
};
