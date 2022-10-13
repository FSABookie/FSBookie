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
    getPosts: builder.query({
      query: () => "/posts",
      providesTags: ["posts"],
    }),
    getPost: builder.query({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "GET",
      }),
      providesTags: ["posts"]
    }),
    createPost: builder.mutation({
      query: (payload) => ({
        url: "/posts",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["posts"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["posts"],
    }),
    getComments: builder.mutation({
      query: () => "/posts/comments",
      providesTags: ["comments"],
    }),
    getComment: builder.mutation({
      query: (id) => ({
        url: `"/posts/comments/${id}`,
        method: "GET",
      }),
      providesTags: ["comments"],
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/posts/comments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["comments"],
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
  useCreateBetsMutation,
  useCreateOrderMutation,
} = apiSlice;
