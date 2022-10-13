import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const handleFunds = async (id, funds, type) => {
  //getting the original funds first
  //   let fundsAmount = funds;

  //based on type of transaction, update the users funds
  //   if (type === "add") {
  //     fundsAmount = fundsAmount + funds;
  //     let data = await fetch(`http://localhost:1337/users/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         Authorization: `Bearer ${userToken}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ funds: fundsAmount }),
  //     }).then((res) => res.json());
  //     return data.funds;
  //   }

  if (type === "s") {
    console.log(id, type, funds);
    // fundsAmount = fundsAmount - funds;
    let { data } = await axios.put(`http://localhost:3000/api/users/${id}`, {
      balance: funds,
    });
    //   .then((res) => res.json());
    return data.user.balance;
  }

  return funds;
};

export const handleFundsThunk = createAsyncThunk(
  "funds/handleFunds",
  async ({ id, funds, type }) => {
    try {
      let data = await handleFunds(id, Number(funds), type);
      return data;
    } catch (err) {
      throw new Error(err);
    }
  }
);

const fundsSlice = createSlice({
  name: "funds",
  initialState: { funds: null },
  reducers: {
    subtractFunds: (state, action) => {
      state.funds -= action.payload;
    },
    clearFunds: (state, action) => {
      state.funds = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(handleFundsThunk.fulfilled, (state, action) => {
      state.funds = action.payload;
    });
  },
});

export const fundsSliceActions = fundsSlice.actions;
export default fundsSlice;
