import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "selectedGame",
  initialState: {
    game: null,
    odds: null,
    sport: null,
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
  },
});

export const { selectGame, selectFirstHalf, selectQuarter, selectFullGame } =
  gameSlice.actions;
export default gameSlice;
