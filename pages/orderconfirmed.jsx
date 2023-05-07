import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import QRcode from "../public/fsabookieQR.png";
import Image from "next/image";
const Container = styled.div`
  /* @media (min-width: 850px) { */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
  margin-top: 50px;
  /* } */
  .warning {
    color: white;
    font-size: 20px;
    text-align: center;
    margin-bottom: 20px;
  }
`;

const Receipt = styled.div`
  /* color: white; */
  background-color: #f9f6ee;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30vw;
  min-width: 200px;
  h1 {
  }
  img {
    margin-bottom: 25px;
  }
  .cont {
    width: 85%;
  }
  @media (max-width: 849px) {
    width: 80vw;
    max-width: 500px;
  }
`;

const BetContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 10px;
  .wagerInfo {
    text-align: right;
  }
  .teams {
    font-weight: bold;
  }
`;

const Orderconfirmed = () => {
  const router = useRouter();
  const {
    query: { data },
  } = router;
  // console.log("Before Parse", data);
  const [parsed, setParsed] = useState([]);

  useEffect(() => {
    if (data) {
      setParsed(JSON.parse(data));
    }
  }, [data]);
  // const parsed = JSON.parse(data);

  return (
    <Container>
      <p className="warning">Please do not refresh!</p>
      <Receipt>
        <h1>FSA Bookie</h1>
        <h2>Betting Slip</h2>
        <div className="cont">
          {parsed.map((bet, idx) => {
            return (
              <BetContainer key={idx}>
                <div>
                  <div className="teams">
                    {bet.homeTeam} - {bet.awayTeam}
                  </div>
                  <div>
                    {bet.gameLine}: {bet.odds}
                  </div>
                  <div>{bet.time}</div>
                </div>
                <div className="wagerInfo">
                  <div>{bet.wager}</div>
                  <div>{bet.toWin}</div>
                </div>
              </BetContainer>
            );
          })}
        </div>
        <Image src={QRcode} alt="Order Receipt" />
      </Receipt>
    </Container>
  );
};

export default Orderconfirmed;
