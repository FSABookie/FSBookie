import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

const WagerContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 4%;
  
`;

const Wager = styled.div`
  border-style: solid;
  border-width: 1px;
  border-color: lightgray;
  margin-left: 0.1em;
  display: flex;
  flex-direction: column;

  &:hover {
    border-color: cornflowerblue;
  }
`;

const WinWager = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 6%;
`

const InputDiv = styled.div`
  display: flex;
  flex-direction: row;
`;

const InputWager = styled.input`
  margin: 0;
  border: none;
`;

//COMPONENT STARTS HERE

function WagerField({ odds, setToWin, setWager, wager, toWin }) {
  return (
    <>
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
        <WinWager>
          <div className="payout">
           Payout
          </div>
          <InputDiv>
        $
           <InputWager
              type="number"
              onChange={(e) => setToWin(e.target.value)}
              value={toWin}
            />
          </InputDiv>
        </WinWager>
      </WagerContainer>
    </>
  );
}

export default WagerField;
