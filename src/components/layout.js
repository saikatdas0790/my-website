import React from "react";
import Header from "./header";
import Footer from "./footer";
import "typeface-muli";
import "typeface-permanent-marker";
import SEO from "./seo";

const Layout = ({ children, pageName = "" }) => {
  return (
    <>
      <SEO pageName={pageName}></SEO>
      <Header></Header>
      {children}
      <Footer></Footer>
    </>
  );
};

export default Layout;
