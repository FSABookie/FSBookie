import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addToBetSlip } from "../redux/slices/BetSlip-slice";
import { selectGame } from "../redux/slices/game-slice";
import BetSlip from "./sports-components/betslipComponents/BetSlip";

const SportsContainer = styled.div`
  width: 100%;
  max-width: 100%;
  height: 100%;
  background-color: black;
  padding-top: 3%;
  padding-left: 3%;
  padding-right: 3%;
`;
const SportsHeader = styled.div`
  margin-bottom: 15%;
  height: 100%;
  color: white;
  background: black;
  position: relative;
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
    font-family: "Saira Condensed", sans-serif;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.16s ease;
  }
`;
const GamesContainer = styled.div``;
const Games = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 0;
  padding: 8px;
  background-color: #121212;

  .alwaysleft {
    width: 40%;
    font-weight: 600;
    text-align: left;
  }
`;
const GameCard = styled.div`
  color: white;
  border-top: 0.1em solid #242424;
  padding-bottom: 0.5em;
  padding-top: 0.5em;

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

  .team1 {
    font-size: 0.9em;
    color: white;
    margin-left: 10px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    max-width: 100px;
    min-width: 100px;
  }
  .gameTime {
    font-size: 0.1em;
  }

  .teamInfo {
    margin-top: 0.5em;
    display: flex;
    overflow: hidden;
  }
  .imgContainer {
    img {
      height: 18px;
    }
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
    margin: 1px;
    display: flex;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    gap: 0.5em;
    background-color: #242424;
    height: 48px;
    color: white;
  }
`;

const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  .gameInfo {
    /* border-top: 0.25em solid #242424; */
    /* padding-top: 4%; */
    /* flex-grow: 2; */
    width: 150%;
  }
  .game2Info {
    /* padding-top: 4%; */
    /* flex-grow: 2; */
    width: 150%;
  }
  .lineCol {
    /* border-top: 0.25em solid #242424; */
    /* padding-top: 6%; */
    font-size: 0.7em;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    position: relative;
    /* flex-grow: 1; */
  }

  .line2Col {
    font-size: 0.7em;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    position: relative;
  }
`;

const GamesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: default;
  color: #c5c5c5;
  font-size: 0.7em;
`;

function Sportsbook({ data }) {
  const dispatch = useDispatch();
  const { betSlip } = useSelector((state) => state.betSlip);

  return (
    <SportsContainer>
      <SportsHeader>
        <Link href="/sportsbook/NFL">
          <a>Football</a>
        </Link>
        <Link href="/sportsbook/NBA">
          <a>Basketball</a>
        </Link>
        <Link href="/sportsbook/NHL">
          <a>Hockey</a>
        </Link>
        <Link href="/sportsbook/MLB">
          <a>Baseball</a>
        </Link>
      </SportsHeader>
      <GamesContainer>
        <Games>
          <GamesHeader>
            <p className="alwaysleft gamelines">TODAY</p>
            <p className="gamelines">SPREAD</p>
            <p className="gamelines">TOTAL</p>
            <p className="gamelines">MONEYLINE</p>
          </GamesHeader>
          {data.data &&
            data.data.map((ele) => {
              let d = new Date(ele.MatchTime).toDateString();
              let t = new Date(ele.MatchTime).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
              // MUST FIX THE TIME
              let time = d + " " + t;
              let apiId = ele.ID;
              const event = ele;
              return (
                <GameCard key={apiId}>
                  <TableRow>
                    <Link
                      href={{
                        pathname: `/sportsbook/games/[id]`,
                        query: {
                          sport: data.sport,
                          id: apiId,
                        },
                      }}
                      as={`/sportsbook/games/${ele.AwayTeam}&${ele.HomeTeam}`}
                      key={apiId}
                    >
                      <div className="gameInfo">
                        {/* <div className='eventCell'> */}
                        <div className="gameTime">{time}</div>
                        <div
                          className="teamInfo"
                          onClick={() => dispatch(selectGame(event))}
                        >
                          <div className="imgContainer">
                            <img src="https://sportsbook.draftkings.com/static/logos/teams/nfl/LV.png" />
                          </div>
                          <div className="team1">{ele.AwayTeam}</div>
                        </div>
                        {/* </div> */}
                      </div>
                    </Link>
                    {/* AWAY TEAM SPREAD!!!!!!!!!!! */}
                    <div className="lineCol">
                      {ele.Odds[0].PointSpreadAway == 0 ||
                      ele.Odds[0].PointSpreadAway == 0.0 ? (
                        <div className="lineContainer">N/A</div>
                      ) : (
                        <div
                          className="lineContainer"
                          onClick={() => {
                            dispatch(
                              addToBetSlip({
                                id: betSlip.length,
                                gameLine:
                                  ele.AwayTeam +
                                  " " +
                                  ele.Odds[0].PointSpreadAway,
                                odds: ele.Odds[0].PointSpreadAwayLine,
                                team: ele.AwayTeam,
                                teams: ele.AwayTeam + " @ " + ele.HomeTeam,
                                time: time,
                                toWin: 0,
                                wager: 0,
                                betId: apiId,
                              })
                            );
                          }}
                        >
                          <div className="line">
                            {ele.Odds[0].PointSpreadAway[0] === "-"
                              ? ele.Odds[0].PointSpreadAway
                              : "+" + ele.Odds[0].PointSpreadAway}
                          </div>
                          <div className="lineodds">
                            {ele.Odds[0].PointSpreadAwayLine[0] === "-"
                              ? ele.Odds[0].PointSpreadAwayLine
                              : "+" + ele.Odds[0].PointSpreadAwayLine}
                          </div>
                        </div>
                      )}
                    </div>
                    {/* OVER!!!!!!!!!!! */}
                    <div className="lineCol">
                      {ele.Odds[0].PointSpreadAway == 0 ||
                      ele.Odds[0].PointSpreadAway == 0.0 ? (
                        <div className="lineContainer">N/A</div>
                      ) : (
                        <div
                          className="lineContainer"
                          onClick={() => {
                            dispatch(
                              addToBetSlip({
                                id: betSlip.length,
                                gameLine: "Over " + ele.Odds[0].TotalNumber,
                                odds: ele.Odds[0].OverLine,
                                teams: ele.AwayTeam + " @ " + ele.HomeTeam,
                                time,
                                toWin: 0,
                                wager: 0,
                                betId: apiId,
                              })
                            );
                          }}
                        >
                          <div className="line">
                            O {ele.Odds[0].TotalNumber}
                          </div>
                          <div className="lineodds">
                            {ele.Odds[0].OverLine[0] === "-"
                              ? ele.Odds[0].OverLine
                              : "+" + ele.Odds[0].OverLine}
                          </div>
                        </div>
                      )}
                    </div>
                    {/* AWAY TEAM!!!!!!!!!!! */}
                    <div className="lineCol">
                      {ele.Odds[0].PointSpreadAway == 0 ||
                      ele.Odds[0].PointSpreadAway == 0.0 ? (
                        <div className="lineContainer">N/A</div>
                      ) : (
                        <div
                          className="lineContainer"
                          onClick={() => {
                            dispatch(
                              addToBetSlip({
                                id: betSlip.length,
                                gameLine: ele.AwayTeam + " ML",
                                odds: ele.Odds[0].MoneyLineAway,
                                team: ele.AwayTeam,
                                teams: ele.AwayTeam + " @ " + ele.HomeTeam,
                                time,
                                toWin: 0,
                                wager: 0,
                                betId: apiId,
                              })
                            );
                          }}
                        >
                          <div className="lineodds">
                            {" "}
                            {ele.Odds[0].MoneyLineAway[0] === "-"
                              ? ele.Odds[0].MoneyLineAway
                              : "+" + ele.Odds[0].MoneyLineAway}
                          </div>
                        </div>
                      )}
                    </div>
                  </TableRow>
                  <TableRow>
                    <div className="game2Info">
                      {/* <div className='eventCell'> */}
                      <div className="gameStatus"></div>
                      <div className="teamInfo">
                        <div className="imgContainer">
                          <img src="https://sportsbook.draftkings.com/static/logos/teams/nfl/KC.png" />
                        </div>
                        <a className="team1">{ele.HomeTeam}</a>
                      </div>
                      {/* </div> */}
                    </div>
                    {/* HOME TEAM SPREAD!!!!!!!!!!! */}
                    <div className="line2Col">
                      {ele.Odds[0].PointSpreadAway == 0 ||
                      ele.Odds[0].PointSpreadAway == 0.0 ? (
                        <div className="lineContainer">NA</div>
                      ) : (
                        <div
                          className="lineContainer"
                          onClick={() => {
                            dispatch(
                              addToBetSlip({
                                id: betSlip.length,
                                gameLine:
                                  ele.HomeTeam +
                                  " " +
                                  ele.Odds[0].PointSpreadHome,
                                odds: ele.Odds[0].PointSpreadHomeLine,
                                team: ele.HomeTeam,
                                teams: ele.AwayTeam + " @ " + ele.HomeTeam,
                                time,
                                toWin: 0,
                                wager: 0,
                                betId: apiId,
                              })
                            );
                          }}
                        >
                          <div className="line">
                            {ele.Odds[0].PointSpreadHome[0] === "-"
                              ? ele.Odds[0].PointSpreadHome
                              : "+" + ele.Odds[0].PointSpreadHome}
                          </div>
                          <div className="lineodds">
                            {ele.Odds[0].PointSpreadHomeLine[0] === "-"
                              ? ele.Odds[0].PointSpreadHomeLine
                              : "+" + ele.Odds[0].PointSpreadHomeLine}
                          </div>
                        </div>
                      )}
                    </div>
                    {/* UNDER!!!!!!!!!!! */}
                    <div className="line2Col">
                      {ele.Odds[0].PointSpreadAway == 0 ||
                      ele.Odds[0].PointSpreadAway == 0.0 ? (
                        <div className="lineContainer">N/A</div>
                      ) : (
                        <div
                          className="lineContainer"
                          onClick={() => {
                            dispatch(
                              addToBetSlip({
                                id: betSlip.length,
                                gameLine: "Under " + ele.Odds[0].TotalNumber,
                                odds: ele.Odds[0].UnderLine,
                                teams: ele.AwayTeam + " @ " + ele.HomeTeam,
                                time,
                                toWin: 0,
                                wager: 0,
                                betId: apiId,
                              })
                            );
                          }}
                        >
                          <div className="line">
                            U {ele.Odds[0].TotalNumber}
                          </div>
                          <div className="lineodds">
                            {ele.Odds[0].UnderLine[0] === "-"
                              ? ele.Odds[0].UnderLine
                              : "+" + ele.Odds[0].UnderLine}
                          </div>
                        </div>
                      )}
                    </div>
                    {/* HOME TEAM ML!!!!!!!!!!! */}
                    <div className="line2Col">
                      {ele.Odds[0].PointSpreadAway == 0 ||
                      ele.Odds[0].PointSpreadAway == 0.0 ? (
                        <div className="lineContainer">N/A</div>
                      ) : (
                        <div
                          className="lineContainer"
                          onClick={() => {
                            dispatch(
                              addToBetSlip({
                                id: betSlip.length,
                                gameLine: ele.HomeTeam + " ML",
                                odds: ele.Odds[0].MoneyLineHome,
                                team: ele.HomeTeam,
                                teams: ele.AwayTeam + " @ " + ele.HomeTeam,
                                time,
                                toWin: 0,
                                wager: 0,
                                betId: apiId,
                              })
                            );
                          }}
                        >
                          <div className="lineodds">
                            {ele.Odds[0].MoneyLineHome[0] === "-"
                              ? ele.Odds[0].MoneyLineHome
                              : "+" + ele.Odds[0].MoneyLineHome}
                          </div>
                        </div>
                      )}
                    </div>
                  </TableRow>
                </GameCard>
              );
            })}
        </Games>
      </GamesContainer>
      {betSlip.length > 0 && <BetSlip />}
    </SportsContainer>
  );
}

export default Sportsbook;
