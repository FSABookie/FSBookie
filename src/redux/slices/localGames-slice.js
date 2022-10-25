import { createSlice } from "@reduxjs/toolkit";
import {
  NBAlogos,
  MLBlogos,
  NFLlogos,
  NHLlogos,
} from "../../../public/teamLogos";

const localGamesSlice = createSlice({
  name: "localGames",
  initialState: {
    localGames: [],
  },
  reducers: {
    clearGames: (state) => {
      state.localGames = [];
    },
    setGames: (state, { payload }) => {
      console.log(payload);
      state.localGames.push(payload.flat());
    },
  },
});

export const { clearGames, setGames } = localGamesSlice.actions;
export default localGamesSlice;
