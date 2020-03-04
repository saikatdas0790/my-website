import React from "react";
import { graphql, Link } from "gatsby";
import { css } from "@emotion/core";
import SEO from "../components/seo";
import PostList from "../components/blog/PostList";

const paginationStyles = css`
  padding: 1rem 0;
  position: relative;
  > .previous {
    position: absolute;
    left: 0;
  }
  > .next {
    position: absolute;
    right: 0;
  }
`;

const Pagination = ({ pageContext }) => {
  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = `/blog/${
    currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
  }`;
  const nextPage = `/blog/${(currentPage + 1).toString()}`;

  return numPages < 2 ? null : (
    <section css={paginationStyles}>
      {!isFirst && (
        <Link to={prevPage} rel="prev" className="previous">
          ← Previous Page
        </Link>
      )}
      {!isLast && (
        <Link to={nextPage} rel="next" className="next">
          Next Page →
        </Link>
      )}
    </section>
  );
};

const blogPageListStyles = css`
  max-width: 960px;
  margin: 4rem auto 2rem auto;
  > h1 {
    margin: 2rem 0;
    text-align: center;
  }
`;

const BlogList = ({ data, pageContext, path }) => {
  const posts = data.allMarkdownRemark.edges;

  return (
    <>
      <main css={blogPageListStyles}>
        <SEO
          pageName="Blog"
          description="Blog posts on personal experiences and learnings"
        ></SEO>
        <h1>Most Recent Posts</h1>
        <PostList postListData={posts}></PostList>
        <Pagination pageContext={pageContext}></Pagination>
      </main>
    </>
  );
};

export const blogListQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(fromNow: true)
            title
            icon
            tags
          }
          id
          excerpt
        }
      }
    }
  }
`;

export default BlogList;
