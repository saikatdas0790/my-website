/** @jsx jsx */
import { jsx } from "theme-ui";
import { Link } from "gatsby";

const footerStyles = {
  margin: "1rem 0",
  ul: {
    display: "flex",
    listStyle: "none",
    justifyContent: "center",
    li: {
      padding: "0 0.5rem",
      a: {
        textDecoration: "none",
        color: "secondary",
        fontSize: "0.75rem",
      },
    },
  },
};

const Footer = () => (
  <footer sx={footerStyles}>
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
