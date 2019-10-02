import React from "react";
import { Link } from "gatsby";
import { css } from "@emotion/core";

const footerStyles = css`
  margin-bottom: 1rem;
  ul {
    display: flex;
    list-style: none;
    justify-content: center;
    li {
      padding: 0 0.5rem;
      a {
        text-decoration: none;
        color: #9aaab4;
        font-size: 0.75 rem;
      }
    }
  }
`;

const Footer = () => (
  <footer css={footerStyles}>
    <nav>
      <ul>
        <li>
          <Link to="/blog">My Blog</Link>
        </li>
        <li>
          <Link to="/projects">Showcase</Link>
        </li>
      </ul>
    </nav>
  </footer>
);

export default Footer;
