import React from "react";
import styled from "styled-components";
import LandingPage from "../src/components/LandingPage";
import Head from "next/head";

const Container = styled.div``;
const BetsContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2em;
  justify-content: center;
  align-items: center;
`;
const BetContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export default function Home() {
  return (
    <>
      <Head>
        <title>FSABookie</title>
        <meta
          name="Bookie application created By Dan, Daniel, and Brandon"
          content="Web App that showcases Sports betting to new and experienced users with unique features"
        />
      </Head>
      <LandingPage />
    </>
  );
}
