import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import BetSlip from "../../../src/components/sports-components/betslipComponents/BetSlip";
import { addToBetSlip } from "../../../src/redux/slices/BetSlip-slice";
import {
  selectFirstHalf,
  selectFullGame,
  selectPeriod,
  selectQuarter,
  selectInning,
} from "../../../src/redux/slices/game-slice";
import Link from "next/link";
import { useGetActiveBetsQuery } from "../../../src/redux/slices/apiSlice";
import Head from "next/head";

const SingleGameContainer = styled.div`
  color: white;
  height: 100vh;
  width: 100%;
  padding: 1%;
  .eventSport {
    text-align: center;
    font-weight: 200;
    font-size: 0.75em;
    padding-bottom: 3%;
    border-bottom: 0.15em solid #242424;
    opacity: 0.8;
  }

  .MatchupContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 150px;
  }

  .team1 {
    text-align: center;
    font-weight: 200;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 150px;

    img {
      padding-bottom: 10px;
    }
  }

  .AT {
    font-size: 0.8em;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .headimg {
    width: 50px;
    height: 50px;
  }

  .gamecard {
    width: 100%;
    padding: 8px;
    height: 100%;
    background-color: #121212;
  }

  @media only screen and (min-width: 850px) {
    .team1 {
      width: 50%;
      text-align: center;
      img {
        padding-top: 2%;
      }
    }

    .team2 {
      width: 50%;
    }

    .MatchupContainer {
      width: 100%;
    }
  }
`;

const GamesHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  cursor: default;
  color: #c5c5c5;
  font-size: 0.7em;
  font-weight: 600;
  text-align: center;
  p {
    width: 150%;
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
    margin-left: 8px;
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

  .teamContainer {
    width: 100%;
    font-size: 12px;
    display: flex;
    align-items: center;
    padding-bottom: 5px;
    overflow: hidden;
    max-width: 100%;
    p {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  .oddType {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 12.5px;
  }
`;

const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  .gameInfo {
    width: 150%;
  }
  .game2Info {
    width: 150%;
  }
  .lineCol {
    font-size: 0.7em;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    position: relative;
  }

  .line2Col {
    font-size: 0.7em;
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    position: relative;
  }
`;

const SportsHeader = styled.div`
  height: 100%;
  color: white;
  background: black;
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  div {
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

const NoLinesContainer = styled.div`
  color: white;
`;

const Attempt = styled.div`
  .hideSlip {
    width: 0%;
    padding-left: 0;
  }
  @media only screen and (min-width: 850px) {
    display: flex;
    flex-direction: row;
    position: relative;
    padding-top: 15px;
    border-top: 1px inset;
    margin-top: 15px;
    /* padding-top: 10px; */
  }
`;

const Bs = styled.div`
  /* .hideSlip {
    width: 0% !important;
    background-color: purple;
    transition: 1s;
  } */
  transition: 1s;
  @media only screen and (min-width: 360px) {
    bottom: 0;
    position: sticky;
  }

  @media only screen and (min-width: 850px) {
    width: 350px;
    top: 0;
    display: flex;
    height: 100vh;
    position: sticky;
    padding-left: 5px;
    padding-bottom: 5px;
  }
`;

function GamePage() {
  const [d, setDate] = useState();
  const [t, setT] = useState();
  const [time, setTime] = useState();
  const {
    game,
    odds: odd,
    sport: sport,
    awayTeamLogo,
    homeTeamLogo,
  } = useSelector((state) => state.persistedGame);
  const { betSlip } = useSelector((state) => state.betSlip);
  const { data: activeGames, isLoading: betsLoading } = useGetActiveBetsQuery();

  const dispatch = useDispatch();

  useEffect(() => {
    console.log(betSlip);
    if (game) {
      setDate(new Date(game.MatchTime).toDateString());
      setT(
        new Date(game.MatchTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      );
      setTime(d + " " + t);
      console.log(odd);
    }
  }, [game, betSlip]);

  const trend = activeGames?.filter(
    (activeGame) => activeGame.betId === game.ID
  );
  console.log(trend);
  let bets = {};
  trend?.forEach((bet) => {
    if (Object.keys(bets).includes(bet.betId)) {
      if (!Object.keys(bets[bet.betId]).includes(bet.gameLine)) {
        bets[bet.betId][bet.gameLine] = 1;
      } else {
        bets[bet.betId][bet.gameLine] += 1;
      }
    } else {
      bets[bet.betId] = { [bet.gameLine]: 1 };
    }
  });
  console.log(trend);
  console.log(bets);

  return game && odd ? (
    <>
      <Head>
        <title>
          {game.AwayTeam} at {game.HomeTeam}
        </title>
      </Head>
      <SingleGameContainer>
        <Link href={`/sportsbook/NBA`}>
          <div>BASKETBALL / NBA</div>
        </Link>
        <div className="GameHeader">
          <div className="eventSport">{sport !== "index" && sport}</div>
          <div className="MatchupContainer">
            <div className="team1">
              <img src={awayTeamLogo} />
              {game.AwayTeam}
            </div>
            <div className="AT">AT</div>
            <div className="team1">
              <img src={homeTeamLogo} />
              {game.HomeTeam}
            </div>
          </div>
        </div>
        <div>
          <SportsHeader>
            <div onClick={() => dispatch(selectFullGame())}>Full Game</div>

            {game.Sport == 1 && (
              <div onClick={() => dispatch(selectFirstHalf())}>HALVES</div>
            )}

            {game.Sport == 1 && (
              <div onClick={() => dispatch(selectQuarter())}>QUARTERS</div>
            )}
            {game.Sport == 4 && (
              <div onClick={() => dispatch(selectFirstHalf())}>HALVES</div>
            )}

            {game.Sport == 4 && (
              <div onClick={() => dispatch(selectQuarter())}>QUARTERS</div>
            )}

            {game.Sport == 5 && (
              <div onClick={() => dispatch(selectPeriod())}>PERIOD</div>
            )}
            {game.Sport == 0 && (
              <div onClick={() => dispatch(selectInning())}>INNINGS</div>
            )}
          </SportsHeader>
        </div>
        <Attempt>
          <div className="gamecard">
            <GamesHeader>
              <p className="gamelines"></p>
              <p className="gamelines">SPREAD</p>
              <p className="gamelines">TOTAL</p>
              <p className="gamelines">MONEYLINE</p>
            </GamesHeader>
            {odd.length > 0 ? (
              odd.map((odd) => (
                <GameCard key={odd.ID}>
                  {odd.OddType.includes("Game") && <div>Full Game Lines</div>}
                  {odd.OddType.includes("Half") && <div>First Half Lines</div>}
                  <div>
                    {odd.OddType === "FirstQuarter" && "1st Quarter Lines"}
                  </div>
                  <div>
                    {odd.OddType === "SecondQuarter" && "2nd Quarter Lines"}
                  </div>
                  <div>
                    {odd.OddType === "ThirdQuarter" && "3rd Quarter Lines"}
                  </div>
                  <div>
                    {odd.OddType === "FourthQuarter" && "4th Quarter Lines"}
                  </div>
                  {/* {odd.oddType.includes("FirstQuarter") && <div>1Q Lines</div>}
                  {odd.oddType.includes("SecondQuarter") && <div>2Q Lines</div>}
                  {odd.oddType.includes("ThirdQuarter") && <div>3Q Lines</div>}
                  {odd.oddType.includes("FourthQuarter") && <div>4Q Lines</div>} */}
                  <TableRow>
                    {/* AWAY TEAM SPREAD!!!!!!!!!!! */}
                    <div className="teamContainer">
                      <p>{game.AwayTeam}</p>
                    </div>
                    <div className="lineCol">
                      {odd.PointSpreadAway == 0 ||
                      odd.PointSpreadAway == 0.0 ? (
                        <div className="lineContainer">N/A</div>
                      ) : (
                        <div
                          className="lineContainer"
                          onClick={() => {
                            dispatch(
                              addToBetSlip({
                                id: betSlip.length,
                                gameLine:
                                  game.AwayTeam + " " + odd.PointSpreadAway,
                                odds: odd.PointSpreadAwayLine,
                                teamToWin: "AwayTeam",
                                oddType: odd.OddType,
                                oddType: "Game",
                                awayTeam: game.AwayTeam,
                                homeTeam: game.HomeTeam,
                                awayTeamLogo: awayTeamLogo,
                                homeTeamLogo: homeTeamLogo,
                                time: time,
                                toWin: 0,
                                wager: 0,
                                betId: odd.ID,
                                betType: "spread",
                                spread: Number(odd.PointSpreadAway),
                                calc:
                                  odd.PointSpreadAway[0] === "-"
                                    ? "minus"
                                    : "plus",
                              })
                            );
                          }}
                        >
                          <div className="line">
                            {odd.PointSpreadAway[0] === "-"
                              ? odd.PointSpreadAway
                              : "+" + odd.PointSpreadAway}
                          </div>
                          <div className="lineodds">
                            {odd.PointSpreadAwayLine[0] === "-"
                              ? odd.PointSpreadAwayLine
                              : "+" + odd.PointSpreadAwayLine}
                          </div>
                        </div>
                      )}
                    </div>
                    {/* OVER!!!!!!!!!!! */}
                    <div className="lineCol">
                      {odd.PointSpreadAway == 0 ||
                      odd.PointSpreadAway == 0.0 ? (
                        <div className="lineContainer">N/A</div>
                      ) : (
                        <div
                          className="lineContainer"
                          onClick={() => {
                            dispatch(
                              addToBetSlip({
                                id: betSlip.length,
                                gaeLine: "Over " + odd.TotalNumber,
                                odds: odd.OverLine,
                                awayTeam: game.AwayTeam,
                                homeTeam: game.HomeTeam,
                                awayTeamLogo: awayTeamLogo,
                                homeTeamLogo: homeTeamLogo,
                                oddType: odd.OddType,
                                time,
                                toWin: 0,
                                wager: 0,
                                betId: odd.ID,
                                betType: "total",
                              })
                            );
                          }}
                        >
                          <div className="line">O {odd.TotalNumber}</div>
                          <div className="lineodds">
                            {odd.OverLine[0] === "-"
                              ? odd.OverLine
                              : "+" + odd.OverLine}
                          </div>
                        </div>
                      )}
                    </div>
                    {/* AWAY TEAM!!!!!!!!!!! */}
                    <div className="lineCol">
                      {odd.PointSpreadAway == 0 ||
                      odd.PointSpreadAway == 0.0 ? (
                        <div className="lineContainer">N/A</div>
                      ) : (
                        <div
                          className="lineContainer"
                          onClick={() => {
                            dispatch(
                              addToBetSlip({
                                id: betSlip.length,
                                gameLine: game.AwayTeam + " ML",
                                odds: odd.MoneyLineAway,
                                teamToWin: "AwayTeam",
                                awayTeam: game.AwayTeam,
                                homeTeam: game.HomeTeam,
                                awayTeamLogo: awayTeamLogo,
                                homeTeamLogo: homeTeamLogo,
                                oddType: "Game",
                                time,
                                toWin: 0,
                                wager: 0,
                                betId: odd.ID,
                                betType: "ML",
                              })
                            );
                          }}
                        >
                          <div className="lineodds">
                            {" "}
                            {odd.MoneyLineAway[0] === "-"
                              ? odd.MoneyLineAway
                              : "+" + odd.MoneyLineAway}
                          </div>
                        </div>
                      )}
                    </div>
                  </TableRow>
                  <TableRow>
                    {/* HOME TEAM SPREAD!!!!!!!!!!! */}
                    <div className="teamContainer">
                      <p>{game.HomeTeam}</p>
                    </div>
                    <div className="line2Col">
                      {odd.PointSpreadAway == 0 ||
                      odd.PointSpreadAway == 0.0 ? (
                        <div className="lineContainer">NA</div>
                      ) : (
                        <div
                          className="lineContainer"
                          onClick={() => {
                            dispatch(
                              addToBetSlip({
                                id: betSlip.length,
                                gameLine:
                                  game.HomeTeam + " " + odd.PointSpreadHome,
                                odds: odd.PointSpreadHomeLine,
                                teamToWin: "HomeTeam",
                                awayTeam: game.AwayTeam,
                                homeTeam: game.HomeTeam,
                                awayTeamLogo: awayTeamLogo,
                                homeTeamLogo: homeTeamLogo,
                                time,
                                oddType: "Game",
                                toWin: 0,
                                wager: 0,
                                betId: odd.ID,
                                betType: "spread",
                                spread: Number(odd.PointSpreadHome),
                                calc:
                                  odd.PointSpreadHome[0] === "-"
                                    ? "minus"
                                    : "plus",
                              })
                            );
                          }}
                        >
                          <div className="line">
                            {odd.PointSpreadHome[0] === "-"
                              ? odd.PointSpreadHome
                              : "+" + odd.PointSpreadHome}
                          </div>
                          <div className="lineodds">
                            {odd.PointSpreadHomeLine[0] === "-"
                              ? odd.PointSpreadHomeLine
                              : "+" + odd.PointSpreadHomeLine}
                          </div>
                        </div>
                      )}
                    </div>
                    {/* UNDER!!!!!!!!!!! */}
                    <div className="line2Col">
                      {odd.PointSpreadAway == 0 ||
                      odd.PointSpreadAway == 0.0 ? (
                        <div className="lineContainer">N/A</div>
                      ) : (
                        <div
                          className="lineContainer"
                          onClick={() => {
                            dispatch(
                              addToBetSlip({
                                id: betSlip.length,
                                gameLine: "Under " + odd.TotalNumber,
                                odds: odd.UnderLine,
                                awayTeam: game.AwayTeam,
                                homeTeam: game.HomeTeam,
                                awayTeamLogo: awayTeamLogo,
                                homeTeamLogo: homeTeamLogo,
                                oddType: "total",
                                time,
                                toWin: 0,
                                wager: 0,
                                betId: odd.ID,
                                betType: "total",
                              })
                            );
                          }}
                        >
                          <div className="line">U {odd.TotalNumber}</div>
                          <div className="lineodds">
                            {odd.UnderLine[0] === "-"
                              ? odd.UnderLine
                              : "+" + odd.UnderLine}
                          </div>
                        </div>
                      )}
                    </div>
                    {/* HOME TEAM ML!!!!!!!!!!! */}
                    <div className="line2Col">
                      {odd.PointSpreadAway == 0 ||
                      odd.PointSpreadAway == 0.0 ? (
                        <div className="lineContainer">N/A</div>
                      ) : (
                        <div
                          className="lineContainer"
                          onClick={() => {
                            dispatch(
                              addToBetSlip({
                                id: betSlip.length,
                                gameLine: game.HomeTeam + " ML",
                                odds: odd.MoneyLineHome,
                                team: game.HomeTeam,
                                awayTeam: game.AwayTeam,
                                homeTeam: game.HomeTeam,
                                awayTeamLogo: awayTeamLogo,
                                homeTeamLogo: homeTeamLogo,
                                teamToWin: "HomeTeam",
                                oddType: "Game",
                                time,
                                toWin: 0,
                                wager: 0,
                                betId: odd.ID,
                                betType: "ML",
                              })
                            );
                          }}
                        >
                          <div className="lineodds">
                            {odd.MoneyLineHome[0] === "-"
                              ? odd.MoneyLineHome
                              : "+" + odd.MoneyLineHome}
                          </div>
                        </div>
                      )}
                    </div>
                  </TableRow>
                </GameCard>
              ))
            ) : (
              <NoLinesContainer>Check Back Later for Lines!</NoLinesContainer>
            )}
          </div>
          <Bs className={!betSlip.length ? "hideSlip" : ""}>
            {betSlip.length > 0 && <BetSlip />}
          </Bs>
        </Attempt>
      </SingleGameContainer>
      {/* {betSlip.length > 0 && <BetSlip />} */}
    </>
  ) : (
    <div> No Lines Available</div>
  );
}

export default GamePage;
