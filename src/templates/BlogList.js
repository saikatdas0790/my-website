/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";
import SEO from "../components/seo";
import PostList from "../components/blog/PostList";

const paginationStyles = {
  padding: "1rem 0",
  position: "relative",
  "> .previous": {
    position: "absolute",
    left: 0,
  },
  "> .next": {
    position: "absolute",
    right: 0,
  },
};

const Pagination = ({ pageContext }) => {
  const { currentPage, numPages } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = `/blog/${
    currentPage - 1 === 1 ? "/" : (currentPage - 1).toString()
  }`;
  const nextPage = `/blog/${(currentPage + 1).toString()}`;

  return numPages < 2 ? null : (
    <section sx={paginationStyles}>
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

const blogPageListStyles = {
  maxWidth: "960px",
  margin: "4rem auto 2rem auto",
  "> h1": {
    margin: "2rem 0",
    textAlign: "center",
  },
};

const BlogList = ({ pageContext }) => {
  console.log(pageContext);
  return (
    <main sx={blogPageListStyles}>
      <SEO
        pageName="Blog"
        description="Blog posts on personal experiences and learnings"
      ></SEO>
      <h1>Most Recent Posts</h1>
      <PostList postListData={pageContext.posts}></PostList>
      <Pagination pageContext={pageContext}></Pagination>
    </main>
  );
};

export default BlogList;
