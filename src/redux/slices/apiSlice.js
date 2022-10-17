import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// invalidate tags and mutation is only for PUT POST DELETE
// provide tags and query is only for GET

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://capstone-bookie.herokuapp.com/api",
    baseUrl: "http://localhost:3000/api",
  }),
  tagTypes: [
    "MLB",
    "NBA",
    "NFL",
    "NHL",
    "bets",
    "orders",
    "user",
    "game",
    "allActiveBets",
    "usersActiveBets",
  ],
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
    getSingleGame: builder.query({
      query: (id) => `/game/${id}`,
      providesTags: ["game"],
    }),
    getOrders: builder.query({
      query: () => "/orders",
      providesTags: ["orders"],
    }),
    getActiveBets: builder.query({
      query: () => "/bets/active",
      providesTags: ["allActiveBets"],
    }),
    getUsersActiveBets: builder.query({
      query: (id) => `/users/${id}/activeBets`,
      providesTags: ["usersActiveBets"],
    }),
    getUser: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: ["user"],
    }),
    updateUserFunds: builder.mutation({
      query: (payload) => ({
        url: `/users/${payload.id}`,
        method: "PUT",
        body: { balance: payload.funds },
      }),
      invalidatesTags: ["user"],
    }),
    createOrder: builder.mutation({
      query: (payload) => ({
        url: "/orders",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["orders", "user", "usersActiveBets"],
    }),
    updateOrder: builder.mutation({
      query: (payload) => ({
        url: `/orders/${payload.id}`,
        method: "PUT",
        body: payload.data,
      }),
      invalidatesTags: ["orders", "user", "usersActiveBets"],
    }),
    createBets: builder.mutation({
      query: (payload) => ({
        url: "/bets",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["bets", "user", "usersActiveBets", "allActiveBets"],
    }),
    updateBets: builder.mutation({
      query: (payload) => ({
        url: `/bets/${payload.id}`,
        method: "PUT",
        body: payload.payload,
      }),
      invalidatesTags: ["bets", "user", "usersActiveBets", "allActiveBets"],
    }),
    getPosts: builder.query({
      query: () => "/posts",
      providesTags: ["posts"],
    }),
    createPost: builder.mutation({
      query: (payload) => ({
        url: "/posts",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["posts"],
    }),
  }),
});

// RTK automatically creates a function for you based on your query name
export const {
  useGetMLBQuery,
  useGetNHLQuery,
  useGetNBAQuery,
  useGetNFLQuery,
  useGetActiveBetsQuery,
  useGetUserQuery,
  useUpdateUserFundsMutation,
  useCreateBetsMutation,
  useUpdateBetsMutation,
  useCreateOrderMutation,
  useUpdateOrderMutation,
  useGetSingleGameQuery,
  useGetUsersActiveBetsQuery,
} = apiSlice;
