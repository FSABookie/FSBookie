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
    clearLocalGames: (state) => {
      state.localGames = [];
    },
    setLocalGames: (state, { payload }) => {
      console.log(payload);
      state.localGames.push(payload);
      state.localGames.flat();
    },
  },
});

export const { clearLocalGames, setLocalGames } = localGamesSlice.actions;
export default localGamesSlice;
