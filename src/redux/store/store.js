import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "../slices/apiSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import BetSlipSlice from "../slices/BetSlip-slice";
import fundsSlice from "../slices/Funds-slice";
import userSlice from "../slices/user-slice";
import gameSlice from "../slices/game-slice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  blacklist: [apiSlice.reducerPath],
};

const persistedGame = persistReducer(persistConfig, gameSlice.reducer);

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    betSlip: BetSlipSlice.reducer,
    user: userSlice.reducer,
    funds: fundsSlice.reducer,
    selectedGame: persistedGame,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  middleware: [thunk],
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);
