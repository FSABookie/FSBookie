import React, { useEffect, useState } from "react";
import styled from "styled-components";
import WagerField from "./WagerField";
//import { MdOutlineRemoveCircleOutline } from "react-icons";
import { useDispatch, useSelector } from "react-redux";
import * as oddslib from "oddslib";
import {
  RemoveFromBetSlip,
  addWinAndWager,
} from "../../redux/slices/BetSlip-slice";

const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 0.15rem;
  padding-right: 1rem;
`;

const Eh = styled.div`
  display: flex;
  flex-direction: row;
`;

const GameContainer = styled.div``;

const Team = styled.div``;

const Odds = styled.div``;

const MatchUp = styled.div``;

const Time = styled.div``;

//component

function BetSlipGame({ bet }) {
  const [wager, setWager] = useState("");
  const [toWin, setToWin] = useState("");

  const dispatch = useDispatch();

  //converting the american odds to decimal odds for future calculations
  let odds = oddslib.from("moneyline", bet.odds);
  odds.to("decimal");

  useEffect(() => {
    // This use effect is to calculate the win amount and assign it 2 decimal points
    setToWin((wager * odds.decimalValue).toFixed(2));
    // This useEffect is to send dispatch after change until the user is done updating the wager
    dispatch(
      addWinAndWager({
        wager: Number(wager),
        toWin: Number(toWin),
        bet: bet,
      })
    );
  }, [wager, toWin]);

  return (
    <GameContainer key={bet.id}>
      <TopRow>
        <Eh>
          {/* delete bet from betslip */}
          {/* <MdOutlineRemoveCircleOutline
            color="red"
            onClick={() => dispatch(RemoveFromBetSlip(bet.id))}
          /> */}
          <Team>{bet.teams}</Team>
        </Eh>
        <Odds>{String(bet.odds)[0] === "-" ? bet.odds : "+" + bet.odds}</Odds>
      </TopRow>

      <MatchUp>
        {bet.total && bet.total}
        {bet.spread && bet.team + " " + bet.spread}
        {!bet.spread && !bet.total && bet.team + " ML"}
      </MatchUp>
      <Time>{bet.time}</Time>
      {/* INPUT WAGER COMPONENT */}
      <WagerField
        odds={odds.decimalValue}
        setToWin={setToWin}
        setWager={setWager}
        wager={wager}
        toWin={toWin}
      />
    </GameContainer>
  );
}

export default BetSlipGame;
