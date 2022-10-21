import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const Container = styled.div `
background-color:rgb(16,16,16);
color: white;
text-align: center;
font-family: 'Open Sans' sans-serif;
@media only screen and (min-width: 850px) {
    p {
        font-family: 'Open Sans' sans-serif;
        padding-left: 15%;
        padding-right: 15%;
    }
}
`

const Overview = styled.div `
    padding: 5%;
    font-size: 1.2em;
    padding-top: 6%;

    h2 {
        font-size: 1.6em;
        font-weight: 500;
    }

    p {
        font-size: 1.2em;
        font-weight: 300;
    }
    
    .moneylineInfo {
        text-align: left;
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
`;

const BetTypes = styled.div `
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
`
const Odds = styled.div `
    width: 100%;
    height: 75vh;
    margin-bottom: 20%;
    img {
        width: 100%;
        margin-top: 10%;
    }

    h1 {
        font-family: 'Saira Condensed', 'Open Sans', sans-serif;
        font-size: 2.25em;
        color: green;
    }

    h3 {
        font-weight: 400;
        font-size: 1.75em;
        padding: 2%;
    }
    
    a {
        background-color: green;
        padding: 4%;
        border-radius: 8px;
        font-weight: 650;
    }

    .signUp {
        padding-top: 6%;
    }

    p{
        font-size:1.3em;
    }
`

function parlay() {
  return (
    <Container>
    <Odds>
        <img src='https://media.istockphoto.com/photos/male-hand-holding-smartphone-in-black-background-picture-id1302676710?k=20&m=1302676710&s=612x612&w=0&h=UZYqF5VmYFN6KgqhT8LqMZQfJ6hQI69vcXx3QlD3t-I='/>
        <h1>
           PARLAYS
        </h1>
        <h3>
        Learn all about the parlays and how to place a parlay bet.
        </h3>
        <p>
         Already a pro? Sign up to get started betting!
        </p>

        <div className="signUp">
             <Link href='/signup'>
                 SIGN UP
            </Link>
        </div>
    </Odds>

    <Overview>
    <h2>
        Parlay
    </h2>
    <p className='moneylineInfo'>
    A &apos;Parlay&apos; bet is a bet placed on multiple outcomes to occur. For a Parlay bet to win, all outcomes within the Parlay must be selected correctly. The odds for each pick are multiplied by one another to determine the odds for the Parlay.
    </p>
    <p className='moneylineInfo'>
    For example, New England at -150 odds, parlayed with New York at +200 odds, would result in +400 odds. Wager $20 on the above two picks, see New England and New York BOTH win and you cash in with a cool $80 payout.
    </p>
     
     

    </Overview>

    <BetTypes>
        <h2>
          You're Ready To Bet!
        </h2>
        <p> Sign up now to place a bet</p>
        <div className="getStarted">
             <Link href='/signup'>
                 Sign Up Now
            </Link>
        </div>
    </BetTypes>
</Container>
  )
}

export default parlay;