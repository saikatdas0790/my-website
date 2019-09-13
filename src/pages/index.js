import React from "react";
import hiEmoji from "../images/emoji/hi.gif";
import indiaEmoji from "../images/emoji/india.svg";
import { css } from "@emotion/core";

const Emoji = ({ label, src }) => (
  <span role="img" aria-label={label}>
    <img src={src} alt={label} />
  </span>
);

const introSectionStyles = css`
  p {
    span {
      img {
        width: 1.5rem;
      }
    }
  }
`;

const IntroSection = () => (
  <section css={introSectionStyles}>
    <p>
      <Emoji label="waving hand" src={hiEmoji}></Emoji>, I'm Saikat! I'm a
      programmer based out of{" "}
      <span role="img" aria-label="India">
        <img src={indiaEmoji} alt="India" />
      </span>
    </p>
  </section>
);

const IndexPage = () => (
  <>
    <IntroSection></IntroSection>
  </>
);

export default IndexPage;
