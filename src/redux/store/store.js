import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "../slices/apiSlice";
import BetSlipSlice from "../slices/BetSlip-slice";
// import fundsSlice from "../slices/Funds-slice";
import userSlice from "../slices/user-slice";
import gameSlice from "../slices/game-slice";
import usersBetSlice from "../slices/usersBets-slice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import localGamesSlice from "../slices/localGames-slice";
import { createWrapper } from "next-redux-wrapper";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    apiSlice.reducerPath,
    userSlice.reducer,
    BetSlipSlice.reducer,
    usersBetSlice.reducer,
  ],
};

const persistedGame = persistReducer(persistConfig, gameSlice.reducer);

const makeStore = () =>
  configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
      betSlip: BetSlipSlice.reducer,
      user: userSlice.reducer,
      usersBets: usersBetSlice.reducer,
      localGames: localGamesSlice.reducer,
      persistedGame,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(apiSlice.middleware),
  });

const store = makeStore();

setupListeners(store.dispatch);
export const persistor = persistStore(store);
export const wrapper = createWrapper(makeStore);
