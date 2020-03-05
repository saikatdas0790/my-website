import React from "react";
import { Link } from "gatsby";
import { css } from "@emotion/core";
import SEO from "../components/seo";

const BlogPost = ({
  pageContext: {
    node: {
      frontmatter: { title },
      timeToRead,
      html,
    },
  },
}) => {
  console.log(title);
  return (
    <main>
      <h1>{title}</h1>
      <article dangerouslySetInnerHTML={{ __html: html }}></article>
    </main>
  );
};

export { BlogPost as default };
