import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import styled from "styled-components";
import Link from "next/link";
import { useSelector } from "react-redux";
import {
  useGetUserQuery,
  useGetPostsQuery,
  useGetPostQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useGetCommentsQuery,
  useGetCommentMutation,
  useDeleteCommentMutation,
} from "../src/redux/slices/apiSlice";

function Forums() {
  return <>
  
  </>;
}
