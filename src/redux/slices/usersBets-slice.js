import { createSlice } from "@reduxjs/toolkit";

const usersBetSlice = createSlice({
  name: "usersBets",
  initialState: {
    usersBets: [],
    filteredBets: [],
  },
  reducers: {
    getBets: (state, action) => {
      // console.log(action.payload.flat());
      state.usersBets = action.payload.flat();
      state.filteredBets = state.usersBets;
    },
    getAllBets: (state) => {
      state.filteredBets = null;
      state.filteredBets = [...state.usersBets];
    },
    getLostBets: (state) => {
      state.filteredBets = null;
      state.filteredBets = [
        ...state.usersBets.filter((bet) => bet.result === "lost"),
      ];
    },
    getWonBets: (state) => {
      state.filteredBets = null;
      state.filteredBets = [
        ...state.usersBets.filter((bet) => bet.result === "won"),
      ];
    },
    getOpenBets: (state) => {
      state.filteredBets = null;
      state.filteredBets = [...state.usersBets.filter((bet) => bet.isActive)];
    },
    getCompletedBets: (state) => {
      state.filteredBets = null;
      state.filteredBets = [
        ...state.usersBets.filter((bet) => bet.status === "completed"),
      ];
    },
    clearBets: (state) => {
      state.usersBets = [];
      state.filteredBets = [];
    },
  },
});

export const {
  getBets,
  getCompletedBets,
  getLostBets,
  getOpenBets,
  getWonBets,
  getAllBets,
  clearBets,
} = usersBetSlice.actions;
export default usersBetSlice;
