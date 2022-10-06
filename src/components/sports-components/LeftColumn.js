import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Container = styled.div`
  height: 175vh;
  width: 10.85em;
  background-color: rgb(47, 47, 161);
`;

const Popular = styled.div`
  padding-top: 1.5em;
`;

const All = styled.div``;

const Category = styled.div`
  cursor: pointer;
`;

function LeftColumn() {
  return (
    <Container>
      <Popular>
        Popular
        <Category>Live Games</Category>
        <Link href="/sports/NFL">
          <Category>NFL</Category>
        </Link>
        <Link href="/sports/NBA">
          <Category>NBA</Category>
        </Link>
        <Link href="/sports/MLB">
          <Category>MLB</Category>
        </Link>
        <Link href="/sports/NHL">
          <Category>NHL</Category>
        </Link>
        <Category>NCAAF</Category>
        <Category>NCAAB</Category>
        <Category>How to Bet</Category>
      </Popular>
      <All>
        All Categories
        <Category>Basketball</Category>
        <Category>Football</Category>
        <Category>Baseball</Category>
        <Category>Ice Hockey</Category>
        <Category>Soccer</Category>
        <Category>Tennis</Category>
        <Category>Golf</Category>
        <Category>Boxing</Category>
        <Category>MMA</Category>
      </All>
    </Container>
  );
}

export default LeftColumn;
