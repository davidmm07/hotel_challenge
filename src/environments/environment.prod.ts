// `.env.ts` is generated by the `npm run env` command
import env from './.env';

export const environment = {
  production: true,
  version: env.npm_package_version,
  serverUrl: 'https://api.chucknorris.io',
  entorno: 'PROD',
  defaultLanguage: 'en-US',
  supportedLanguages: ['en-US', 'fr-FR']
};
