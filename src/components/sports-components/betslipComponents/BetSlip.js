import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { submitBetsThunk } from "../../../redux/thunks/betSlip";
import { useDispatch } from "react-redux";
import { CgTrash } from "react-icons/cg";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { RemoveAllSelections } from "../../../redux/slices/BetSlip-slice";
import BetSlipGame from "./BetSlipGame";
import Parlay from "./Parlay";

const BetSlipConntainer = styled.div`
  bottom: 0;
  position: sticky;
  background-color: white;
  margin-left: 0.5em;
  margin-right: 0.5em;
  border-radius: 10px;
  transition: 0.3s ease-in-out;
  transform: ${({ open }) => (open ? "translateY(-1em)" : "translateY(-100%)")};
  height: ${({ open }) => (open ? "100%" : "3em")};
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 0.9em;
  padding-left: 0.25em;
  padding-right: 0.25em;
`;

function BetSlip() {
  const [wager, setWager] = useState("");
  const [toWin, setToWin] = useState("");
  const [parlayOdds, setOdds] = useState("");
  const [toggled, setToggled] = useState(false);
  const { betSlip } = useSelector((state) => state.betSlip);
  const [totalWager, setTotalWager] = useState("");
  const { data: session, status } = useSession();

  const dispatch = useDispatch();

  useEffect(() => {
    setTotalWager(0);
    betSlip.forEach((ele) => {
      // calculating total wager to send to store to subtract from funds on submit bet
      setTotalWager((oldState) => Number(oldState) + Number(ele.wager));
    });
  }, [betSlip]);

  const submitBets = () => {
    let payload = {
      userId: session.user.id,
      betSlip,
    };

    dispatch(submitBetsThunk(payload));
  };

  return (
    <BetSlipConntainer open={toggled}>
      <BetSlipHeaderContainer onClick={() => setToggled(!toggled)}>
        {" "}
        <div>{betSlip.length} Bet Slip</div>
        <div>Parlay Odds +{parlayOdds}</div>
      </BetSlipHeaderContainer>

      {toggled && (
        <>
          <Funds>Your Available Funds : $100</Funds>{" "}
          {/* mapping through bets and rendiner each individual slip */}
          {betSlip.map((bet, idx) => {
            return <BetSlipGame bet={bet} key={idx} />;
          })}
          <ClearBets onClick={() => dispatch(RemoveAllSelections())}>
            <CgTrash color="red" />
            Remove all Selections
          </ClearBets>
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
            <Submit onClick={() => submitBets()}>Lock In Bet(s)</Submit>
          ) : (
            <Link href="/LogIn">
              <Submit>Log In to Place Bet</Submit>
            </Link>
          )}
        </>
      )}
    </BetSlipConntainer>
  );
}

export default BetSlip;
