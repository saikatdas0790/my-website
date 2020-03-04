import React from "react";
import { graphql } from "gatsby";
import { css } from "@emotion/core";
import hiEmoji from "../images/emoji/hi.gif";
import indiaIcon from "../images/emoji/india.svg";
import computerIcon from "../images/emoji/computer.svg";
import gamingIcon from "../images/emoji/gaming.svg";
import githubIcon from "../images/emoji/github.svg";
import linkedinIcon from "../images/emoji/linkedin.svg";
import sectionBreak from "../images/section-break.svg";
import gmailIcon from "../images/emoji/gmail.svg";
import SEO from "../components/seo";
import PostList from "../components/blog/PostList";

const Emoji = ({ label, src }) => (
  <span role="img" aria-label={label}>
    <img src={src} alt={label} title={label} />
  </span>
);

const SectionBreak = () => {
  const style = css`
    display: flex;
    justify-content: space-around;
    img {
      max-width: 90vw;
    }
  `;
  return (
    <span css={style}>
      <img src={sectionBreak} alt="section break" />
    </span>
  );
};

const IntroSection = () => {
  const introSectionStyles = css`
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 5rem 0;
    p {
      span {
        img {
          width: 1.5rem;
        }
      }
    }
  `;
  return (
    <section css={introSectionStyles}>
      <p>
        <Emoji label="Hi" src={hiEmoji}></Emoji>, I'm Saikat!
        <br />
        I'm a programmer based out of{" "}
        <Emoji label="India" src={indiaIcon}></Emoji>
        <br />I like <Emoji
          label="computers"
          src={computerIcon}
        ></Emoji> and <Emoji label="gaming" src={gamingIcon}></Emoji>
        <br />
        Connect with me on{" "}
        <a
          href="https://www.linkedin.com/in/saikat-das-13674166/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Emoji label="LinkedIn" src={linkedinIcon}></Emoji>
        </a>{" "}
        or{" "}
        <a
          href="https://github.com/saikatdas0790"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Emoji label="Github" src={githubIcon}></Emoji>
        </a>
        <br />
        You can also{" "}
        <a
          href="mailto:saikatdas0790@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Emoji label="Gmail" src={gmailIcon}></Emoji>
        </a>{" "}
        me in case you want to talk.
      </p>
    </section>
  );
};

const recentArticlesSectionStyles = css`
  > h1 {
    margin: 2rem 0;
    text-align: center;
  }
`;

const RecentArticlesSection = ({ postData }) => {
  return (
    <section css={recentArticlesSectionStyles}>
      <h1>Recent Articles</h1>
      <PostList postListData={postData}></PostList>
    </section>
  );
};

const IndexPage = ({ data }) => {
  const bodyStyles = css`
    width: 96vw;
    max-width: 960px;
    margin: 0 auto;
    padding: 0 1rem;
  `;

  return (
    <main css={bodyStyles}>
      <SEO pageName="Home"></SEO>
      <IntroSection></IntroSection>
      <SectionBreak></SectionBreak>
      <RecentArticlesSection
        postData={data.recentArticlesSection.edges}
      ></RecentArticlesSection>
    </main>
  );
};

export const query = graphql`
  {
    recentArticlesSection: allMarkdownRemark(
      limit: 10
      sort: { order: DESC, fields: frontmatter___date }
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

export default IndexPage;
