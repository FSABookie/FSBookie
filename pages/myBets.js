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
  useGetUsersActiveBetsQuery,
} from "../src/redux/slices/apiSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useDispatch, useSelector } from "react-redux";
import { checkBetsThunk } from "../src/redux/thunks/checkBets";
import { determineWinnerThunk } from "../src/redux/thunks/determineWinner";

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
  const [filter, setF] = useState("all");
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
  const { betSlip } = useSelector((state) => state.betSlip);
  const [updateOrder] = useUpdateOrderMutation();
  const [updateBet] = useUpdateBetsMutation();
  const [updateFunds] = useUpdateUserFundsMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(user);
    // if we are able to successfully get users active bets
    gotActiveBets && console.log("active bets", usersActiveBets);
    // map through orders
    usersActiveBets?.orders.forEach((order) => {
      // map through bets
      order.bets.filter(bet => bet.status !== 'complete').forEach(async (bet) => {
        // fetch the api result for each active bet
        //CHECK HERE OR BACKEND FOR INCOMPLETED BETS??
        const { payload } = await dispatch(checkBetsThunk(bet.betId));
        // get the correct odd type we need (i.e, fullGame, halfTime, firstQ)
        let game = payload.filter((odds) => odds.OddType === "Game")[0];
        console.log(game);
        //dispatch data
        if (game.FinalType === "Finished") {
          const data = await dispatch(
            determineWinnerThunk({ bet: bet, api: game })
          );
          // if the bet won, settle users funds
  
          if (data.payload === "won") {
            let payload = {
              isActive: false,
              status: "completed",
              result: "won",
            };
            let { data } = await updateBet({ id: bet.id, payload });
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
            let { data } = await updateBet({ id: bet.id, payload });
          }

        }
      });
    });
  }, [gotActiveBets, dispatch]);

  return (
    <Container>
      <div className="title">MY BETS</div>
      <SportsHeader>
        <div className="filtered">All</div>

        <div className="filtered">Open</div>

        <div className="filtered" onClick={() => setF("w")}>
          Settled
        </div>

        <div className="filtered" onClick={() => setF("won")}>
          Won
        </div>

        <div className="filtered" onClick={() => setF("lost")}>
          Lost
        </div>
      </SportsHeader>
      {isSuccess &&
        user.orders.map((order) => {
          return order.bets
            .filter((bet) => bet.result === filter)
            .map((bet) => {
              return (
                <BetsContainer key={bet.id}>
                  <BetsContainerHeader>
                    <div>
                      {bet.gameLine + " "}
                      {bet.odds[0] !== "-" ? "+" + bet.odds : bet.odds}
                    </div>
                    <div>{bet.status}</div>
                  </BetsContainerHeader>
                  <WagerHeader>
                    Wager: ${bet.wager} To Pay: ${bet.toWin}
                  </WagerHeader>
                  <TeamContainer>
                    <div>{bet.homeTeam}</div>
                    <div>{bet.awayTeam}</div>
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
