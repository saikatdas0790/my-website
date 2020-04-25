/** @jsx jsx */
import { jsx } from "theme-ui";
import { MDXRenderer } from "gatsby-plugin-mdx";
import SEO from "../components/seo";

const postStyles = {
  maxWidth: "960px",
  margin: "5rem auto 2rem auto",
  padding: "0 1rem",
  "> h1": {
    textAlign: "center",
  },
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
    backgroundColor: "gray",
    "> p": {
      fontStyle: "italic",
    },
  },
  "> small": {
    display: "block",
    textAlign: "center",
    margin: "-1rem auto 2rem auto",
    fontSize: "1rem",
  },
  "> .featured-image": {
    width: "100%",
  },
};

const BlogPost = props => {
  const {
    pageContext: {
      node: {
        frontmatter: { title, featuredImage, icon },
        timeToRead,
        body,
        excerpt,
      },
    },
    path,
  } = props;

  return (
    <main sx={postStyles}>
      <SEO title={title} description={excerpt} url={path} image={icon}></SEO>
      <h1>{title}</h1>
      <small>{timeToRead} minute read</small>
      {featuredImage ? (
        <img
          src={featuredImage}
          alt={`${title}`}
          loading="lazy"
          className="featured-image"
        />
      ) : null}
      <MDXRenderer>{body}</MDXRenderer>
    </main>
  );
};

export { BlogPost as default };
