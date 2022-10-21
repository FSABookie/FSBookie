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
    padding: 3%;
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

    .exampleContainer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1.2em;

        .div1 {
            display: flex;
            flex-direction: row;
            justify-content: center;

            .team {
                padding: 3%;
            }
            .spread {
                background-color: #242424;
                padding: 3%;
                border:2px solid #242424;
                margin-left: 3%;
            }
            .odds {
                background-color: #242424;
                padding: 3%;
                border:2px solid #242424;
                color: green;
            }
        }

        .div2 {
            display: flex;
            flex-direction: row;
            justify-content: center;

            .team {
                padding: 3%;
            }
            .spread {
                background-color: #242424;
                padding: 3%;
                border:2px solid #242424;
                margin-left: 2%;
            }
            .odds {
                background-color: #242424;
                padding: 3%;
                border:2px solid #242424;
                color: green;
            }
        }

        .result {
            color: green;
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

function spreadbetting() {
  return (
    <Container>
    <Odds>
        <img src='https://media.istockphoto.com/photos/male-hand-holding-smartphone-in-black-background-picture-id1302676710?k=20&m=1302676710&s=612x612&w=0&h=UZYqF5VmYFN6KgqhT8LqMZQfJ6hQI69vcXx3QlD3t-I='/>
        <h1>
           SPREAD BETTING
        </h1>
        <h3>
        Learn all about the point spread and how to bet on it.
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
        Spread Betting
    </h2>
    <p className='moneylineInfo'>
    Point spreads (also referred to as lines or handicaps) are also accompanied by odds. Most point spreads will have odds at or around -110.
    </p>
    <p className='moneylineInfo'>
    For example, if Indiana and Chicago are playing a basketball game and the line is -5.5 for Indiana, they would need to win by 6 or more points to ‘cover.’ If Indiana wins 105-100, bets on them to cover would lose.
    </p>
     
     <div className="exampleContainer">
        <div className="div1">
            <div className="team">
                Indiana
            </div>
            <div className="spread">
                -5.5
            </div>
            <div className="odds">
                -110
            </div>
        </div>
        <div className="div2">
             <div className="team">
                Chicago
            </div>
            <div className="spread">
                +5.5
            </div>
            <div className="odds">
                -110
            </div>           
        </div>
        <div className="div3">
            <div className="condition">
                Indiana winning by 6 or more:
            </div>
            <div className="result">
                Indiana covers the spread
            </div>
        </div>
     </div>

    </Overview>

    <BetTypes>
        <h2>
          Different Bet Types
        </h2>
        <p> Lets learn about Over/Under betting</p>
        <div className="getStarted">
             <Link href='/help/overunderbetting'>
                 Over/Under
            </Link>
        </div>
    </BetTypes>
</Container>
  )
}

export default spreadbetting;