import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import BetSlip from "../src/components/sports-components/betslipComponents/BetSlip";
import styled from "styled-components";
import Link from "next/link";
import { useGetUserQuery } from "../src/redux/slices/apiSlice";
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
  .pick {
    display: flex;
    gap: 4%;
  }

  .betcard {
    display: flex;
    flex-direction: column;
    row-gap: 30px;

  }

  .wagertowin {
    display: flex;
    flex-direction: row;
    gap: 10%;
  }
`;

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
        <div className="title">
          MY BETS
        </div>
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
      <BetsContainer>
        {isSuccess &&
          data.orders.map((order) => {
            return (
              <div key={order.id}>
                {order.bets.map((bet) => {
                   console.log(bet)
                  return (
                    <div className="betcard" key={bet.id}>
                       <div className="pick">
                            {bet.gameLine}
                          <div className="odds">
                            {bet.odds}
                          </div>
                        </div>
                        <div className="wagertowin">
                        <div className="wager">
                            Wager: {' $' + bet.wager}
                          </div>
                          <div className="toWin">
                            To Pay: {' $'+ bet.toWin}
                          </div>
                          </div>
                        <div>
                        {bet.teams}
                        </div>
                      {order.createdAt}
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
