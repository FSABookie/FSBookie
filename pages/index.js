import React, { useEffect } from "react";
import styled from "styled-components";
import { useGetMLBQuery } from "../src/redux/slices/apiSlice";

const Container = styled.div``;
const BetsContainer = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 2em;
    justify-content: center;
    align-items: center;
`;
const BetContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;

`;
export default function Home() {
  const { data, isSuccess } = useGetMLBQuery();

  useEffect(() => {
    isSuccess && console.log(data);
  }, [isSuccess, data]);

  return <BetsContainer>
       {isSuccess && data.map(game => 
       <BetContainer>
        <h3>{game.HomeTeam} vs {game.AwayTeam}</h3>
        <p>Home - Away</p>
        <p>{game.Odds[1].MoneyLineHome} | {game.Odds[1].MoneyLineAway}</p>

       </BetContainer>
        )}
  </BetsContainer>;
}
