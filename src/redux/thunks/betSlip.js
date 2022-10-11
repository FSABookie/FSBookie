import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const submitBetsThunk = createAsyncThunk(
  "submitBets/handleSubmitBets",
  async (payload) => {
    try {
      // first create an order so we can associate bets with an order
      const { data: order } = await axios.post("/api/orders", {
        userId: payload.userId,
        isParlay: false,
        isActive: true,
      });

      // map through bet slip and post each one and associate the order ID to each created new bet
      payload.betSlip.forEach(async (bet) => {
        let myBet = {...bet, orderId: order.id}
        delete myBet.id;
        await axios.post("/api/bets", myBet);
      });
    } catch (err) {
      throw new Error(err);
    }
  }
);
