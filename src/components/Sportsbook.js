import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  NBAlogos,
  NHLlogos,
  MLBlogos,
  NFLlogos,
  allLogos,
} from "../../public/teamLogos";
import { convertUTCtoEST } from "../functions/TimeCoverter";
import { addToBetSlip } from "../redux/slices/BetSlip-slice";
import { selectGame } from "../redux/slices/game-slice";
import BetSlip from "./sports-components/betslipComponents/BetSlip";
import ImageCarousel from "./sports-components/betslipComponents/ImageCarousel";

const SportsContainer = styled.div`
  @media only screen and (min-width: 360px) {
    width: 100%;
    max-width: 100%;
    height: 100%;
    background-color: black;
    padding-top: 3%;
    padding-left: 1%;
    padding-right: 1%;
  }
`;

const CarouselCont = styled.div`
  display: flex;
  justify-content: center;
`;

const SportsHeader = styled.div`
  @media only screen and (min-width: 850px) {
    margin-bottom: 2%;
    height: 40%;

    .sport {
      padding: 1% 2%;
    }
  }
  @media only screen and (max-width: 850px) {
    gap: 1%;
  }
  margin-bottom: 5%;
  height: 100%;
  color: white;
  background: black;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5%;
  a {
    display: flex;
    justify-content: center;
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
    width: 10em;
    @media only screen and (max-width: 850px) {
      width: 24vw;
    }
  }
`;
const GamesContainer = styled.div`
  height: 100%;
  @media only screen and (min-width: 850px) {
    width: 100%;
    padding-top: 10px;
  }
`;
const Games = styled.div`
  ${
    "" /* @media only screen and (min-width: 850px) {
    width: 55%;
    margin-left: 20%;
  } */
  }
  display: flex;
  flex-direction: column;
  width: 100%;
  table-layout: fixed;
  border-collapse: separate;
  border-spacing: 0;
  padding: 8px;
  background-color: #121212;
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
    /* white-space: nowrap; */
    max-width: 100%;
    /* min-width: 100px; */
  }
  .gameTime {
    font-size: 0.1em;
  }

  .teamInfo {
    margin-top: 0.5em;
    display: flex;
    overflow: hidden;
  }
  .team2Info {
    margin-top: 0;
    display: flex;
    overflow: hidden;
  }
  .imgContainer {
    @media (max-width: 500px) {
      display: none;
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
  .selected {
    background-color: #545353 !important;
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
    overflow: hidden;
    width: 100%;
    min-width: 100px;
  }
  .game2Info {
    /* padding-top: 4%; */
    /* flex-grow: 2; */
    overflow: hidden;
    width: 100%;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    min-width: 100px;
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
  justify-content: space-around;
  cursor: default;
  color: #c5c5c5;
  font-size: 0.7em;
  font-weight: 600;
  text-align: center;
  .gamelines {
    width: 100%;
  }
`;

const Header = styled.div`
  color: white;
  text-align: center;
  font-size: 1.25em;
  border-bottom: 1.5px solid #d3d5d5;
  padding-bottom: 1em;
  margin-left: 10%;
  margin-right: 10%;
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
    padding-top: 10px;
    padding-left: 5px;
    padding-bottom: 5px;
  }
`;

const AvailableLines = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 7%;
  p {
    margin: 0;
    font-size: 1.5em;
    font-weight: 500;
  }
`;

function Sportsbook({ data }) {
  const dispatch = useDispatch();
  const { betSlip } = useSelector((state) => state.betSlip);
  const { localGames } = useSelector((state) => state.localGames);

  // useEffect(() => {
  //   localGames?.length && console.log(data, localGames);
  //   console.log("DATA", data.data, "SPORT", data.sport);
  // }, []);

  return (
    <SportsContainer>
      <CarouselCont>
        <ImageCarousel />
      </CarouselCont>
      <SportsHeader>
        <Link href="/sportsbook/NFL" className="sport">
          Football
        </Link>
        <Link href="/sportsbook/NBA" className="sport">
          Basketball
        </Link>
        <Link href="/sportsbook/NHL" className="sport">
          Hockey
        </Link>
        <Link href="/sportsbook/MLB" className="sport">
          Baseball
        </Link>
      </SportsHeader>
      {data.sport === "index" && <Header>Your Local Games</Header>}
      {data.sport === "NBA" && <Header>NBA</Header>}
      {data.sport === "NFL" && <Header>NFL</Header>}
      {data.sport === "NHL" && <Header>NHL</Header>}
      {data.sport === "MLB" && <Header>MLB</Header>}
      <Attempt>
        <GamesContainer>
          <Games>
            <GamesHeader>
              <p className="gamelines">TODAY</p>
              <p className="gamelines">SPREAD</p>
              <p className="gamelines">TOTAL</p>
              <p className="gamelines">MONEYLINE</p>
            </GamesHeader>
            {(data.data.length > 0 && data.sport !== "index"
              ? data.data
              : data.data.length > 0
              ? localGames.flat()
              : []
            ).map((ele, idx) => {
              {
                /* let d = new Date(ele.MatchTime).toDateString();
                let t = new Date(ele.MatchTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                // MUST FIX THE TIME
                let time = d + " " + t; */
              }
              let time = convertUTCtoEST(ele.MatchTime);
              let apiId = ele.ID;
              const event = ele.Odds.filter((odd) => odd.OddType === "Game")[0];
              let homeTeamLogo;
              let awayTeamLogo;
              if (data.sport === "NBA") {
                awayTeamLogo = NBAlogos.filter(
                  (name) => name.team === ele.AwayTeam
                )[0]?.logo;
                homeTeamLogo = NBAlogos.filter(
                  (name) => name.team === ele.HomeTeam
                )[0]?.logo;
              }
              if (data.sport === "NFL") {
                awayTeamLogo = NFLlogos.filter(
                  (name) => name.team === ele.AwayTeam
                )[0]?.logo;
                homeTeamLogo = NFLlogos.filter(
                  (name) => name.team === ele.HomeTeam
                )[0]?.logo;
              }
              if (data.sport === "MLB") {
                awayTeamLogo = MLBlogos.filter(
                  (name) => name.team === ele.AwayTeam
                )[0]?.logo;
                homeTeamLogo = MLBlogos.filter(
                  (name) => name.team === ele.HomeTeam
                )[0]?.logo;
              }
              if (data.sport === "NHL") {
                awayTeamLogo = NHLlogos.filter(
                  (name) => name.team === ele.AwayTeam
                )[0]?.logo;
                homeTeamLogo = NHLlogos.filter(
                  (name) => name.team === ele.HomeTeam
                )[0]?.logo;
              }
              if (data.sport === "index") {
                awayTeamLogo = allLogos.filter(
                  (name) => name.team === ele.AwayTeam
                )[0]?.logo;
                homeTeamLogo = allLogos.filter(
                  (name) => name.team === ele.HomeTeam
                )[0]?.logo;
              }
              return (
                <GameCard key={idx}>
                  <TableRow>
                    <Link
                      className="gameInfo"
                      href={{
                        pathname: `/sportsbook/games/[id]`,
                        query: {
                          sport: data.sport,
                          id: apiId,
                        },
                      }}
                      as={`/sportsbook/games/${ele.AwayTeam}&${ele.HomeTeam}`}
                      // key={apiId}
                    >
                      <div className="gameTime">{time}</div>
                      <div
                        className="teamInfo"
                        onClick={() =>
                          dispatch(
                            selectGame({
                              game: ele,
                              sport: data.sport,
                              atl: awayTeamLogo,
                              htl: homeTeamLogo,
                            })
                          )
                        }
                      >
                        <div className="imgContainer">
                          <Image
                            src={awayTeamLogo}
                            width={18}
                            height={18}
                            alt="AwayTeam Icon"
                          />
                        </div>
                        <div className="team1">{ele.AwayTeam}</div>
                      </div>
                    </Link>
                    {/* AWAY TEAM SPREAD!!!!!!!!!!! */}
                    <div className="lineCol">
                      {event.PointSpreadAway == 0 ? (
                        <div className="lineContainer">N/A</div>
                      ) : (
                        <div
                          className={`lineContainer ${
                            betSlip.find(
                              (bet) =>
                                bet.betId === ele.ID &&
                                bet.teamToWin === "AwayTeam" &&
                                bet.betType === "spread"
                            ) !== undefined
                              ? "selected"
                              : ""
                          }`}
                          onClick={() => {
                            dispatch(
                              addToBetSlip({
                                id: betSlip.length,
                                gameLine:
                                  ele.AwayTeam + " " + event.PointSpreadAway,
                                odds: event.PointSpreadAwayLine,
                                teamToWin: "AwayTeam",
                                oddType: "Game",
                                awayTeam: ele.AwayTeam,
                                homeTeam: ele.HomeTeam,
                                awayTeamLogo: awayTeamLogo,
                                homeTeamLogo: homeTeamLogo,
                                time: time,
                                toWin: 0,
                                wager: 0,
                                betId: event.ID,
                                betType: "spread",
                                spread: Number(event.PointSpreadAway),
                                calc:
                                  event.PointSpreadAway[0] === "-"
                                    ? "minus"
                                    : "plus",
                              })
                            );
                          }}
                        >
                          <div className="line">
                            {event.PointSpreadAway[0] === "-"
                              ? event.PointSpreadAway
                              : "+" + event.PointSpreadAway}
                          </div>
                          <div className="lineodds">
                            {event.PointSpreadAwayLine[0] === "-"
                              ? event.PointSpreadAwayLine
                              : "+" + event.PointSpreadAwayLine}
                          </div>
                        </div>
                      )}
                    </div>
                    {/* OVER!!!!!!!!!!! */}
                    <div className="lineCol">
                      {event.OverLine == 0 || event.OverLine == 0.0 ? (
                        <div className="lineContainer">N/A</div>
                      ) : (
                        <div
                          className={`lineContainer ${
                            betSlip.find(
                              (bet) =>
                                bet.betId === ele.ID &&
                                bet.gameLine.includes("Over") &&
                                bet.betType === "total"
                            ) !== undefined
                              ? "selected"
                              : ""
                          }`}
                          onClick={() => {
                            dispatch(
                              addToBetSlip({
                                id: betSlip.length,
                                gameLine: "Over " + event.TotalNumber,
                                odds: event.OverLine,
                                awayTeam: ele.AwayTeam,
                                homeTeam: ele.HomeTeam,
                                awayTeamLogo: awayTeamLogo,
                                homeTeamLogo: homeTeamLogo,
                                oddType: ele.OddType,
                                teamToWin: "AwayTeam",
                                oddType: "Game",
                                time,
                                toWin: 0,
                                wager: 0,
                                betId: event.ID,
                                betType: "total",
                              })
                            );
                          }}
                        >
                          <div className="line">O {event.TotalNumber}</div>
                          <div className="lineodds">
                            {event.OverLine[0] === "-"
                              ? event.OverLine
                              : "+" + event.OverLine}
                          </div>
                        </div>
                      )}
                    </div>
                    {/* AWAY TEAM!!!!!!!!!!! */}
                    <div className="lineCol">
                      {event.MoneyLineAway == "0" ||
                      event.MoneyLineAway == "0.0" ? (
                        <div className="lineContainer">N/A</div>
                      ) : (
                        <div
                          className={`lineContainer ${
                            betSlip.find(
                              (bet) =>
                                bet.betId === ele.ID &&
                                bet.teamToWin === "AwayTeam" &&
                                bet.betType === "ML"
                            ) !== undefined
                              ? "selected"
                              : ""
                          }`}
                          onClick={() => {
                            dispatch(
                              addToBetSlip({
                                id: betSlip.length,
                                gameLine: ele.AwayTeam + " ML",
                                odds: event.MoneyLineAway,
                                teamToWin: "AwayTeam",
                                awayTeam: ele.AwayTeam,
                                homeTeam: ele.HomeTeam,
                                awayTeamLogo: awayTeamLogo,
                                homeTeamLogo: homeTeamLogo,
                                oddType: "Game",
                                time,
                                toWin: 0,
                                wager: 0,
                                betId: event.ID,
                                betType: "ML",
                              })
                            );
                          }}
                        >
                          <div className="lineodds">
                            {" "}
                            {event.MoneyLineAway[0] === "-"
                              ? event.MoneyLineAway
                              : "+" + event.MoneyLineAway}
                          </div>
                        </div>
                      )}
                    </div>
                  </TableRow>
                  <TableRow>
                    <Link
                      className="game2Info"
                      href={{
                        pathname: `/sportsbook/games/[id]`,
                        query: {
                          sport: data.sport,
                          id: apiId,
                        },
                      }}
                      as={`/sportsbook/games/${ele.AwayTeam}&${ele.HomeTeam}`}
                      // key={apiId}
                    >
                      <div className="gameStatus"></div>
                      <div
                        className="team2Info"
                        onClick={() =>
                          dispatch(
                            selectGame({
                              game: ele,
                              sport: data.sport,
                              htl: homeTeamLogo,
                              atl: awayTeamLogo,
                            })
                          )
                        }
                      >
                        <div className="imgContainer">
                          <Image
                            src={homeTeamLogo}
                            width={18}
                            height={18}
                            alt="HomeTeam Icon"
                          />
                        </div>
                        <div className="team1">{ele.HomeTeam}</div>
                      </div>
                    </Link>
                    {/* HOME TEAM SPREAD!!!!!!!!!!! */}
                    <div className="line2Col">
                      {event.PointSpreadHome == 0 ? (
                        <div className="lineContainer">N/A</div>
                      ) : (
                        <div
                          className={`lineContainer ${
                            betSlip.find(
                              (bet) =>
                                bet.betId === ele.ID &&
                                bet.teamToWin === "HomeTeam" &&
                                bet.betType === "spread"
                            ) !== undefined
                              ? "selected"
                              : ""
                          }`}
                          onClick={() => {
                            dispatch(
                              addToBetSlip({
                                id: betSlip.length,
                                gameLine:
                                  ele.HomeTeam + " " + event.PointSpreadHome,
                                odds: event.PointSpreadHomeLine,
                                teamToWin: "HomeTeam",
                                awayTeam: ele.AwayTeam,
                                homeTeam: ele.HomeTeam,
                                awayTeamLogo: awayTeamLogo,
                                homeTeamLogo: homeTeamLogo,
                                time,
                                oddType: "Game",
                                toWin: 0,
                                wager: 0,
                                betId: event.ID,
                                betType: "spread",
                                spread: Number(event.PointSpreadHome),
                                calc:
                                  event.PointSpreadHome[0] === "-"
                                    ? "minus"
                                    : "plus",
                              })
                            );
                          }}
                        >
                          <div className="line">
                            {event.PointSpreadHome[0] === "-"
                              ? event.PointSpreadHome
                              : "+" + event.PointSpreadHome}
                          </div>
                          <div className="lineodds">
                            {event.PointSpreadHomeLine[0] === "-"
                              ? event.PointSpreadHomeLine
                              : "+" + event.PointSpreadHomeLine}
                          </div>
                        </div>
                      )}
                    </div>
                    {/* UNDER!!!!!!!!!!! */}
                    <div className="line2Col">
                      {event.UnderLine == 0 || event.UnderLine == 0.0 ? (
                        <div className="lineContainer">N/A</div>
                      ) : (
                        <div
                          className={`lineContainer ${
                            betSlip.find(
                              (bet) =>
                                bet.betId === ele.ID &&
                                bet.gameLine.includes("Under") &&
                                bet.betType === "total"
                            ) !== undefined
                              ? "selected"
                              : ""
                          }`}
                          onClick={() => {
                            dispatch(
                              addToBetSlip({
                                id: betSlip.length,
                                gameLine: "Under " + event.TotalNumber,
                                odds: event.UnderLine,
                                awayTeam: ele.AwayTeam,
                                homeTeam: ele.HomeTeam,
                                awayTeamLogo: awayTeamLogo,
                                homeTeamLogo: homeTeamLogo,
                                teamToWin: "HomeTeam",
                                oddType: "Game",
                                time,
                                toWin: 0,
                                wager: 0,
                                betId: event.ID,
                                betType: "total",
                              })
                            );
                          }}
                        >
                          <div className="line">U {event.TotalNumber}</div>
                          <div className="lineodds">
                            {event.UnderLine[0] === "-"
                              ? event.UnderLine
                              : "+" + event.UnderLine}
                          </div>
                        </div>
                      )}
                    </div>
                    {/* HOME TEAM ML!!!!!!!!!!! */}
                    <div className="line2Col">
                      {event.MoneyLineHome == 0 ||
                      event.MoneyLineHome == 0.0 ? (
                        <div className="lineContainer">N/A</div>
                      ) : (
                        <div
                          className={`lineContainer ${
                            betSlip.find(
                              (bet) =>
                                bet.betId === ele.ID &&
                                bet.teamToWin === "HomeTeam" &&
                                bet.betType === "ML"
                            ) !== undefined
                              ? "selected"
                              : ""
                          }`}
                          onClick={() => {
                            dispatch(
                              addToBetSlip({
                                id: betSlip.length,
                                gameLine: ele.HomeTeam + " ML",
                                odds: event.MoneyLineHome,
                                team: ele.HomeTeam,
                                awayTeam: ele.AwayTeam,
                                homeTeam: ele.HomeTeam,
                                awayTeamLogo: awayTeamLogo,
                                homeTeamLogo: homeTeamLogo,
                                teamToWin: "HomeTeam",
                                oddType: "Game",
                                time,
                                toWin: 0,
                                wager: 0,
                                betId: event.ID,
                                betType: "ML",
                              })
                            );
                          }}
                        >
                          <div className="lineodds">
                            {event.MoneyLineHome[0] === "-"
                              ? event.MoneyLineHome
                              : "+" + event.MoneyLineHome}
                          </div>
                        </div>
                      )}
                    </div>
                  </TableRow>
                </GameCard>
              );
            })}
          </Games>
          {data.data.length < 1 && data.sport !== "index" && (
            <AvailableLines>
              <p>Not in Season</p>
            </AvailableLines>
          )}
          {data.data.length < 1 && data.sport == "index" && (
            <AvailableLines>No Local Games</AvailableLines>
          )}
        </GamesContainer>
        <Bs className={!betSlip.length ? "hideSlip" : ""}>
          {betSlip.length > 0 && <BetSlip />}
        </Bs>
      </Attempt>
    </SportsContainer>
  );
}

export default Sportsbook;
