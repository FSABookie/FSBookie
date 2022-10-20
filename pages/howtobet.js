import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'


const Container = styled.div `
color: white;
text-align: center;
font-family: 'Open Sans' sans-serif;
@media only screen and (min-width: 850px) {
    p {
        font-family: 'Open Sans' sans-serif;
        padding-left: 15%;
        padding-right: 15%;
        font-size: 1.2em;
    }
}
`

const Overview = styled.div `
    padding: 3%;
    font-size: 1.2em;
`

const BetTypes = styled.div `
    margin-top: 5%;
    color: black;
    background-color: white;
    width: 100%;
    padding: 3%;
    font-size: 1.2em;
`

function howtobet() {
  return (
    <Container>
        <Overview>
        <h2>
        Sports Betting Overview
        </h2>
        <p>
            Sports betting comes in many different shapes and sizes. At its core, sports betting is putting money behind an outcome of your choice and getting paid if thatoutcome is achieved. If a bet is on the winner of a game, that is called a moneyline bet. If youre betting that a team will win or lose by a certain amount of points, that is called a spread bet. If you combine multiple outcomes into one bet, that is called a parlay.
        </p>
        <p>
        Moneylines, spreads, and parlays are the most common bets to choose from, but there are also prop bets which allow you to have a vested interest in more specific outcomes, like how many points a certain player will score. The world of sports betting is vast, and theres something for just about anyone.
        </p>
        <p>
        There are many reasons to bet on sports for new and experienced gamblers alike. Above all, it’s an easy way to add more excitement to your viewing experience, by giving you something more to root for. That’s rewarding in itself, regardless of the outcome.
        </p>
        </Overview>

        <BetTypes>
            <h2>
            Bet Types Explained
            </h2>
            <p>
            New to sports betting? One of the biggest hurdles for new bettors can be the seemingly endless list of phrases and terms. We’ve got you covered, with a beginner-level breakdown of the basics for each sport, that will help you get in on the action – and hopefully take home some cash!
            </p>
        </BetTypes>
    </Container>
  )
}

export default howtobet