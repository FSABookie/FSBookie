import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "../slices/apiSlice";
import BetSlipSlice from "../slices/BetSlip-slice";
import fundsSlice from "../slices/Funds-slice";
import userSlice from "../slices/user-slice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    betSlip: BetSlipSlice.reducer,
    user: userSlice.reducer,
    funds: fundsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
