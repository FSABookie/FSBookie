import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import {
  useCreateCommentMutation,
  useGetPostQuery,
} from "../../src/redux/slices/apiSlice";
import axios from "axios";
import { useSelector } from "react-redux";

const Content = styled.div`
  background-color: white;
  background: url("/p404.png"), grey;
`;
//Able to post a new comment in the thread

// export async function getServerSideProps(context) {
//     const { data: post } = await axios.get(`http://localhost:3000/api/posts/${context.params.id}`);
//     return {
//         props: {post}
//     }
// }

function SinglePost(props) {
  const { data: session } = useSession();
  const [CreateComment] = useCreateCommentMutation();
  const bodyRef = useRef();
  const router = useRouter();
  const { postId } = useSelector((state) => state.persistedId);
  const { data: post, isSuccess } = useGetPostQuery(
    postId ? postId : skipToken
  );

  useEffect(() => {
    console.log(postId);
    isSuccess && console.log(post);
    console.log(post, postId);
  }, [isSuccess]);

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      userId: session.user.id,
      postId: post.id,
      isParent: true,
      username: session.user.username,
      body: bodyRef.current.value,
    };
    try {
      await CreateComment(payload);
    } catch (err) {
      console.log("Failed to Post!");
      console.error(err);
    }
  }

  return (
    <Content>
      {session ? (
        <div>
          <Link href="/posts">Click Here to go BACK to Posts!</Link>
          {isSuccess && (
            <>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              <p>
                Likes: {post.likes} <br></br>
                Created At: {post.createdAt}
              </p>
              By: {post.username}
              <br></br>
              <ul>
                {post.comments.map((comment, idx) => {
                  return (
                    <li key={idx}>
                      <div>
                        <h4>{comment.username}</h4>
                        <p>{comment.body}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>{" "}
            </>
          )}
          <form onSubmit={handleSubmit}>
            <label>
              Comment:
              <input type="text" ref={bodyRef} />
            </label>
            <button type="submit">Create Comment!</button>
          </form>
        </div>
      ) : (
        <>
          <h1>Please Login to Create a Comment!</h1>
        </>
      )}
    </Content>
  );
}

export default SinglePost;
