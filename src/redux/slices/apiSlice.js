import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

// invalidate tags and mutation is only for PUT POST DELETE
// provide tags and query is only for GET

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.fsabookie.com/api",
    // baseUrl: "http://localhost:3000/api",
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: [
    "MLB",
    "NBA",
    "NFL",
    "NHL",
    "bets",
    "user",
    "game",
    "allActiveBets",
    "usersActiveBets",
    "posts",
    "post",
    "comments",
    "parlay",
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
    updateUser: builder.mutation({
      query: (payload) => ({
        url: `/users/${payload.id}`,
        method: "PUT",
        body: payload.payload,
      }),
      invalidatesTags: ["user"],
    }),
    updateUserFunds: builder.mutation({
      query: (payload) => ({
        url: `/users/${payload.id}`,
        method: "PUT",
        body: { balance: payload.funds },
      }),
      invalidatesTags: ["user"],
    }),
    getActiveParlay: builder.query({
      query: (id) => `/users/${id}/activeParlay`,
      providesTags: ["parlay"],
    }),

    createParlay: builder.mutation({
      query: (payload) => ({
        url: "/Parlay",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["parlay", "user", "usersActiveBets"],
    }),
    updateParlay: builder.mutation({
      query: (payload) => ({
        url: `/parlay/${payload.id}`,
        method: "PUT",
        body: payload.payload,
      }),
      invalidatesTags: ["parlay", "user", "usersActiveBets"],
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
    getPost: builder.query({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "GET",
      }),
      providesTags: ["post"],
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
    // getComments: builder.query({
    //   query: () => "/posts/comments",
    //   providesTags: ["comments"],
    // }),
    // getComment: builder.mutation({
    //   query: (id) => ({
    //     url: `/posts/comments/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags: ["comments"],
    // }),
    createComment: builder.mutation({
      query: (payload) => ({
        url: `/posts/comments`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["posts", "post", "comments"],
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/posts/comments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["comments"],
    }),
    incrementLike: builder.mutation({
      query: (payload) => ({
        url: `/posts/${payload.id}`,
        method: "PUT",
        body: payload.payload,
      }),
      invalidatesTags: ["posts", "post"],
    }),
    incrementCommentLike: builder.mutation({
      query: (payload) => ({
        url: `/posts/comments/${payload.id}`,
        method: "PUT",
        body: payload.payload,
      }),
      invalidatesTags: ["comments", "posts", "post"],
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
  useGetUsersActiveBetsQuery,
  useUpdateUserFundsMutation,
  useUpdateParlayMutation,
  useCreateBetsMutation,
  useUpdateBetsMutation,
  useCreateParlayMutation,
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useCreateCommentMutation,
  useIncrementLikeMutation,
  useDeleteCommentMutation,
  useGetActiveParlayQuery,
  useUpdateUserMutation,
  useIncrementCommentLikeMutation,
} = apiSlice;
