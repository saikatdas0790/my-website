import React from "react";
import { graphql, Link } from "gatsby";
import { css } from "@emotion/core";
import SEO from "../components/seo";

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
  > ul {
    list-style: none;
    > li {
      margin: 1rem 0;
      padding: 1rem 0;
      transition: box-shadow 0.25s ease;
      > a {
        text-decoration: none;
        display: grid;
        grid-template-columns: 2fr 7fr 3fr;
        grid-template-areas:
          "icon title tags"
          "icon date tags"
          "icon excerpt .";
        align-items: center;
        color: black;
        > img {
          grid-area: icon;
          justify-self: center;
          margin: 1rem;
        }
        > h2 {
          font-family: "Muli";
          grid-area: title;
        }
        > span:nth-of-type(1) {
          grid-area: date;
          opacity: 0.6;
        }
        > span:nth-of-type(2) {
          grid-area: tags;
          opacity: 0.6;
        }
        > p {
          grid-area: excerpt;
          font-size: 1rem;
          opacity: 0.8;
        }
        @media (max-width: 768px) {
          grid-template-columns: max-content 1fr;
          grid-template-areas:
            "icon title"
            "icon date"
            "icon tags"
            "icon excerpt";
        }
      }
    }
    > li:hover,
    > li:active {
      box-shadow: 0 2px 8px -1px rgba(0, 0, 0, 0.2),
        0 1px 8px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12);
    }
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
        <ul>
          {posts.map(
            ({
              node: {
                frontmatter: { date, icon, tags, title },
                id,
                excerpt,
                fields: { slug },
              },
            }) => {
              return (
                <li key={id}>
                  <Link to={`/blog/posts/${slug}`}>
                    <img
                      src={`/images/post-icons/${icon}`}
                      alt={`${icon} icon`}
                    />
                    <h2>{title}</h2>
                    <span>{date}</span>
                    <span>{tags.map(tag => `#${tag}`).join(" ")}</span>
                    <p>{excerpt}</p>
                  </Link>
                </li>
              );
            },
          )}
        </ul>
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
