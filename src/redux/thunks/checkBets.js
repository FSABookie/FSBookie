import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const checkBetsThunk = createAsyncThunk(
  "checkBet/handleBets",
  async (payload) => {
    try {
      const { data } = await axios.get(`/api/game/${payload}`);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
);
