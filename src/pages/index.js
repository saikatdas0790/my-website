import React from "react";
import hiEmoji from "../images/emoji/hi.gif";
import indiaIcon from "../images/emoji/india.svg";
import computerIcon from "../images/emoji/computer.svg";
import gamingIcon from "../images/emoji/gaming.svg";
import githubIcon from "../images/emoji/github.svg";
import linkedinIcon from "../images/emoji/linkedin.svg";
import sectionBreak from "../images/section-break.svg";
import { Link } from "gatsby";

import { css } from "@emotion/core";

const Emoji = ({ label, src }) => (
  <span role="img" aria-label={label}>
    <img src={src} alt={label} />
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
        <Emoji label="waving hand" src={hiEmoji}></Emoji>, I'm Saikat!
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
      </p>
    </section>
  );
};

const RecentArticlesSection = () => {
  const recentArticlesSectionStyles = css`
    h1 {
    }
  `;

  return (
    <section css={recentArticlesSectionStyles}>
      <h1>Recent Articles</h1>
    </section>
  );
};

const IndexPage = () => (
  <>
    <IntroSection></IntroSection>
    <SectionBreak></SectionBreak>
    <RecentArticlesSection></RecentArticlesSection>
  </>
);

export default IndexPage;
