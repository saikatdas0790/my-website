import React from "react";
/** @jsx jsx */
import { jsx } from "theme-ui";
import SEO from "../../components/seo";
import { Link } from "gatsby";
import BackgroundImage from "./404-background.svg";

const mainStyles = {
  height: "calc(100vh - 4rem)",
  marginTop: "4rem",
  backgroundImage: `url(${BackgroundImage})`,
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  "> article": {
    maxWidth: "960px",
    margin: "0 auto",
    padding: "1rem",
    fontSize: "1.5rem",
    backdropFilter: "blur(1rem)",
  },
};

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <main sx={mainStyles}>
      <article>
        <p>
          Hey there, time traveller! You seem to have visited this page in the
          past when it doesn't exist yet!
        </p>
        <p>
          Why not visit again in the future when this is available? In the
          meantime, why don't you <Link to="/blog">check out</Link> some of our
          fresh posts on JavaScript and React
        </p>
      </article>
    </main>
  </>
);

export default NotFoundPage;
