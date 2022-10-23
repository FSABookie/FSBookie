import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import BetSlip from "../src/components/sports-components/betslipComponents/BetSlip";
import styled from "styled-components";
import Link from "next/link";
import {
  useGetUserQuery,
  useUpdateBetsMutation,
  useUpdateParlayMutation,
  useUpdateUserFundsMutation,
  useGetUsersActiveBetsQuery,
} from "../src/redux/slices/apiSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useDispatch, useSelector } from "react-redux";
import { checkBetsThunk } from "../src/redux/thunks/checkBets";
import { determineWinnerThunk } from "../src/redux/thunks/determineWinner";
import {
  clearBets,
  getAllBets,
  getBets,
  getCompletedBets,
  getLostBets,
  getOpenBets,
  getWonBets,
} from "../src/redux/slices/usersBets-slice";

const Container = styled.div`
  padding: 5%;
  color: white;
  .title {
    font-weight: 650;
    font-size: 1.4em;
    margin-bottom: 15%;
    margin-top: 3%;
  }

  @media only screen and (min-width: 850px) {
    .title {
      margin-bottom: 7%;
    }
  }
`;

const SportsHeader = styled.div`
  margin-bottom: 15%;
  height: 100%;
  color: white;
  background: black;
  display: flex;
  flex-direction: row;
  column-gap: 4%;
  div {
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

  @media only screen and (min-width: 850px) {
    column-gap: 5%;
    padding-left: 20%;
    margin-bottom: 5%;
    div {
      padding: 1.5% 3.75%;
    }
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

  @media only screen and (min-width: 850px) {
    width: 70%;
    margin-left: 12%;

  }
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

  img {
    width: 12%;
    padding-right: 0.25em;
  }

  div {
    margin-bottom: 0.5em;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  ${
    "" /* &:nth-child(2) {
    margin-bottom: 1em;
  } */
  }

  @media only screen and (min-width: 850px) {
    img {
      width: 5%;
    }
  }
`;

// COMPONENT STARTS HERE

function MyBets() {
  const { data: session, status } = useSession();
  // Get all bets from user
  const {
    data: user,
    isSuccess,
    isLoading,
  } = useGetUserQuery(status === "authenticated" ? session.user.id : skipToken);
  // Get active bets only
  const { data: usersActiveBets, isSuccess: gotActiveBets } =
    useGetUsersActiveBetsQuery(
      status === "authenticated" ? session.user.id : skipToken
    );
  const { usersBets, filteredBets } = useSelector((state) => state.usersBets);
  const [updateParlay] = useUpdateParlayMutation();
  const [updateBet] = useUpdateBetsMutation();
  const [updateFunds] = useUpdateUserFundsMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearBets());
    isSuccess && user.bets.forEach((bet) => dispatch(getBets(bet)));
    // console.log(user.parlays);
    isSuccess && user.parlays.forEach((parlay) => dispatch(getBets(parlay)));
    isSuccess && console.log(filteredBets);
  }, [dispatch, user]);

  useEffect(() => {
    console.log(user);
    // if we are able to successfully get users active bets
    // map through bets
    user?.bets &&
      user.bets
        .filter((bet) => bet.status !== "complete")
        .forEach(async (bet) => {
          // fetch the api result for each active bet
          //CHECK HERE OR BACKEND FOR INCOMPLETED BETS??
          const { payload } = await dispatch(checkBetsThunk(bet.betId));
          if (payload[0]?.FinalType === "NotFinished") return;
          //dispatch data
          const data = await dispatch(
            determineWinnerThunk({ bet: bet, api: payload[0] })
          );
          // if the bet won, settle users funds

          if (data.payload === "won") {
            let payload = {
              isActive: false,
              status: "completed",
              result: "won",
            };
            await updateBet({ id: bet.id, payload });
            await updateFunds({
              funds: user.balance + bet.toWin,
              id: user.id,
            });
          }

          // IF THE BET LOSES
          if (data.payload === "lost") {
            let payload = {
              isActive: false,
              status: "completed",
              result: "lost",
            };
            await updateBet({ id: bet.id, payload });
          }
        });

    user?.parlays &&
      user.parlays
        .filter((parlay) => parlay.isActive)
        .forEach(async (bet) => {
          const { payload } = await dispatch(checkBetsThunk(bet.betId));
          if (payload[0]?.FinalType === "NotFinished") return;
          //dispatch data
          const data = await dispatch(
            determineWinnerThunk({ bet: bet, api: payload[0] })
          );
          // if the bet won, settle users funds

          if (data.payload === "won") {
            let payload = {
              isActive: false,
              status: "completed",
              result: "won",
            };
            await updateBet({ id: bet.id, payload });
          }

          // IF THE BET LOSES
          if (data.payload === "lost") {
            let payload = {
              isActive: false,
              status: "completed",
              result: "lost",
            };
            await updateBet({ id: bet.id, payload });
            await updateParlay({ id: parlay.id, payload });
          }
        });
  }, [dispatch]);

  return (
    <Container>
      <div className="title">MY BETS</div>
      <SportsHeader>
        <div className="filtered" onClick={() => dispatch(getAllBets())}>
          All
        </div>

        <div className="filtered" onClick={() => dispatch(getOpenBets())}>
          Open
        </div>

        <div className="filtered" onClick={() => dispatch(getCompletedBets())}>
          Settled
        </div>

        <div className="filtered" onClick={() => dispatch(getWonBets())}>
          Won
        </div>

        <div className="filtered" onClick={() => dispatch(getLostBets())}>
          Lost
        </div>
      </SportsHeader>
      {filteredBets &&
        filteredBets.map((bet) => {
          return !bet.parlayId && bet.betType !== "parlay" ? (
            <BetsContainer key={bet.id}>
              <BetsContainerHeader>
                <div>
                  {bet.gameLine + " "}
                  {bet.odds[0] !== "-" ? "+" + bet.odds : bet.odds}
                </div>
                <div>{bet.result}</div>
              </BetsContainerHeader>
              <WagerHeader>
                Wager: ${bet.wager} To Pay: ${bet.toWin}
              </WagerHeader>
              <TeamContainer>
                <div>
                  <img src={bet.homeTeamLogo} />
                  {bet.homeTeam}
                </div>
                <div>
                  <img src={bet.awayTeamLogo} />
                  {bet.awayTeam}
                </div>
                {bet.time}
              </TeamContainer>
              {bet.createdAt}
            </BetsContainer>
          ) : (
            bet.betType === "parlay" && (
              <BetsContainer key={bet.id}>
                {" "}
                <BetsContainerHeader>
                  <div>Parlay</div>
                  <div>{bet.result}</div>
                </BetsContainerHeader>
                <WagerHeader>
                  Wager: ${bet.wager} To Pay: ${bet.toWin}
                </WagerHeader>
                <TeamContainer>
                  {bet.bets.map((bet) => (
                    <div key={bet.id}>
                      {bet.awayTeam} @ {bet.homeTeam}
                      <div>{bet.gameLine}</div>
                      <div>{bet.result}</div>
                    </div>
                  ))}
                </TeamContainer>
                {bet.createdAt}
              </BetsContainer>
            )
          );
        })}
    </Container>
  );
}

export default MyBets;
