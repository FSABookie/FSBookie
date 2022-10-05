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
export default function Home() {
  const { data, isSuccess } = useGetMLBQuery();

  useEffect(() => {
    isSuccess && console.log(data);
  }, [isSuccess, data]);

  return <BetsContainer>
       {isSuccess && data.map(game => 
       <div>
        {game.HomeTeam} vs {game.AwayTeam}
       </div>
        )}
  </BetsContainer>;
}
