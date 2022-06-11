const path = require(`path`);
// Log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Your Gatsby site has been built!`);
};
// Create blog pages dynamically
exports.createPages = async ({ graphql, actions, ...props }) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve(`src/components/template/BlogPost.js`);
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              title
              slug
            }
          }
        }
      }
    }
  `);
  result.data.allMarkdownRemark.edges.forEach((edge) => {
    createPage({
      path: `${edge.node.frontmatter.slug}`,
      component: blogPostTemplate,
      context: {
        title: edge.node.frontmatter.title,
      },
    });
  });
};

// https://stackoverflow.com/questions/57748844/how-do-i-use-multiple-createpage-routes-in-gatsby-node-js