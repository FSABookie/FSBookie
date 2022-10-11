import styled from "styled-components";
import LeftColumn from "./LeftColumn";
import Nav from "./Nav";
import BetSlip from "./BetSlip";
import { useDispatch, useSelector } from "react-redux";
import { addToBetSlip } from "../../redux/slices/BetSlip-slice";
import { useEffect } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20rem;
  margin-right: 20rem;

  @media screen and (max-width: 1320px) {
    margin-left: 3rem;
    margin-right: 3rem;
  }
`;

const EventsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const MiddleContainer = styled.div`
  height: 175vh;
  width: 100%;
  background-color: rgb(153, 115, 141);
  display: flex;
  flex-direction: column;
`;

const EventsHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const Sport = styled.div`
  width: 15em;
`;

const Lines = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 30em;
`;

const Labels = styled.div``;

const AllGamesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.25em;
`;

const TeamRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const Team = styled.div``;

const Pitcher = styled.div`
  font-size: 0.65rem;
`;

const Spread = styled.button``;

const ML = styled.button``;

const Total = styled.button``;

const MoreWagers = styled.div``;

const DateHolder = styled.div`
  font-size: 0.75rem;
`;

// COMPONENT STARTS HERE

export default function MainContainer({ data }) {
  const dispatch = useDispatch();
  const { betSlip } = useSelector((state) => state.betSlip);
  const { isLoggedIn, user } = useSelector((state) => state.user);

  // useEffect(() => {
  //   // if a user is logged in, set funds from DB
  //   // isLoggedIn &&
  //   //   dispatch(handleFundsThunk({ id: user.id, funds: null, type: null }));
  //   console.log(data);
  // });

  return (
    <Container>
      <Nav />
      <EventsContainer>
        <LeftColumn />
        <MiddleContainer>
          {data && data.sport} Odds
          <EventsHeader>
            <Sport>{data && data.sport}</Sport>
            <Lines>
              <Labels>SPREAD</Labels>
              <Labels>MONEY</Labels>
              <Labels>TOTAL</Labels>
            </Lines>
          </EventsHeader>
          <AllGamesContainer>
            {data.data &&
              data.data.map((ele) => {
                {
                  /* var local = moment.utc(ele.MatchTime).local().format();
                console.log(ele.AwayTeam, local); */
                }
                let d = new Date(ele.MatchTime).toDateString();
                let t = new Date(ele.MatchTime).toLocaleTimeString("en-US");
                let time = d + " " + t;
                let apiId = ele.ID;
                return (
                  <GameContainer key={apiId}>
                    <TeamRow>
                      <Team>{ele.AwayTeam}</Team>
                      {ele.AwayPitcher && <Pitcher>{ele.AwayPitcher}</Pitcher>}
                      <Spread
                        onClick={() => {
                          dispatch(
                            addToBetSlip({
                              id: betSlip.length,
                              gameLine: ele.Odds[0].PointSpreadAway,
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
                        {ele.Odds[0].PointSpreadAway}{" "}
                        {ele.Odds[0].PointSpreadAwayLine}
                      </Spread>
                      {ele.Odds[0].MoneyLineAway == 0 ? (
                        <ML>N/A</ML>
                      ) : (
                        <ML
                          onClick={() => {
                            dispatch(
                              addToBetSlip({
                                id: betSlip.length,
                                gameLine: ele.awayTeam + " ML",
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
                          {ele.Odds[0].MoneyLineAway[0] === "-"
                            ? ele.Odds[0].MoneyLineAway
                            : "+" + ele.Odds[0].MoneyLineAway}
                        </ML>
                      )}

                      <Total
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
                        Over {ele.Odds[0].TotalNumber} {ele.Odds[0].OverLine}
                      </Total>
                    </TeamRow>
                    <TeamRow>
                      <Team>{ele.HomeTeam}</Team>
                      {ele.HomePitcher && <Pitcher>{ele.HomePitcher}</Pitcher>}
                      <Spread
                        onClick={() => {
                          dispatch(
                            addToBetSlip({
                              id: betSlip.length,
                              gameLine: ele.Odds[0].PointSpreadHome,
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
                        {ele.Odds[0].PointSpreadHome}{" "}
                        {ele.Odds[0].PointSpreadHomeLine}
                      </Spread>
                      {ele.Odds[0].MoneyLineHome == 0 ? (
                        <ML>N/A</ML>
                      ) : (
                        <ML
                          onClick={() => {
                            dispatch(
                              addToBetSlip({
                                id: betSlip.length,
                                gameLine: ele.homeTeam + " ML",
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
                          {ele.Odds[0].MoneyLineHome[0] === "-"
                            ? ele.Odds[0].MoneyLineHome
                            : "+" + ele.Odds[0].MoneyLineHome}
                        </ML>
                      )}

                      <Total
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
                        Under {ele.Odds[0].TotalNumber} {ele.Odds[0].UnderLine}
                      </Total>
                    </TeamRow>
                    <DateHolder>{time}</DateHolder>
                  </GameContainer>
                );
              })}
          </AllGamesContainer>
        </MiddleContainer>
        <BetSlip />
      </EventsContainer>
    </Container>
  );
}
