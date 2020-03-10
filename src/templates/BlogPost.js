/** @jsx jsx */
import { jsx } from "theme-ui";
import { MDXRenderer } from "gatsby-plugin-mdx";
import SEO from "../components/seo";

const postStyles = {
  maxWidth: "960px",
  margin: "4rem auto 2rem auto",
  "> pre": {
    padding: "1rem",
  },
  code: {
    backgroundColor: "highlight",
  },
  img: {
    display: "block",
    margin: "1rem auto",
  },
  "> blockquote": {
    "> p": {
      fontStyle: "italic",
    },
  },
};

const BlogPost = ({
  pageContext: {
    node: {
      frontmatter: { title },
      timeToRead,
      body,
      excerpt,
    },
  },
}) => {
  return (
    <main sx={postStyles}>
      <SEO title={title} description={excerpt}></SEO>
      <MDXRenderer>{body}</MDXRenderer>
    </main>
  );
};

export { BlogPost as default };
