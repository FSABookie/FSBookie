import { createAsyncThunk } from "@reduxjs/toolkit";

export const determineWinnerThunk = createAsyncThunk(
  "determineWinner/handleDetermineWinner",
  async (payload) => {
    try {
      // IF THE BET IS A SPREAD
      if (payload.bet.betType === "spread") {
        // check if user bet on away team
        if (payload.bet.teamToWin === "AwayTeam") {
          // check if away team is minus or plus spread
          if (payload.bet.calc === "minus") {
            if (
              Number(payload.api.AwayScore) - Number(payload.bet.spread) >
              Number(payload.api.HomeScore)
            ) {
              // put some put request to say the bet won
              return "won";
            } else {
              // put some put request to say bet lost
              return "lost";
            }
          }
          if (payload.bet.calc === "plus") {
            if (
              Number(payload.api.AwayScore) + Number(payload.bet.spread) >
              Number(payload.api.HomeScore)
            ) {
              // put some put request to say the bet won
              return "won";
            } else {
              // put some put request to say bet lost
              return "lost";
            }
          }
        }
        if (payload.bet.teamToWin === "HomeTeam") {
          // check if away team is minus or plus spread
          if (payload.bet.calc === "minus") {
            if (
              Number(payload.api.HomeScore) + Number(payload.bet.spread) >
              Number(payload.api.AwayScore)
            ) {
              // put some put request to say the bet won
              return "won";
            } else {
              // put some put request to say bet lost
              return "lost";
            }
          }
          if (payload.bet.calc === "plus") {
            if (
              Number(payload.api.HomeScore) + Number(payload.bet.spread) >
              Number(payload.api.AwayScore)
            ) {
              // put some put request to say the bet won
              return "won";
            } else {
              // put some put request to say bet lost
              return "lost";
            }
          }
        }
      }

      // IF THE BET IS ML
      if (payload.bet.betType === "ML") {
        if (payload.bet.teamToWin === "AwayTeam") {
          if (Number(payload.api.AwayScore) > Number(payload.api.HomeScore)) {
            // put some put request to say the bet won
            return "won";
          } else {
            // put some put request to say bet lost
            return "lost";
          }
        }
        if (payload.bet.teamToWin === "HomeTeam") {
          if (Number(payload.api.HomeScore) > Number(payload.api.AwayScore)) {
            // put some put request to say the bet won
            return "won";
          } else {
            // put some put request to say bet lost
            return "lost";
          }
        }
      }

      // Check if bet type is total
      if (payload.bet.betType === "total") {
        if (payload.bet.gameLine.split(" ")[0] === "Under") {
          if (
            Number(payload.api.HomeScore) + Number(payload.api.AwayScore) <
            Number(payload.bet.gameLine.split(" ")[1])
          ) {
            // // put some put request to say the bet won
            return "won";
          } else {
            // put some put request to say bet lost
            return "lost";
          }
        }
        if (payload.bet.gameLine.split(" ")[0] === "Over") {
          if (
            Number(payload.api.HomeScore) + Number(payload.api.AwayScore) >
            Number(payload.bet.gameLine.split(" ")[1])
          ) {
            // // put some put request to say the bet won
            return "won";
          } else {
            // put some put request to say bet lost
            return "lost";
          }
        }
      }
    } catch (err) {
      throw new Error(err);
    }
  }
);
