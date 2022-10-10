import React, {useRef, useState} from 'react'
import styled from 'styled-components'

const SportsContainer = styled.div ` 
    width: 100%;
    max-width: 100%;
    height: 100%;
    background-color:black;
    padding: 3%
`
const SportsHeader = styled.div `
    margin-bottom: 15%;
    height: 100%;
    color: white;
    background: black;
    position:relative;
    display: flex;
    gap: 1%;
    a {
        position: relative;
        text-decoration: none;
        box-sizing: border-box;
        padding: 2% 4.25%;
        border: 1px solid #242424;
        border-radius: 50px;
        color: #ababab;
        background-color: #000;
        white-space: nowrap;
        font-size: 0.625em;
        line-height: 14px;
        font-weight: 600;
        font-family: "Saira Condensed",sans-serif;
        text-transform: uppercase;
        cursor: pointer;
        transition: all .16s ease;
        space
    }
`
const GamesContainer = styled.div ` 

`
const Games = styled.div `

`
const GameCard = styled.div `
  table {
    width: 100%;
    table-layout: fixed;
    border-collapse: separate;
    border-spacing: 0;
    padding: 8px;
    background-color: #121212;
  }
  thead {
    cursor: default;
  }
  th {
    color: #c5c5c5;
    font-size: 0.7em;
  }

  .alwaysleft {
    width: 40%;
    font-weight: 600;
    text-align: left;
  }
  .eventCellLink {
    width: 100%;
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;
    padding-left: 10px;
    text-decoration: none;
  }
  .gametitle {
    display: flex;
    align-items: center;
    text-align: unset;
  }
  .eventCell {
    width: 100%;
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;
    padding-left: 10px;
    text-decoration: none;
  }
  .gameInfo {
    border-top: 0.25em solid #242424;
    padding-top: 4%;
  }

  .team1 {
    font-size: 1.2em;
    color: white;
    margin-left: 10px;
  }
  .gameTime {
    font-size: 0.25em;
  }

  .teamInfo {
    margin-top: 0.5em;
    display: flex;

  }
  .imgContainer {
    img {
        height: 18px;
    }
  }

  .lineCol {
    border-top: 0.25em solid #242424;
    padding-top: 6%;
    font-size: .7em;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    position: relative;
    }

    .line2Col {
        font-size: .7em;
        box-sizing: border-box;
        height: 100%;
        width: 100%;
        position: relative; 
    }
  
  .line {
    color: white;
  }

  .lineodds {
    color: #00aa38;
  }

  .lineContainer {
    display: flex;
    padding: 2%;
    display: flex;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    gap: 0.5em;
    background-color: #242424;
    height: 48px;x
  }
`
  
function Sportsbook() {


  return (
   <SportsContainer>
     <SportsHeader>
        <a>
            FOOTBALL
        </a>
        <a>
            BASEBALL
        </a>
        <a>
            BASKETBALL
        </a>
        <a>
            HOCKEY
        </a>
     </SportsHeader>
     <GamesContainer>
        <Games>
            <GameCard>
                <table>
                    <thead>
                        <th className='alwaysleft gamelines'>
                            TODAY
                        </th>
                        <th className='gamelines'>
                            SPREAD
                        </th>
                        <th className='gamelines'>
                            TOTAL
                        </th>
                        <th className='gamelines'>
                            MONEYLINE
                        </th>
                    </thead>
                    <tbody>
                        <tr>
                            <th className='gameInfo'>
                                <a className='eventCellLink'>
                                    <div className='eventCell'>
                                        <div className='gameStatus'>
                                            <span className='gameTime'>
                                                8:15PM
                                            </span>
                                        </div>
                                        <div className='teamInfo'>
                                            <div className="imgContainer">
                                                <img src='https://sportsbook.draftkings.com/static/logos/teams/nfl/LV.png'/>
                                            </div>
                                            <a className='team1'>
                                                LV Raiders
                                            </a>
                                        </div>

                                    </div>
                                </a>
                            </th>
                            <td className='lineCol'>
                                <div className="lineContainer">
                                    <div className="line">
                                        +7
                                    </div>
                                    <div className="lineodds">
                                        -105
                                    </div>
                                </div>
                            </td>
                            <td className='lineCol'>
                            <div className="lineContainer">
                                    <div className="line">
                                        O 51.5
                                    </div>
                                    <div className="lineodds">
                                        -115
                                    </div>
                                </div>
                            </td>
                            <td className='lineCol'>
                            <div className="lineContainer">
                                    <div className="lineodds">
                                        +290
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th className='game2Info'>
                                <a className='eventCellLink'>
                                    <div className='eventCell'>
                                        <div className='gameStatus'>
                                        </div>
                                        <div className='teamInfo'>
                                            <div className="imgContainer">
                                                <img src='https://sportsbook.draftkings.com/static/logos/teams/nfl/KC.png'/>
                                            </div>
                                            <a className='team1'>
                                                KC Chiefs
                                            </a>
                                        </div>

                                    </div>
                                </a>
                            </th>
                            <td className='line2Col'>
                                <div className="lineContainer">
                                    <div className="line">
                                        -7
                                    </div>
                                    <div className="lineodds">
                                        -115
                                    </div>
                                </div>
                            </td>
                            <td className='line2Col'>
                            <div className="lineContainer">
                                    <div className="line">
                                        U 51.5
                                    </div>
                                    <div className="lineodds">
                                        -105
                                    </div>
                                </div>
                            </td>
                            <td className='line2Col'>
                            <div className="lineContainer">
                                    <div className="lineodds">
                                        -350
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </GameCard>
        </Games>
     </GamesContainer>
    </SportsContainer>
  )
}

export default Sportsbook