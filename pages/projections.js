import React from 'react';
import { useGetMLBQuery } from '../src/redux/slices/apiSlice';
import styled from 'styled-components';
import Link from 'next/link';

const SportsContainer = styled.div`
	width: 100%;
	max-width: 100%;
	height: 100%;
	background-color: black;
	padding: 3%;
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
		font-family: 'Saira Condensed', sans-serif;
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
	border-top: 0.25em solid #242424;

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
		font-size: 1.2em;
		color: white;
		margin-left: 10px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		max-width: 100px;
	}
	.gameTime {
		font-size: 0.25em;
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
	border-bottom: 0.25em solid #242424;
`;

const Space = styled.div`
	height: 25%;
	color: white;
`;

const Projections = () => {
	const { data, error, isLoading, isSuccess, isFetching } = useGetMLBQuery();
	console.log(data);

	return (
		<div>
			<Space>
				<p>fgsdagasdgds</p>
				<p>fgsdagasdgds</p>
				<p>fgsdagasdgds</p>
				<p>fgsdagasdgds</p>
				<p>fgsdagasdgds</p>
			</Space>
			<SportsContainer>
				<SportsHeader>
					<Link href='/sportsbook/NFL'>
						<a>Football</a>
					</Link>
					<Link href='/sportsbook/NBA'>
						<a>Basketball</a>
					</Link>
					<Link href='/sportsbook/NHL'>
						<a>Hockey</a>
					</Link>
					<Link href='/sportsbook/MLB'>
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
				{data &&
					data.map((game) => {
						let d = new Date(game.MatchTime).toDateString();
						let t = new Date(game.MatchTime).toLocaleTimeString(
							'en-US'
						);
						// MUST FIX THE TIME
						let time = d + ' ' + t;
						let apiId = game.ID;
						return (
							<GameCard key={apiId}>
								<TableRow>
									<div className='gameInfo'>
										{/* <div className='eventCell'> */}
										<span className='gameTime'>{time}</span>
										<div className='teamInfo'>
											<div className='imgContainer'>
												<img src='https://sportsbook.draftkings.com/static/logos/teams/nfl/LV.png' />
											</div>
											<div className='team1'>
												{game.AwayTeam}
											</div>
										</div>
										{/* </div> */}
									</div>
									{/* AWAY TEAM SPREAD!!!!!!!!!!! */}
									<div className='lineCol'>
										{game.Odds[0].PointSpreadAway == 0 ||
										game.Odds[0].PointSpreadAway == 0.0 ? (
											<div className='lineContainer'>
												N/A
											</div>
										) : (
											<div className='lineContainer'>
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
										game.Odds[0].PointSpreadAway == 0.0 ? (
											<div className='lineContainer'>
												N/A
											</div>
										) : (
											<div className='lineContainer'>
												<div className='line'>
													O {game.Odds[0].TotalNumber}
												</div>
												<div className='lineodds'>
													{game.Odds[0]
														.OverLine[0] === '-'
														? game.Odds[0].OverLine
														: '+' +
														  game.Odds[0].OverLine}
												</div>
											</div>
										)}
									</div>
									{/* AWAY TEAM!!!!!!!!!!! */}
									<div className='lineCol'>
										{game.Odds[0].PointSpreadAway == 0 ||
										game.Odds[0].PointSpreadAway == 0.0 ? (
											<div className='lineContainer'>
												N/A
											</div>
										) : (
											<div className='lineContainer'>
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
										game.Odds[0].PointSpreadAway == 0.0 ? (
											<div className='lineContainer'>
												NA
											</div>
										) : (
											<div className='lineContainer'>
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
										game.Odds[0].PointSpreadAway == 0.0 ? (
											<div className='lineContainer'>
												N/A
											</div>
										) : (
											<div className='lineContainer'>
												<div className='line'>
													U {game.Odds[0].TotalNumber}
												</div>
												<div className='lineodds'>
													{game.Odds[0]
														.UnderLine[0] === '-'
														? game.Odds[0].UnderLine
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
										game.Odds[0].PointSpreadAway == 0.0 ? (
											<div className='lineContainer'>
												N/A
											</div>
										) : (
											<div className='lineContainer'>
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
						);
					})}
                    </Games>
        </GamesContainer>
			</SportsContainer>
		</div>
	);
};

export default Projections;
