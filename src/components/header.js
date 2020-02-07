import { Link } from "gatsby";
import React, { useEffect, useState } from "react";
import Icon from "../images/icon-bordered.svg";
import { css } from "@emotion/core";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const listenerForScroll = () => {
      if (window.scrollY > 0) setIsScrolled(true);
      else if (window.scrollY === 0) setIsScrolled(false);
    };
    window.addEventListener("scroll", listenerForScroll);
    return () => {
      window.removeEventListener("scroll", listenerForScroll);
    };
  }, []);

  const headerStyles = css`
    background: linear-gradient(90deg, #5dd9c1 0%, #fbbebe 100%);
    transition: padding 0.5s ease, box-shadow 0.5s ease;
    padding: 0.25rem 0;
    ${isScrolled
      ? `
          box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.25);
          padding: 0 0;
    `
      : ""}

    position: fixed;
    top: 0;
    z-index: 1;
    width: 100%;
    font-family: "Permanent Marker";
    margin: 0;
    > nav {
      width: 90vw;
      max-width: 960px;
      margin: 0 auto;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      > a {
        display: flex;
        justify-content: center;
        align-items: center;
        > img {
          width: 2rem;
        }
      }
      > ul {
        flex-grow: 1;
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        list-style: none;
        > li {
          margin-right: 2rem;
          > a {
            text-decoration: none;
            color: white;
            font-size: 1.5rem;
          }
          > a:hover {
            text-decoration: wavy underline;
          }
        }
      }
    }
  `;

  return (
    <header css={headerStyles}>
      <nav>
        <Link to="/">
          <img src={Icon} alt="Homepage" />
        </Link>
        <ul>
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
};

export default Header;
