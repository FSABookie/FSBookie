import { createAsyncThunk } from "@reduxjs/toolkit";

const submitBetsThunk = createAsyncThunk(
    'submitBets/handleSubmitBets', async (payload) => {
        try {
            // const { data: } = 
        }
        catch (err) {
            console.error(err);
        }
    }
);