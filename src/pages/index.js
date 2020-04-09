/** @jsx jsx */
import { jsx } from "theme-ui";
import { graphql } from "gatsby";
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

const sectionBreakStyles = {
  display: "flex",
  justifyContent: "space-around",
  img: {
    maxWidth: "90vw",
  },
};
const SectionBreak = () => {
  return (
    <span sx={sectionBreakStyles}>
      <img src={sectionBreak} alt="section break" />
    </span>
  );
};

const introSectionStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  padding: "5rem 0",
  p: {
    fontSize: "1.5rem",
    textAlign: "center",
    span: {
      img: {
        width: "1.5rem",
      },
    },
  },
};

const IntroSection = () => {
  return (
    <section sx={introSectionStyles}>
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
          <Emoji label="email" src={gmailIcon}></Emoji>
        </a>{" "}
        me in case you want to talk.
      </p>
    </section>
  );
};

const recentArticlesSectionStyles = {
  "> h1": {
    margin: "2rem 0",
    textAlign: "center",
    fontFamily: "decoration",
    fontSize: "2.5rem",
    fontWeight: 200,
  },
};

const RecentArticlesSection = ({ postData }) => {
  return (
    <section sx={recentArticlesSectionStyles}>
      <h1>Recent Articles</h1>
      <PostList postListData={postData}></PostList>
    </section>
  );
};

const bodyStyles = {
  width: "96vw",
  maxWidth: "960px",
  margin: "0 auto",
};

const IndexPage = ({ data }) => {
  return (
    <main sx={bodyStyles}>
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
    recentArticlesSection: allMdx(
      limit: 5
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
