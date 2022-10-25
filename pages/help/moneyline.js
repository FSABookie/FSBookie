import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const Container = styled.div `
background-color:rgb(16,16,16);
color: white;
text-align: center;
font-family: 'Open Sans' sans-serif;
padding: 4%;
@media only screen and (min-width: 850px) {
    p {
        font-family: 'Open Sans' sans-serif;
        padding-left: 15%;
        padding-right: 15%;
    }
}
`

const Overview = styled.div `
    padding: 3%;
    font-size: 1.2em;
    padding-top: 25%;

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

    .exampleContainer {
        display: flex;
        flex-direction: column;
        row-gap: 15%;
        padding: 12%;
    }

    .example1 {
       background-color: #242424;
    }

    .example2 {
        background-color: #242424;
    }

    .winnings {
        display: flex;
        flex-direction: row;
        column-gap: 2%;
        justify-content: center;
    }

    .winAmnt {
        color: green;
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

function moneyline() {
  return (
    <Container>
    <Odds>
        <img src='https://media.istockphoto.com/photos/male-hand-holding-smartphone-in-black-background-picture-id1302676710?k=20&m=1302676710&s=612x612&w=0&h=UZYqF5VmYFN6KgqhT8LqMZQfJ6hQI69vcXx3QlD3t-I='/>
        <h1>
           MONEYLINE
        </h1>
        <h3>
        Learn all about what the moneyline is and how to bet on it.
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
    Moneyline
    </h2>
    <p className='moneylineInfo'>
    A moneyline is simply a bet type that only includes Odds, as in “Odds to win”.
    </p>
    <p className='moneylineInfo'>
    Example: a moneyline of +150, is just +150 odds ($100 to win $150) for the listed team to win. A moneyline of -150 is just -150 odds ($150 to win $100) for the listed team to win.
    </p>

    <div className="exampleContainer">
        <div className="example1">
            <div className="top">
                <p>
                    Miami &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; +150
                </p>
            </div>
            <div className="bottom">
                <p>
                    MONEY LINE &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 100.00
                </p>
            </div>
        </div>
            <div className='winnings'>
                 <p> Potential winnings:</p>
                 <p className='winAmnt'>$150</p>
            </div>
        <div className="example2">
            <div className="top">
                <p>
                    New York &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; -150
                </p>
            </div>
            <div className="bottom">
                <p>
                    MONEY LINE &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 150.00
                </p>
            </div>
        </div>
            <div className='winnings'>
                 <p> Potential winnings:</p>
                 <p className='winAmnt'>$100</p>
            </div>
    </div>

    </Overview>

    <BetTypes>
        <h2>
          Different Bet Types
        </h2>
        <p> Lets learn about Spread Betting</p>
        <div className="getStarted">
             <Link href='/help/spreadbetting'>
                 Spread
            </Link>
        </div>
    </BetTypes>
</Container>
  )
}

export default moneyline;