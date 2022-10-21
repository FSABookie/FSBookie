import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { CgTrash } from "react-icons/cg";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { RemoveAllSelections } from "../../../redux/slices/BetSlip-slice";
import BetSlipGame from "./BetSlipGame";
import Parlay from "./Parlay";
import {
  useCreateBetsMutation,
  useCreateParlayMutation,
  useGetUserQuery,
  useUpdateUserFundsMutation,
} from "../../../redux/slices/apiSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";

const BetSlipConntainer = styled.div`
  @media only screen and (min-width: 850px) {
    width: 25%;
    margin-left: 76.5%;
  }
  // @media only screen and (max-width: 850px) {
  bottom: 0;
  position: sticky;
  margin-top: 15%;
  background-color: white;
  margin-left: 0.5em;
  margin-right: 0.5em;
  border-radius: 10px;
  transition: 0.3s;
  transform: ${({ open }) =>
    open ? "translateY(-30%)" : "translateY(-1000%)"};
  height: ${({ open }) => (open ? "100%" : "3em")};
  // }
`;

const Funds = styled.div``;

const Submit = styled.button`
  background-color: green;
  width: 100%;
`;

const ClearBets = styled.div`
  color: red;
  display: flex;
  flex-direction: row;
  justify-content: center;
  cursor: pointer;
`;

const BetSlipHeaderContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 0.9em;
  padding-left: 0.25em;
  padding-right: 0.25em;
  margin-top: 10%;
`;

function BetSlip() {
  const [wager, setWager] = useState("");
  const [toWin, setToWin] = useState("");
  const [parlayOdds, setOdds] = useState("");
  const [toggled, setToggled] = useState(false);
  const [totalWager, setTotalWager] = useState("");
  const { betSlip } = useSelector((state) => state.betSlip);
  const { data: session, status } = useSession();
  const { data: user, isSuccess } = useGetUserQuery(
    status === "authenticated" ? session.user.id : skipToken
  );
  const [createParlay] = useCreateParlayMutation();
  const [createBet] = useCreateBetsMutation();
  const [updateFunds] = useUpdateUserFundsMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    setTotalWager(0);
    betSlip.forEach((ele) => {
      // calculating total wager to send to store to subtract from funds on submit bet
      setTotalWager((oldState) => Number(oldState) + Number(ele.wager));
    });
  }, [betSlip]);

  const submitBets = async () => {
    if (isSuccess) {
      if (user.balance < totalWager) {
        alert("NOT ENOUGH FUNDS BROKE ASS");
      } else {
        try {
          // first create the order for bets with createOrder mutation from apiSlice
          // Then map through bets and create bets using createBet mutation
          betSlip.forEach(async (bet) => {
            // append orderId to each bet for association
            let myBet = { ...bet, userId: user.id };
            // this not the real id so delete, new id will be appended through sequelize
            delete myBet.id;
            // create the bet if wager fields are greater than 0

            !isNaN(myBet.wager)
              ? await createBet(myBet)
              : alert("Enter a wager amount for " + myBet.gameLine);
          });

          // update user funds after everything is successfull
          await updateFunds({
            funds: user.balance - totalWager,
            id: user.id,
          });

          // remove bets from slip
          dispatch(RemoveAllSelections());
        } catch (error) {
          alert(error);
        }
      }
    }
  };

  const submitParlay = async () => {
    if (isSuccess) {
      if (user.balance < wager) {
        alert("NOT ENOUGH FUNDS BROKE ASS");
      } else {
        try {
          let { data: parlay } = await createParlay({
            userId: user.id,
            isActive: true,
            wager: wager,
            toWin: toWin,
          });
          betSlip.forEach(async (bet) => {
            // append orderId to each bet for association
            let myBet = { ...bet, userId: user.id, parlayId: parlay.id };
            // this not the real id so delete, new id will be appended through sequelize
            delete myBet.id;
            // create the bet if wager fields are greater than 0

            await createBet(myBet);
          });
          await updateFunds({
            funds: user.balance - wager,
            id: user.id,
          });
        } catch (error) {
          alert(error);
        }
      }
    }
  };

  return (
    <BetSlipConntainer open={toggled}>
      <BetSlipHeaderContainer onClick={() => setToggled(!toggled)}>
        {" "}
        <div>{betSlip.length} Bet Slip</div>
        {betSlip.length > 1 && <div>Parlay Odds {parlayOdds}</div>}
      </BetSlipHeaderContainer>

      {toggled && (
        <>
          {status === "authenticated" ? (
            <Funds>Your Available Funds : ${user.balance}</Funds>
          ) : (
            <Funds>Log In To See Funds</Funds>
          )}
          {/* mapping through bets and rendiner each individual slip */}
          {betSlip.map((bet, idx) => {
            return <BetSlipGame bet={bet} key={idx} />;
          })}
          <ClearBets onClick={() => dispatch(RemoveAllSelections())}>
            <CgTrash color="red" />
            Remove all Selections
          </ClearBets>
          {status === "authenticated" ? (
            <Submit onClick={() => submitBets()}>Lock In Bet(s)</Submit>
          ) : (
            <Link href="/login">
              <Submit>Log In to Place Bet</Submit>
            </Link>
          )}
          {betSlip.length > 1 && (
            <Parlay
              toWin={toWin}
              setToWin={setToWin}
              wager={wager}
              setWager={setWager}
              parlayOdds={parlayOdds}
              setOdds={setOdds}
            />
          )}
          {status === "authenticated" ? (
            <Submit onClick={() => submitParlay()}>Lock In Parlay</Submit>
          ) : (
            <Link href="/login">
              <Submit>Log In to Place Bet</Submit>
            </Link>
          )}
        </>
      )}
    </BetSlipConntainer>
  );
}

export default BetSlip;
