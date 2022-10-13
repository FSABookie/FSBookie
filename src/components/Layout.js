import React from "react";
import { useRouter } from "next/router";
import Header from "./Header";
import styled from "styled-components";

const MainContainer = styled.div``;

const Layout = ({ Component, pageProps }) => {
  const { asPath } = useRouter();

  return (
    <MainContainer>
      {asPath === "/" || asPath === "/login/session" ? null : <Header />}
      <Component {...pageProps} />
    </MainContainer>
  );
};

export default Layout;
