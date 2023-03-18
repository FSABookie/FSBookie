import React, { useEffect, useState } from "react";
import styled from "styled-components";
import WagerField from "./WagerField";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import * as oddslib from "oddslib";
import {
  RemoveFromBetSlip,
  addWinAndWager,
} from "../../../redux/slices/BetSlip-slice";

const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-right: 0.15rem;
  padding-right: 1rem;
  padding-top: 4%;
`;

const Eh = styled.div`
  display: flex;
  flex-direction: row;
`;

const GameContainer = styled.div`
  border-bottom: 1px solid #242424;

`;

const Team = styled.div`
font-weight: bold;
`;

const Odds = styled.div`
  font-weight: 600;
`;

const MatchUp = styled.div`
  padding-bottom: 4%;
`;

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
          <MdOutlineRemoveCircleOutline
            color="red"
            onClick={() => dispatch(RemoveFromBetSlip(bet.id))}
          />
          <Team>
            {bet.awayTeam} @ {bet.homeTeam}
          </Team>
        </Eh>
        <Odds>{String(bet.odds)[0] === "-" ? bet.odds : "+" + bet.odds} </Odds>
      </TopRow>

      <MatchUp>
        {bet.oddType === "FirstHalf" && "1H"}
        {bet.oddType === "SecondHalf" && "2H"}
        {bet.oddType === "FirstQuarter" && "1Q"}
        {bet.oddType === "SecondQuarter" && "2Q"}
        {bet.oddType === "ThirdQuarter" && "3Q"}
        {bet.oddType === "FourthQuarter" && "4Q"} {bet.gameLine && bet.gameLine}
      </MatchUp>
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
