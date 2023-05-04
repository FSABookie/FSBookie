import React, { useEffect } from "react";
import styled from "styled-components";
import { useGetMLBQuery } from "../src/redux/slices/apiSlice";
import LandingPage from "../src/components/LandingPage";
import { useSession } from "next-auth/react";

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
  return <LandingPage />;
}
