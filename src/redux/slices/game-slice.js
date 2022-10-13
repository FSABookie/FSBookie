import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "selectedGame",
  initialState: {
    game: null,
  },
  reducers: {
    selectGame: (state, action) => {
      state.game = action.payload;
    },
  },
});

export const { selectGame } = gameSlice.actions;
export default gameSlice;
