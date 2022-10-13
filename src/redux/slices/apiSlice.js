import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// invalidate tags and mutation is only for PUT POST DELETE
// provide tags and query is only for GET

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://capstone-bookie.herokuapp.com/api",
    baseUrl: "http://localhost:3000/api",
  }),
  tagTypes: ["MLB", "NBA", "NFL", "NHL", "bets", "orders"],
  endpoints: (builder) => ({
    //Fetching all sports
    getMLB: builder.query({
      query: () => "/mlb/",
      providesTags: ["MLB"],
    }),
    getNBA: builder.query({
      query: () => "/nba",
      providesTags: ["NBA"],
    }),
    getNHL: builder.query({
      query: () => "/nhl",
      providesTags: ["NHL"],
    }),
    getNFL: builder.query({
      query: () => "/nfl",
      providesTags: ["NFL"],
    }),
    getOrders: builder.query({
      query: () => "/orders",
      providesTags: ["orders"],
    }),
    getActiveBets: builder.query({
      query: () => "/bets/active",
      providesTags: ["bets"],
    }),
    // createOrder: builder.mutation({
    //   query: (payload) => ({
    //     url: "/orders",
    //     method: "POST",
    //     body: payload,
    //   }),
    //   invalidatesTags: ["orders"],
    // }),
    // createBets: builder.mutation({
    //   query: (payload) => ({
    //     url: "/bets",
    //     method: "POST",
    //     body: payload,
    //   }),
    //   invalidatesTags: ["bets"],
    // }),
  }),
});

// RTK automatically creates a function for you based on your query name
export const {
  useGetMLBQuery,
  useGetNHLQuery,
  useGetNBAQuery,
  useGetNFLQuery,
  useGetActiveBetsQuery,
  useCreateBetsMutation,
  useCreateOrderMutation,
} = apiSlice;
