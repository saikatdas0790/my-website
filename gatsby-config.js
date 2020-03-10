module.exports = {
  siteMetadata: {
    title: `Saikat's Website`,
    description: `This is my corner on the interwebs where I write about my exploits. It will feature things I'm learning about and projects I've built`,
    author: `Saikat Das`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: `${__dirname}/src/posts`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Saikat's Website`,
        short_name: `saikat`,
        start_url: `/`,
        background_color: `#5DD9C1`,
        theme_color: `#5DD9C1`,
        display: `minimal-ui`,
        icon: `src/images/icon.svg`, // This path is relative to the root of the site.
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout`),
      },
    },
    {
      resolve: `gatsby-alias-imports`,
      options: {
        aliases: {
          components: `src/components`,
        },
      },
    },
    "gatsby-plugin-theme-ui",
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [".mdx", ".md"],
      },
    },
  ],
};
