import React from "react";
import hiEmoji from "../images/emoji/hi.gif";
import indiaIcon from "../images/emoji/india.svg";
import computerIcon from "../images/emoji/computer.svg";
import gamingIcon from "../images/emoji/gaming.svg";
import githubIcon from "../images/emoji/github.svg";
import linkedinIcon from "../images/emoji/linkedin.svg";
import sectionBreak from "../images/section-break.svg";
import gmailIcon from "../images/emoji/gmail.svg";
import { graphql, Link } from "gatsby";
import { css } from "@emotion/core";

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

const RecentArticlesSection = ({ postData }) => {
  const recentArticlesSectionStyles = css`
    > h1 {
      margin: 2rem 0;
      text-align: center;
    }
    > ul {
      list-style: none;
      > li {
        padding: 1rem 0;
        transition: box-shadow 0.25s ease;
        > a {
          text-decoration: none;
          display: grid;
          grid-template-columns: 2fr 7fr 3fr;
          grid-template-areas:
            "icon title tags"
            "icon date tags";
          align-items: center;
          color: black;
          > img {
            grid-area: icon;
            justify-self: center;
            margin: 0.5rem;
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
          @media (max-width: 768px) {
            grid-template-columns: max-content 1fr;
            grid-template-areas:
              "icon title"
              "icon date"
              "icon tags";
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
  return (
    <section css={recentArticlesSectionStyles}>
      <h1>Recent Articles</h1>
      <ul>
        {postData.map(
          ({
            node: {
              frontmatter: { date, icon, tags, title },
              id,
              fileAbsolutePath
            }
          }) => {
            return (
              <li key={id}>
                <Link
                  to={`/blog/${
                    fileAbsolutePath.split(`/`)[
                      fileAbsolutePath.split(`/`).length - 1
                    ]
                  }`}
                >
                  <img src={`images/post-icons/${icon}`} alt="" />
                  <h2>{title}</h2>
                  <span>{date}</span>
                  <span>{tags.map(tag => `#${tag}`).join(" ")}</span>
                </Link>
              </li>
            );
          }
        )}
      </ul>
    </section>
  );
};

const IndexPage = ({ data }) => {
  const bodyStyles = css`
    width: 96vw;
    max-width: 960px;
    margin: 0 auto;
  `;

  return (
    <main css={bodyStyles}>
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
          frontmatter {
            date(fromNow: true)
            title
            icon
            tags
          }
          id
          fileAbsolutePath
        }
      }
    }
  }
`;

export default IndexPage;
