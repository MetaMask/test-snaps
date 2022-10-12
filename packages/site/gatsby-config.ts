import { GatsbyConfig } from 'gatsby';
import packageJson from './package.json';

const config: GatsbyConfig = {
  // Required to use React 17+'s JSX transform, to avoid having to import React
  // in every file.
  jsxRuntime: 'automatic',

  siteMetadata: {
    title: 'Test Snaps',
    version: packageJson.version,
  },

  plugins: [
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Test Snaps',
        icon: 'src/assets/icon.svg',
      },
    },
    {
      resolve: 'gatsby-plugin-react-redux',
      options: {
        pathToCreateStoreModule: './src/store.ts',
      },
    },
  ],
};

export default config;
