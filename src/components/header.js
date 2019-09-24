import { Link } from "gatsby";
import React from "react";
import Icon from "../images/icon-bordered.svg";
import { css } from "@emotion/core";

const headerStyles = css`
  background: linear-gradient(90deg, #5dd9c1 0%, #fbbebe 100%);
  font-family: "Permanent Marker";
  margin: 0;

  @media (max-width: 960px) {
  }

  @media (min-width: 961px) {
    ul {
      display: flex;
      list-style: none;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;

      li {
        flex: 1 1 auto;
        font-size: 1.5rem;
        display: flex;
        justify-content: center;

        :first-child {
          a {
            display: flex;
            img {
              width: 32px;
            }
          }
        }

        :not(:first-child) {
          a {
            text-decoration: none;
            color: white;
          }
        }
      }
    }
  }
`;

const Header = () => (
  <header css={headerStyles}>
    <nav>
      <ul>
        <li>
          <Link to="/">
            <img src={Icon} alt="Homepage" />
          </Link>
        </li>
        <li>
          <Link to="/blog">My Blog</Link>
        </li>
        <li>
          <Link to="/projects">Showcase</Link>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
