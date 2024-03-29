import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import * as oddslib from "oddslib";

const WagerContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 3%;
`;

const ParlayOdds = styled.div`
  padding: 3%;
  font-weight: 700;
  span {
    font-weight: 600;
  }
`

const Wager = styled.div`
  margin-left: 0.1em;
  display: flex;
  flex-direction: column;

  &:hover {
    border-color: cornflowerblue;
  }
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const InputWager = styled.input`
  margin: 0;
  border: none;
`;

function Parlay({ wager, setWager, toWin, setToWin, parlayOdds, setOdds }) {
  const { betSlip } = useSelector((state) => state.betSlip);
  //   const { wager, toWin } = useSelector((state) => state.parlay);
  const dispatch = useDispatch();

  useEffect(() => {
    setOdds(1);
    betSlip.forEach((ele) => {
      // converting american odds to decimal to be able to calculate parlay
      let odds = oddslib.from("moneyline", ele.odds);
      odds.to("decimal");
      setToWin((wager * parlayOdds).toFixed(2));
      //calculating odds for parlay
      setOdds((oldState) => Number(oldState * odds.decimalValue).toFixed(2));
    });
  }, [betSlip, wager, toWin]);

  return (
    <>
    <ParlayOdds>
      {betSlip.length} Leg Parlay <span>+{parlayOdds}</span>
      </ParlayOdds>
      <WagerContainer>
        <Wager>
          Wager
          <InputDiv>
            $
            <InputWager
              type="number"
              inputMode="numeric"
              onChange={(e) => setWager(e.target.value)}
              value={wager}
            />
          </InputDiv>
        </Wager>
        <Wager>
          To Win
          <InputDiv>
            $
            <InputWager
              type="number"
              onChange={(e) => setToWin(e.target.value)}
              value={toWin}
            />
          </InputDiv>
        </Wager>
      </WagerContainer>
    </>
  );
}

export default Parlay;
