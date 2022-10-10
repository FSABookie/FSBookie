import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { CgTrash } from "react-icons/cg";
import Parlay from "./Parlay";
import BetSlipGame from "./BetSlipGame";
import Link from "next/link";
import { submitBetsThunk } from "../../redux/thunks/betSlip";
import { useSession } from "next-auth/react";

const Container = styled.div`
  height: 175vh;
  width: 25em;
  background-color: lightgrey;
  display: flex;
  flex-direction: column;
`;

const Submit = styled.button`
  background-color: green;
`;

const ClearBets = styled.div`
  color: red;
  display: flex;
  flex-direction: row;
  justify-content: center;
  cursor: pointer;
`;

const Funds = styled.div``;

//COMPONENT STARTS HERE!!!!!!!

function BetSlip() {
  const [wager, setWager] = useState("");
  const [toWin, setToWin] = useState("");
  const [totalWager, setTotalWager] = useState("");

	const { data: session, status} = useSession();

  // fetching data from store
  const betSlip = useSelector((state) => state.betSlip.betSlip);
  // const { isLoggedIn, user } = useSelector((state) => state.user);
  // const { funds } = useSelector((state) => state.funds);

  const dispatch = useDispatch();

  // converting odds to american odds from decimal
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
    <Container>
      {betSlip.length} BetSlip
      <Funds>Your Available Funds : $100</Funds>
      {/* mapping through bets and rendiner each individual slip */}
      {betSlip.map((bet, idx) => {
        return <BetSlipGame bet={bet} key={idx} />;
      })}
      {/* making parlay component */}
      {betSlip.length > 1 && (
        <Parlay
          toWin={toWin}
          setToWin={setToWin}
          wager={wager}
          setWager={setWager}
        />
      )}
      <ClearBets onClick={() => dispatch(RemoveAllSelections())}>
        <CgTrash color="red" />
        Remove all Selections
      </ClearBets>
      {status === "authenticated" ? (
        <Submit onClick={() => submitBets()}>Lock In Bet(s)</Submit>
      ) : (
        <Link href="/LogIn">
          <Submit>Log In to Place Bet</Submit>
        </Link>
      )}
    </Container>
  );
}

export default BetSlip;

// pass in bet to wager
// pass in wager and win to bet
