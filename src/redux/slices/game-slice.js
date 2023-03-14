import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "selectedGame",
  initialState: {
    game: null,
    odds: null,
    sport: null,
    awayTeamLogo: null,
    homeTeamLogo: null,
  },
  reducers: {
    selectGame: (state, action) => {
      // console.log("reducer", JSON.parse(action.payload));
      console.log(action.payload);

      // set the current game, or reload the current game
      state.game = action.payload.game;

      // set the odds
      state.odds = action.payload.game.Odds.filter(
        (odd) => odd.OddType === "Game"
      );

      // set the sport
      state.sport = action.payload.sport;
      console.log(state.sport);
      state.homeTeamLogo = action.payload.htl;
      state.awayTeamLogo = action.payload.atl;
    },
    selectFullGame: (state) => {
      state.odds = null;
      state.odds = state.game.Odds.filter((odd) => odd.OddType === "Game");
    },
    selectFirstHalf: (state) => {
      state.odds = null;
      state.odds = state.game.Odds.filter((odd) => odd.OddType === "FirstHalf");
    },
    selectQuarter: (state) => {
      state.odds = null;
      state.odds = state.game.Odds.filter((odd) =>
        odd.OddType.includes("Quarter")
      );
    },
    selectPeriod: (state) => {
      state.odds = null;
      state.odds = state.game.Odds.filter((odd) =>
        odd.OddType.includes("Period")
      );
    },
    selectInning: (state) => {
      state.odds = null;
      state.odds = state.game.Odds.filter((odd) =>
        odd.OddType.includes("Inning")
      );
    },
  },
});

export const {
  selectGame,
  selectFirstHalf,
  selectQuarter,
  selectFullGame,
  selectPeriod,
  selectInning,
} = gameSlice.actions;
export default gameSlice;
