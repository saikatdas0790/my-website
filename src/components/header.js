import { Link } from "gatsby";
import React from "react";
// import "typeface-permanent-marker";

const styles = {
  header: {
    background: `linear-gradient(90deg, #5DD9C1 0%, #FBBEBE 100%)`
    // fontFamily: `Permanent Marker`
  }
};

const Header = () => (
  <header style={styles.header}>
    <Link>
      <h2>My Blog</h2>
    </Link>
    <Link>
      <h2>Showcase</h2>
    </Link>
    <Link>
      <h2>Reach Me</h2>
    </Link>
  </header>
);

export default Header;
