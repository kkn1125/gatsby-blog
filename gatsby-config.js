module.exports = {
  siteMetadata: {
    title: `blog`,
    siteUrl: `https://kkn1125.github.io/gatsby-blog/`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        pathToEmotionCacheProps: `src/emotion-cache-props`,
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    // {
    //   resolve: `gatsby-plugin-typegen`,
    //   options: {
    //     outputPath: `src/__generated__/gatsby-types.d.ts`,
    //     emitSchema: {
    //       'src/__generated__/gatsby-schema.graphql': true,
    //     },
    //   },
    // },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "UA-179074259-1",
      },
    },
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `blog`,
        path: `${__dirname}/src/blog`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // Footnotes mode (default: true)
        footnotes: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [],
      },
    },
  ],
};
