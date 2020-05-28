const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

const onCreateNode = ({ node, actions, getNode }) => {
  // * Creating slugs for the markdown files
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const splitFilePathArray = createFilePath({
      node,
      getNode,
      basePath: "src/posts",
    }).split("/");

    const value = `/blog/posts/${
      splitFilePathArray[splitFilePathArray.length - 2]
    }`;

    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

const createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(
    `
      {
        allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                author
                date(fromNow: true)
                featuredImage
                icon
                tags
                title
              }
              timeToRead
              id
              body
              excerpt
            }
          }
        }
      }
    `,
  );
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const posts = result.data.allMdx.edges;
  const postsPerPage = 10;
  const numPages = Math.ceil(posts.length / postsPerPage);

  // * Create blog-list pages
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: path.resolve("./src/templates/BlogList.js"),
      context: {
        posts: posts.slice(i * postsPerPage, (i + 1) * postsPerPage),
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });

  // * Create individual blog posts
  posts.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve("./src/templates/BlogPost.js"),
      context: {
        node,
      },
    });
  });

  // * Create projects list page
  createProjectsListingPage(createPage);
};

const createProjectsListingPage = createPage => {
  const projectsPerPage = 10;
  const { projects } = require("./src/data/projects.json");
  const numPages = Math.ceil(projects.length / projectsPerPage);

  // * Create projects list page
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/projects` : `/projects/${i + 1}`,
      component: path.resolve("./src/templates/ProjectList/index.js"),
      context: {
        projects: projects.slice(
          i * projectsPerPage,
          (i + 1) * projectsPerPage,
        ),
        limit: projectsPerPage,
        skip: i * projectsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });
};

module.exports = { createPages, onCreateNode };
