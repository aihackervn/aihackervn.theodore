module.exports = {
  siteMetadata: {
    title: `Theodore's Blog`,
    author: {
      name: `Vo Nguyen An Tin`,
      summary: `AI Engineer-Destroy Deep Learning`,
    },
    description: `Personal Blog.`,
    siteUrl: `https://github.com/aihackervn`,
    social: {
      github: {
        link: `https://github.com/aihackervn`,
      },
      kaggle: {
        link: `https://www.kaggle.com/myncoder0908`,
      },
      linkedin: {
        link: `https://www.linkedin.com/in/t%C3%ADn-v%C3%B5-b2a055231/`,
      },
    },
  },
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    `gatsby-remark-images`,
    `gatsby-transformer-json`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `black`,
        showSpinner: true,
      },
    },
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        main: `${__dirname}/src`,
        style: `${__dirname}/src/style`,
        showcase: `${__dirname}/src/content/showcase`,
        components: `${__dirname}/src/components`,
        templates: `${__dirname}/src/templates`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/content/blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `showcase`,
        path: `${__dirname}/src/content/showcase`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`],
        remarkPlugins: [require("remark-math")],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              icon: false,
            },
          },
          `gatsby-remark-copy-linked-files`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: ["G-L2769CGXGX"],
      },
    },
    {
      resolve: `gatsby-plugin-disqus`,
      options: {
        shortname: `theodore`,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx, allShowcaseJson } }) => {
              const contents = [
                ...allMdx.edges.map((edge) => {
                  return {
                    title: edge.node.frontmatter.title,
                    date: edge.node.frontmatter.date,
                    description: edge.node.excerpt,
                    url: site.siteMetadata.siteUrl + `/blog${edge.node.fields.slug}`,
                    guid: site.siteMetadata.siteUrl + `/blog${edge.node.fields.slug}`,
                  };
                }),
                ...allShowcaseJson.edges.map((edge) => {
                  return {
                    title: edge.node.title,
                    date: edge.node.date,
                    description: edge.node.description,
                    url: site.siteMetadata.siteUrl + `/showcase/${edge.node.slug}`,
                    guid: site.siteMetadata.siteUrl + `/showcase/${edge.node.slug}`,
                  };
                }),
              ];

              return contents.sort((a, b) =>
                Date.parse(a.date) < Date.parse(b.date)
                  ? 1
                  : Date.parse(b.date) < Date.parse(a.date)
                  ? -1
                  : 0
              );
            },
            query: `
              {
                allMdx(
                  sort: { order: DESC, fields: [frontmatter___date] },
                ) {
                  edges {
                    node {
                      excerpt
                      html
                      fields {
                        slug
                      }
                      frontmatter {
                        title
                        date
                      }
                    }
                  }
                }
                allShowcaseJson(sort: { fields: date, order: DESC }) {
                  edges {
                    node {
                      slug
                      description
                      date
                      tags
                      title
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Theodore's Blog Contents",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Theodore's Blog`,
        short_name: `Myn`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: `static`,
        reportFilename: `../build-report.html`,
      },
    },
  ],
};
