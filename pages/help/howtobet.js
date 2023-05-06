import React from "react";
import Link from "next/link";
import styled from "styled-components";
import Head from "next/head";

const Container = styled.div`
  background-color: rgb(16, 16, 16);
  color: white;
  text-align: center;
  font-family: "Open Sans" sans-serif;
  padding: 4%;
  p {
    text-align: left;
  }
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
    font-size: 1.75em;
  }

  p {
    font-size: 1.2em;
    font-weight: 300;
  }

  @media only screen and (min-width: 850px) {
    padding-top: 4%;
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
    padding: 3%;
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
    padding: 3%;
    border-radius: 8px;
    font-weight: 650;
  }

  .signUp {
    padding-top: 6%;
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

function howtobet() {
  return (
    <Container>
      <Head>
        <title>How To Bet</title>
      </Head>
      <Odds>
        <img src="https://media.istockphoto.com/photos/male-hand-holding-smartphone-in-black-background-picture-id1302676710?k=20&m=1302676710&s=612x612&w=0&h=UZYqF5VmYFN6KgqhT8LqMZQfJ6hQI69vcXx3QlD3t-I=" />
        <h1>HOW TO BET 101: SPORTS BETTING EXPLAINED</h1>
        <h3>
          Ready to get started betting on sports with our Sportsbook? Good!
        </h3>

        <div className="signUp">
          <Link href="/signup">SIGN ME UP</Link>
        </div>
      </Odds>

      <Overview>
        <h2>Sports Betting Overview</h2>
        <p>
          Sports betting comes in many different shapes and sizes. At its core,
          sports betting is putting money behind an outcome of your choice and
          getting paid if thatoutcome is achieved. If a bet is on the winner of
          a game, that is called a moneyline bet. If youre betting that a team
          will win or lose by a certain amount of points, that is called a
          spread bet. If you combine multiple outcomes into one bet, that is
          called a parlay.
        </p>
        <p>
          Moneylines, spreads, and parlays are the most common bets to choose
          from, but there are also prop bets which allow you to have a vested
          interest in more specific outcomes, like how many points a certain
          player will score. The world of sports betting is vast, and theres
          something for just about anyone.
        </p>
        <p>
          There are many reasons to bet on sports for new and experienced
          gamblers alike. Above all, it’s an easy way to add more excitement to
          your viewing experience, by giving you something more to root for.
          That’s rewarding in itself, regardless of the outcome.
        </p>
      </Overview>

      <BetTypes>
        <h2>Bet Types Explained</h2>
        <p>
          New to sports betting? One of the biggest hurdles for new bettors can
          be the seemingly endless list of phrases and terms. We’ve got you
          covered, with a beginner-level breakdown of the basics for each sport,
          that will help you get in on the action – and hopefully take home some
          cash!
        </p>
        <div className="getStarted">
          <Link href="/help/readingodds">GET STARTED</Link>
        </div>
      </BetTypes>
    </Container>
  );
}

export default howtobet;
