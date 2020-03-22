/** @jsx jsx */
import { jsx, IconButton, useColorMode } from "theme-ui";
import { useEffect, useState } from "react";
import { Link } from "gatsby";
import { Icon } from "@iconify/react";
import newMoonFace from "@iconify/icons-noto/new-moon-face";
import fullMoonFace from "@iconify/icons-noto/full-moon-face";
import BrandIcon from "../images/icon-bordered.svg";

const Header = () => {
  const [colorMode, setColorMode] = useColorMode();
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

  const headerStyles = {
    background: theme => theme.colors.backgroundGradient,
    transition: "padding 0.5s ease, box-shadow 0.5s ease",
    padding: isScrolled ? "0 0" : "0.25rem 0",
    boxShadow: isScrolled ? "0px 2px 16px rgba(0, 0, 0, 0.25)" : "",
    position: "fixed",
    top: 0,
    zIndex: 1,
    width: "100%",
    margin: 0,
    display: "flex",
    "> nav": {
      width: "90%",
      maxWidth: "960px",
      margin: "0 auto",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      flexWrap: "wrap",
      "> a": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        "> img": {
          width: "2rem",
        },
      },
      "> ul": {
        flexGrow: 1,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "flex-end",
        listStyle: "none",
        margin: "0.5rem 0",
        "> li": {
          marginRight: "1rem",
          "> a": {
            fontFamily: "decoration",
            textDecoration: "none",
            color: "text",
            fontSize: "1.5rem",
            ":hover": {
              textDecoration: "wavy underline",
            },
          },
        },
      },
      "> button": {
        width: "auto",
        height: "auto",
        marginLeft: "auto",
        cursor: "pointer",
        "> svg": {
          width: "2rem",
          height: "2rem",
        },
      },
    },
  };

  return (
    <header sx={headerStyles}>
      <nav>
        <Link to="/">
          <img src={BrandIcon} alt="Homepage" />
        </Link>
        <ul>
          <li>
            <Link to="/blog">My Blog</Link>
          </li>
          <li>
            <Link to="/projects">Showcase</Link>
          </li>
        </ul>
        <IconButton
          aria-label="Toggle dark mode"
          onClick={() =>
            setColorMode(colorMode === "default" ? "dark" : "default")
          }
        >
          {colorMode === "default" ? (
            <Icon icon={newMoonFace} />
          ) : (
            <Icon icon={fullMoonFace} />
          )}
        </IconButton>
      </nav>
    </header>
  );
};

export default Header;
