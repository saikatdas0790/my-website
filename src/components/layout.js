import React from "react";
import Header from "./header";
import Footer from "./footer";
import { css } from "@emotion/core";

const Layout = ({ children }) => {
  const bodyStyles = css`
    width: 90vw;
    max-width: 960px;
  `;

  return (
    <>
      <Header></Header>
      <main css={bodyStyles}>{children}</main>
      <Footer></Footer>
    </>
  );
};

export default Layout;
