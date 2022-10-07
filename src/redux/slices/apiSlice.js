import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// invalidate tags and mutation is only for PUT POST DELETE
// provide tags and query is only for GET

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.BASE_URL || "http://localhost:3000/" + "api",
  }),
  tagTypes: ["MLB", "NBA", "NFL", "NHL", "bets"],
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
  }),
});

// RTK automatically creates a function for you based on your query name
export const {
  useGetMLBQuery,
  useGetNHLQuery,
  useGetNBAQuery,
  useGetNFLQuery,
} = apiSlice;
