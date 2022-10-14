import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import BetSlip from "../src/components/sports-components/betslipComponents/BetSlip";
import styled from "styled-components";
import Link from "next/link";
import {
  useGetUserQuery,
  useUpdateBetsMutation,
  useUpdateOrderMutation,
  useUpdateUserFundsMutation,
  useGetSingleGameQuery,
  useGetUsersActiveBetsQuery,
} from "../src/redux/slices/apiSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useSelector } from "react-redux";

const Container = styled.div`
  padding: 5%;
  color: white;
  .title {
    font-weight: 650;
    font-size: 1.4em;
    margin-bottom: 15%;
    margin-top: 3%;
  }
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

const BetsContainer = styled.div`
  background-color: #242424;
  padding: 3%;
  min-height: 15%;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  margin-top: 0.75em;
  margin-bottom: 0.75em;
`;

const BetsContainerHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 0.9rem;
  margin-bottom: 0.75em;
`;

const WagerHeader = styled.div`
  display: flex;
  align-items: flex-start;
  font-size: 0.75rem;
  margin-bottom: 0.9em;
`;

const TeamContainer = styled.div`
  border-style: solid;
  border-color: white;
  border-width: 0.05em;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  margin-bottom: 0.75em;
  padding: 1em 0.75em 1em 0.5em;
  font-size: 0.8rem;

  div {
    margin-bottom: 0.5em;
  }

  ${
    "" /* &:nth-child(2) {
    margin-bottom: 1em;
  } */
  }
`;

// COMPONENT STARTS HERE

function MyBets() {
  const { data: session, status } = useSession();
  // Get all bets from user
  const { data, isSuccess, isLoading } = useGetUserQuery(
    status === "authenticated" ? session.user.id : skipToken
  );
  // Get active bets only
  const { data: usersActiveBets, isSuccess: gotActiveBets } =
    useGetUsersActiveBetsQuery(
      status === "authenticated" ? session.user.id : skipToken
    );
  const { betSlip } = useSelector((state) => state.betSlip);
  const [updateOrder] = useUpdateOrderMutation();
  const [updateBet] = useUpdateBetsMutation();
  const [updateFunds] = useUpdateUserFundsMutation();
  // initialize with skipToken to skip at first
  const [query, setQuery] = useState(skipToken);
  // query single game once a query Id is set
  const { data: gameCheck } = useGetSingleGameQuery(query);

  useEffect(() => {
    gotActiveBets && console.log(usersActiveBets);
    gotActiveBets &&
      usersActiveBets.orders.forEach((order) => {
        // console.log(order.bets);
        order.bets.forEach((bet) => {
          console.log(bet);
          setQuery(bet.betId);
          //   console.log(gameCheck);
        });
      });
  }, [gameCheck, gotActiveBets, usersActiveBets]);

  return (
    <Container>
      <div className="title">MY BETS</div>
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
      {isSuccess &&
        data.orders.map((order) => {
          return order.bets.map((bet) => {
            return (
              <BetsContainer key={bet.id}>
                <BetsContainerHeader>
                  <div>{bet.gameLine + " " + bet.odds}</div>
                  <div>{bet.status}</div>
                </BetsContainerHeader>
                <WagerHeader>
                  Wager: ${bet.wager} To Pay: ${bet.toWin}
                </WagerHeader>
                <TeamContainer>
                  <div>{bet.teams.split("@")[0]}</div>
                  <div>{bet.teams.split("@")[1]}</div>
                  {bet.time}
                </TeamContainer>
                {bet.createdAt}
              </BetsContainer>
            );
          });
        })}
      {betSlip.length > 0 && <BetSlip />}
    </Container>
  );
}

export default MyBets;
