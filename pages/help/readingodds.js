import React from "react";
import styled from "styled-components";
import Link from "next/link";

const Container = styled.div`
  background-color: rgb(16, 16, 16);
  color: white;
  text-align: center;
  font-family: "Open Sans" sans-serif;
  padding: 4%;
  @media only screen and (min-width: 850px) {
    p {
      font-family: "Open Sans" sans-serif;
      padding-left: 15%;
      padding-right: 15%;
    }
  }
`;

const Overview = styled.div`
  font-size: 1.2em;

  h2 {
    font-size: 1.6em;
    font-weight: 500;
  }

  p {
    font-size: 1.2em;
    font-weight: 300;
    text-align: left;
  }

  @media only screen and (min-width: 850px) {
    padding-top: 2%;
  }

  .longOdds {
    background-color: #242424;
    padding: 1%;
    margin-bottom: 3%;

    p {
      color: green;
    }
  }

  .shortOdds {
    background-color: #242424;
    padding: 1%;
    margin-bottom: 3%;

    p {
      color: green;
    }
  }

  .evenOdds {
    background-color: #242424;
    padding: 1%;
    margin-bottom: 3%;

    p {
      color: green;
    }
  }

  .exampleOdds {
    text-align: center;
  }
`;

const BetTypes = styled.div`
  margin-top: 5%;
  color: black;
  background-color: white;
  width: 100%;
  padding: 3%;
  font-size: 1.2em;

  p {
    font-size: 1.2em;
    font-weight: 300;
  }

  a {
    background-color: green;
    padding: 4%;
    border-radius: 8px;
    font-weight: 650;
  }

  .getStarted {
    padding-top: 5%;
    padding-bottom: 5%;
  }

  @media only screen and (min-width: 850px) {
    a {
      padding: 2%;
    }
  }
`;
const Odds = styled.div`
  width: 100%;
  margin-bottom: 20%;
  img {
    width: 100%;
    margin-top: 10%;
  }

  h1 {
    font-family: "Saira Condensed", "Open Sans", sans-serif;
    font-size: 2.25em;
    color: green;
  }

  h3 {
    font-weight: 400;
    font-size: 1.75em;
  }

  a {
    background-color: green;
    padding: 4%;
    border-radius: 8px;
    font-weight: 650;
  }

  .signUp {
    padding-top: 3%;
  }

  p {
    font-size: 1.3em;
  }

  @media only screen and (min-width: 850px) {
    img {
      display: none;
    }
    margin-bottom: 0;
    padding-top: 3%;

    a {
      padding: 2%;
    }
  }
`;

function readingodds() {
  return (
    <Container>
      <Odds>
        <img src="https://media.istockphoto.com/photos/male-hand-holding-smartphone-in-black-background-picture-id1302676710?k=20&m=1302676710&s=612x612&w=0&h=UZYqF5VmYFN6KgqhT8LqMZQfJ6hQI69vcXx3QlD3t-I=" />
        <h1>HOW TO READ ODDS</h1>
        <h3>
          The first step to learning how to bet is learning how to read odds.
        </h3>
        <p>Already a pro? Sign up to get started betting!</p>

        <div className="signUp">
          <Link href="/signup">SIGN UP</Link>
        </div>
      </Odds>

      <Overview>
        <h2>How to Read Odds</h2>
        <p>
          Odds are the measure of how much you can win vs. how much you bet, per
          $100. Odds are included in all forms of betting, whether it’s
          moneylines, spreads, or totals.
        </p>
        <p>
          -110, for example, means $110 wager for $100 potential profit (or $11
          wager for $10 potential profit)
        </p>
        <p>
          +110, for example, means $100 wager for $110 potential profit (or $10
          wager for $11 potential profit)
        </p>

        <div className="longOdds">
          Longer Odds
          <p className="exampleOdds">+120 &nbsp; &nbsp; &nbsp; +110</p>
        </div>
        <div className="evenOdds">
          Even
          <p className="exampleOdds">100</p>
        </div>
        <div className="shortOdds">
          Shorter odds
          <p className="exampleOdds">-110 &nbsp; &nbsp; &nbsp; -120</p>
        </div>
      </Overview>

      <BetTypes>
        <h2>Different Bet Types</h2>
        <p>
          When it comes to sports betting theres a wide variety of different
          bets you can make
        </p>
        <p> Lets learn about moneyline</p>
        <div className="getStarted">
          <Link href="/help/moneyline">Moneyline</Link>
        </div>
      </BetTypes>
    </Container>
  );
}

export default readingodds;
