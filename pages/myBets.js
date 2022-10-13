import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import BetSlip from "../src/components/sports-components/betslipComponents/BetSlip";
import styled from "styled-components";
import Link from "next/link";
import { useGetUserQuery } from "../src/redux/slices/apiSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useSelector } from "react-redux";

const Container = styled.div`
  background-color: white;
`;

const SportsHeader = styled.div`
  margin-bottom: 15%;
  height: 100%;
  color: white;
  background: black;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 1%;
  a {
    position: relative;
    text-decoration: none;
    box-sizing: border-box;
    padding: 2% 4.25%;
    border: 1px solid #242424;
    border-radius: 50px;
    color: #ababab;
    background-color: #000;
    white-space: nowrap;
    font-size: 0.625em;
    line-height: 14px;
    font-weight: 600;
    font-family: "Saira Condensed", sans-serif;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.16s ease;
  }
`;

const BetsContainer = styled.div``;

// COMPONENT STARTS HERE

function MyBets() {
  const { data: session, status } = useSession();
  const { data, isSuccess, isLoading } = useGetUserQuery(
    status === "authenticated" ? session.user.id : skipToken
  );
  const { betSlip } = useSelector((state) => state.betSlip);

  useEffect(() => {
    console.log(session, data);
  }, []);

  return (
    <Container>
      <SportsHeader>
        <SportsHeader>
          <Link href="/sportsbook/NFL">
            <a>All</a>
          </Link>
          <Link href="/sportsbook/NBA">
            <a>Open</a>
          </Link>
          <Link href="/sportsbook/NHL">
            <a>Settled</a>
          </Link>
          <Link href="/sportsbook/MLB">
            <a>Won</a>
          </Link>
          <Link href="/sportsbook/MLB">
            <a>Lost</a>
          </Link>
        </SportsHeader>
      </SportsHeader>
      myBets
      <BetsContainer>
        {isSuccess &&
          data.orders.map((order) => {
            return (
              <div key={order.id}>
                {order.createdAt}
                {order.bets.map((bet) => {
                  return (
                    <div key={bet.id}>
                      <div>{bet.teams}</div> <div>{bet.gameLine}</div>
                    </div>
                  );
                })}
              </div>
            );
          })}
      </BetsContainer>
      {betSlip.length > 0 && <BetSlip />}
    </Container>
  );
}

export default MyBets;
