import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Link from "next/link";

const SingleGameContainer = styled.div ` 
color: white;
height: 100%;
width: 100%;
padding: 4%;
.eventSport {
  text-align: center;
  font-weight: 200;
  font-size: 0.75em;
  margin-top: 15%;
  padding-bottom: 3%;
  border-bottom: 0.15em solid #242424;
  opacity: 0.8;
}

.MatchupContainer {
  display: flex;
  flex-direction: row;
  gap: 5%;
  margin-top: 7%;
}

.team1 {
  text-align: center;
  font-weight: 200;
}

.team2 {
  margin-right: 5%;
  text-align: center;
  font-weight: 200;
}

.AT {
  background: #242424;
  padding: 2%;
  font-size: 0.8em;
  height: 5%;
  font-weight: 800;
  
} 
.headimg {
  width:50px;
  height:50px;
}

.gamecard {
  margin-top: 4%;
}
`
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

const SportsHeader = styled.div`
	margin-top: 18%;
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
		font-family: 'Saira Condensed', sans-serif;
		text-transform: uppercase;
		cursor: pointer;
		transition: all 0.16s ease;
	}
`;

function GamePage() {
  const { game } = useSelector((state) => state.selectedGame);
  useEffect(() => {
    console.log(game);
  }, [game]);
              let d = new Date(game.MatchTime).toDateString();
							let t = new Date(game.MatchTime).toLocaleTimeString(
								[], {hour: '2-digit', minute:'2-digit'}
							);
							// MUST FIX THE TIME
							let time = d + ' ' + t;
							let apiId = game.ID
  return (
      <SingleGameContainer>
       <div className="GameHeader">
         <div className="eventSport">
              NFL
         </div>
         <div className="MatchupContainer">
            <div className="team1">
              WAS Commanders
              <img className="headimg" src="https://sportsbook.draftkings.com/static/logos/teams/nfl/WAS-Commanders.png"/>
            </div>
            <div className="AT">AT</div>
            <div className="team2">
              CHI Bears
              <img className="headimg" src="https://sportsbook.draftkings.com/static/logos/teams/nfl/CHI.png"/>
            </div>
         </div>
      </div>

      <div>
      <SportsHeader>
      <Link href='/sportsbook/NHL'>
					<a>POPULAR</a>
				</Link>
				<Link href='/sportsbook/NFL'>
					<a>GAME LINES</a>
				</Link>
				<Link href='/sportsbook/NBA'>
					<a>HALVES</a>
				</Link>
				<Link href='/sportsbook/NHL'>
					<a>QUARTERS</a>
				</Link>
			</SportsHeader>
      </div>

      <div className="gamecard">
      <GameCard key={apiId}>
									<TableRow>
										<Link
											href={{
												pathname: `/sportsbook/games/[id]`,
												query: {
													event: 'hello',
												},
											}}
											as={`/sportsbook/games/${game.AwayTeam}&${game.HomeTeam}`}
											key={apiId}
										>
											<div className='gameInfo'>
												{/* <div className='eventCell'> */}
												<div className='gameTime'>
													{time}
												</div>
												<div
													className='teamInfo'
													onClick={() =>
														dispatch(
															selectGame(event)
														)
													}
												>
													<div className='imgContainer'>
														<img src='https://sportsbook.draftkings.com/static/logos/teams/nfl/LV.png' />
													</div>
													<div className='team1'>
														{game.AwayTeam}
													</div>
												</div>
												{/* </div> */}
											</div>
										</Link>
										{/* AWAY TEAM SPREAD!!!!!!!!!!! */}
										<div className='lineCol'>
											{game.Odds[0].PointSpreadAway == 0 ||
											game.Odds[0].PointSpreadAway ==
												0.0 ? (
												<div className='lineContainer'>
													N/A
												</div>
											) : (
												<div
													className='lineContainer'
													onClick={() => {
														dispatch(
															addToBetSlip({
																id: betSlip.length,
																gameLine:
																game.AwayTeam + ' ' + game.Odds[0]
																		.PointSpreadAway,
																odds: game
																	.Odds[0]
																	.PointSpreadAwayLine,
																team: game.AwayTeam,
																teams:
																	game.AwayTeam +
																	' @ ' +
																	game.HomeTeam,
																time: time,
																toWin: 0,
																wager: 0,
																betId: apiId,
															})
														);
													}}
												>
													<div className='line'>
														{game.Odds[0]
															.PointSpreadAway[0] ===
														'-'
															? game.Odds[0]
																	.PointSpreadAway
															: '+' +
															  game.Odds[0]
																	.PointSpreadAway}
													</div>
													<div className='lineodds'>
														{game.Odds[0]
															.PointSpreadAwayLine[0] ===
														'-'
															? game.Odds[0]
																	.PointSpreadAwayLine
															: '+' +
															  game.Odds[0]
																	.PointSpreadAwayLine}
													</div>
												</div>
											)}
										</div>
										{/* OVER!!!!!!!!!!! */}
										<div className='lineCol'>
											{game.Odds[0].PointSpreadAway == 0 ||
											game.Odds[0].PointSpreadAway ==
												0.0 ? (
												<div className='lineContainer'>
													N/A
												</div>
											) : (
												<div
													className='lineContainer'
													onClick={() => {
														dispatch(
															addToBetSlip({
																id: betSlip.length,
																gameLine:
																	'Over ' +
																	game.Odds[0]
																		.TotalNumber,
																odds: game
																	.Odds[0]
																	.OverLine,
																teams:
																	game.AwayTeam +
																	' @ ' +
																	game.HomeTeam,
																time,
																toWin: 0,
																wager: 0,
																betId: apiId,
															})
														);
													}}
												>
													<div className='line'>
														O{' '}
														{
															game.Odds[0]
																.TotalNumber
														}
													</div>
													<div className='lineodds'>
														{game.Odds[0]
															.OverLine[0] === '-'
															? game.Odds[0]
																	.OverLine
															: '+' +
															  game.Odds[0]
																	.OverLine}
													</div>
												</div>
											)}
										</div>
										{/* AWAY TEAM!!!!!!!!!!! */}
										<div className='lineCol'>
											{game.Odds[0].PointSpreadAway == 0 ||
											game.Odds[0].PointSpreadAway ==
												0.0 ? (
												<div className='lineContainer'>
													N/A
												</div>
											) : (
												<div
													className='lineContainer'
													onClick={() => {
														dispatch(
															addToBetSlip({
																id: betSlip.length,
																gameLine:
																	game.AwayTeam +
																	' ML',
																odds: game
																	.Odds[0]
																	.MoneyLineAway,
																team: game.AwayTeam,
																teams:
																	game.AwayTeam +
																	' @ ' +
																	game.HomeTeam,
																time,
																toWin: 0,
																wager: 0,
																betId: apiId,
															})
														);
													}}
												>
													<div className='lineodds'>
														{' '}
														{game.Odds[0]
															.MoneyLineAway[0] ===
														'-'
															? game.Odds[0]
																	.MoneyLineAway
															: '+' +
															  game.Odds[0]
																	.MoneyLineAway}
													</div>
												</div>
											)}
										</div>
									</TableRow>
									<TableRow>
										<div className='game2Info'>
											{/* <div className='eventCell'> */}
											<div className='gameStatus'></div>
											<div className='teamInfo'>
												<div className='imgContainer'>
													<img src='https://sportsbook.draftkings.com/static/logos/teams/nfl/KC.png' />
												</div>
												<a className='team1'>
													{game.HomeTeam}
												</a>
											</div>
											{/* </div> */}
										</div>
										{/* HOME TEAM SPREAD!!!!!!!!!!! */}
										<div className='line2Col'>
											{game.Odds[0].PointSpreadAway == 0 ||
											game.Odds[0].PointSpreadAway ==
												0.0 ? (
												<div className='lineContainer'>
													NA
												</div>
											) : (
												<div
													className='lineContainer'
													onClick={() => {
														dispatch(
															addToBetSlip({
																id: betSlip.length,
																gameLine:
																game.HomeTeam + ' ' + game.Odds[0]
																		.PointSpreadHome,
																odds: game
																	.Odds[0]
																	.PointSpreadHomeLine,
																team: game.HomeTeam,
																teams:
																	game.AwayTeam +
																	' @ ' +
																	game.HomeTeam,
																time,
																toWin: 0,
																wager: 0,
																betId: apiId,
															})
														);
													}}
												>
													<div className='line'>
														{game.Odds[0]
															.PointSpreadHome[0] ===
														'-'
															? game.Odds[0]
																	.PointSpreadHome
															: '+' +
															  game.Odds[0]
																	.PointSpreadHome}
													</div>
													<div className='lineodds'>
														{game.Odds[0]
															.PointSpreadHomeLine[0] ===
														'-'
															? game.Odds[0]
																	.PointSpreadHomeLine
															: '+' +
															  game.Odds[0]
																	.PointSpreadHomeLine}
													</div>
												</div>
											)}
										</div>
										{/* UNDER!!!!!!!!!!! */}
										<div className='line2Col'>
											{game.Odds[0].PointSpreadAway == 0 ||
											game.Odds[0].PointSpreadAway ==
												0.0 ? (
												<div className='lineContainer'>
													N/A
												</div>
											) : (
												<div
													className='lineContainer'
													onClick={() => {
														dispatch(
															addToBetSlip({
																id: betSlip.length,
																gameLine:
																	'Under ' +
																	game.Odds[0]
																		.TotalNumber,
																odds: game
																	.Odds[0]
																	.UnderLine,
																teams:
																	game.AwayTeam +
																	' @ ' +
																	game.HomeTeam,
																time,
																toWin: 0,
																wager: 0,
																betId: apiId,
															})
														);
													}}
												>
													<div className='line'>
														U{' '}
														{
															game.Odds[0]
																.TotalNumber
														}
													</div>
													<div className='lineodds'>
														{game.Odds[0]
															.UnderLine[0] ===
														'-'
															? game.Odds[0]
																	.UnderLine
															: '+' +
															  game.Odds[0]
																	.UnderLine}
													</div>
												</div>
											)}
										</div>
										{/* HOME TEAM ML!!!!!!!!!!! */}
										<div className='line2Col'>
											{game.Odds[0].PointSpreadAway == 0 ||
											game.Odds[0].PointSpreadAway ==
												0.0 ? (
												<div className='lineContainer'>
													N/A
												</div>
											) : (
												<div
													className='lineContainer'
													onClick={() => {
														dispatch(
															addToBetSlip({
																id: betSlip.length,
																gameLine:
																	game.HomeTeam +
																	' ML',
																odds: game
																	.Odds[0]
																	.MoneyLineHome,
																team: game.HomeTeam,
																teams:
																	game.AwayTeam +
																	' @ ' +
																	game.HomeTeam,
																time,
																toWin: 0,
																wager: 0,
																betId: apiId,
															})
														);
													}}
												>
													<div className='lineodds'>
														{game.Odds[0]
															.MoneyLineHome[0] ===
														'-'
															? game.Odds[0]
																	.MoneyLineHome
															: '+' +
															  game.Odds[0]
																	.MoneyLineHome}
													</div>
												</div>
											)}
										</div>
									</TableRow>
								</GameCard>
      </div>
       </SingleGameContainer>
    )
}

export default GamePage;
