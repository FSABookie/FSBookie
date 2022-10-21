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

    }

`

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

    @media only screen and (min-width: 850px) {
        a {
            padding: 2%;
        }
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

    @media only screen and (min-width: 850px) {
        img {
            display: none;
        }
        margin-bottom: 0;
        padding-top: 5%;

        a{
            padding: 2%;
        }
    }
`

function overunderbetting() {
  return (
    <Container>
    <Odds>
        <img src='https://media.istockphoto.com/photos/male-hand-holding-smartphone-in-black-background-picture-id1302676710?k=20&m=1302676710&s=612x612&w=0&h=UZYqF5VmYFN6KgqhT8LqMZQfJ6hQI69vcXx3QlD3t-I='/>
        <h1>
           OVER / UNDER
        </h1>
        <h3>
        Learn all about the over/under and how to bet on it.
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
        Over/Under
    </h2>
    <p className='moneylineInfo'>
    An over/under is a bet on the total amount of something to occur, either points in a game, points scored by a player, yards for a player, etc. Over/unders are also accompanied by odds (just like spreads) and are usually at or around -110 as well.
    </p>
    <p className='moneylineInfo'>
    Want to bet on Philadelphia’s running back total rushing yards? The ‘total’ will be set at an estimated value of say 82.5 yards, for example. If at the conclusion of the game, the Philadelphia running back gets to 83 or more yards, then that means the ‘Over’ wins and everyone rejoices.
    </p>
     
     

    </Overview>

    <BetTypes>
        <h2>
          Different Bet Types
        </h2>
        <p> Lets learn about Parlay betting and how to make a parlay</p>
        <div className="getStarted">
             <Link href='/help/parlay'>
                 Parlays
            </Link>
        </div>
    </BetTypes>
</Container>
  )
}

export default overunderbetting;