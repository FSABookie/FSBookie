import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "selectedGame",
  initialState: {
    game: null,
  },
  reducers: {
    selectGame: (state, action) => {
      localStorage.removeItem("selectedGame");
      localStorage.setItem("selectedGame", JSON.stringify(action.payload));
    },
  },
});

export const { selectGame } = gameSlice.actions;
export default gameSlice;
