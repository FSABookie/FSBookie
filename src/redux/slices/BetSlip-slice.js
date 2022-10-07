import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//User submits bet(s)
//reducer should fire, adding all bets to the backend
//needs bet id, amount wagered, amount to win, if its parlay

// 1. looks like you have a capital U in users_permissions_user field name in your post data. That should not work although i see your other fields have it and i guess the work? strange.
// 2. ensure the user role who is sending the request has access to find/findOne for the users collection

const BetSlipSlice = createSlice({
  name: "betSlip",
  initialState: {
    betSlip: [],
    bet: {},
  },
  reducers: {
    addToBetSlip(state, action) {
      console.log("in dispatch", action.payload, state.betSlip[0]);
      state.betSlip = [...state.betSlip, action.payload];
    },
    RemoveFromBetSlip(state, action) {
      state.betSlip.splice(action.payload.id - 1, 1);
    },
    RemoveAllSelections(state) {
      state.betSlip = [];
    },
    addWinAndWager(state, action) {
      // prevents default behavior caused by use effect
      if (!action.payload.wager) return;
      // remaking the bet
      state.bet = { ...action.payload.bet };
      // setting the towin amount
      state.bet.toWin = action.payload.toWin;
      // setting wager amount
      state.bet.wager = action.payload.wager;
      // removing the previous bet from bet slip and adding the updated bet
      state.betSlip.forEach((b) => {
        b.betId === action.payload.bet.betId &&
          state.betSlip.splice(b.id, 1, state.bet);
      });
    },
  },
});

export const {
  addToBetSlip,
  RemoveFromBetSlip,
  RemoveAllSelections,
  addWinAndWager,
} = BetSlipSlice.actions;
export default BetSlipSlice;
