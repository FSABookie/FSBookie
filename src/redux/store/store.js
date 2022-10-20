import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { apiSlice } from "../slices/apiSlice";
import BetSlipSlice from "../slices/BetSlip-slice";
// import fundsSlice from "../slices/Funds-slice";
import userSlice from "../slices/user-slice";
import gameSlice from "../slices/game-slice";
import usersBetSlice from "../slices/usersBets-slice";
import storage from "redux-persist/lib/storage";
import postSlice from "../slices/postSlice";
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
const persistedId = persistReducer(persistConfig, postSlice.reducer);

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    betSlip: BetSlipSlice.reducer,
    user: userSlice.reducer,
    // funds: fundsSlice.reducer,
    persistedGame,
    usersBets: usersBetSlice.reducer,
    persistedId, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);
