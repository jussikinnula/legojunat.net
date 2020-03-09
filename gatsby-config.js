require('source-map-support').install();
require('ts-node').register();

const { PRISMIC_REPOSITORY_NAME, PRISMIC_DEFAULT_LANG, PRISMIC_ACCESS_TOKEN, PRISMIC_REF } = process.env;

if (!PRISMIC_REPOSITORY_NAME) {
  console.error('Error! PRISMIC_REPOSITORY_NAME environment variable is undefined');
  process.exit();
}

if (!PRISMIC_ACCESS_TOKEN) {
  console.error('Error! PRISMIC_ACCESS_TOKEN environment variable is undefined');
  process.exit();
}

module.exports = {
  siteMetadata: {
    title: 'Legojunat.net',
    description: '',
    url: 'https://www.legojunat.net',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-typescript',
    'gatsby-plugin-typescript-checker',
    {
      resolve:'gatsby-plugin-tslint',
      options: {
        stages: ['develop']
      }
    },
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-prismic-graphql',
      options: {
        repositoryName: PRISMIC_REPOSITORY_NAME,
        defaultLang: PRISMIC_DEFAULT_LANG || 'fi',
        accessToken: PRISMIC_ACCESS_TOKEN,
        path: '/preview',
        previews: false
      }
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/
        }
      }
    }
  ]
};
