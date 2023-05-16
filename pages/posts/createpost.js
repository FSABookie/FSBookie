import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useCreatePostMutation } from "../../src/redux/slices/apiSlice";
import Head from "next/head";

const Content = styled.div`
  height: 100vh;
  background-color: white;
  background: url("/basketball.png"), #000000;

  .postForm {
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    gap: 1em;
    text-align: center;
    margin-inline: clamp(2%, 5%, 10%);
    max-width: 75%;
    width: 100vw;
    align-self: center;
  }

  .topbar {
    /* padding-top: 10%; */
    display: flex;
    flex-direction: column;
    gap: 1em;
    text-align: center;
    padding-top: 2%;
    h1 {
      margin: 0;
      color: white;
    }
  }

  .addTitle {
    height: 3em;
    width: 100%;
    background: #d5d3d3;
    border: none;
  }

  .bodyText {
    width: 100%;
    height: 60vh;
    background: #d5d3d3;
    border: none;
    resize: none;
  }

  .postButton {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 50%;
    height: 2em;
    border-radius: 12px;
    border: none;
    background: #d5d3d3;
    align-self: center;
  }
`;

const PostButton = styled.div`
  cursor: ${({ allowed }) => (allowed ? "pointer" : "not-allowed")};
  text-align: center;
  width: 50%;
  height: 2em;
  border-radius: 12px;
  border: none;
  background: #d5d3d3;
  font-weight: 500;
`;

function CreatePost() {
  const { data: session } = useSession();
  console.log(session);
  const [CreatePost] = useCreatePostMutation();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    if (title.length < 10 || body.length < 15) return;

    const payload = {
      userId: session.user.userId,
      username: session.user.username,
      title,
      body,
    };

    try {
      // setError("");
      // setLoading(true);
      // await login(credentials);
      console.log(payload);
      const post = CreatePost(payload);
      if (post) {
        router.push("/posts");
      }
    } catch (err) {
      console.log("Failed to Post!");
      console.error(err);
    }
  }

  return (
    <Content>
      <Head>
        <title>Create Post</title>
      </Head>
      <div className="topbar">
        <h1>Create a Post</h1>
        <form className="postForm">
          <label>
            <input
              className="addTitle"
              placeholder="Title (minimum 15 characters)"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            <textarea
              className="bodyText"
              placeholder="Add some form of description to go with your title"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </label>
          <PostButton
            type="submit"
            className="postButton"
            onClick={handleSubmit}
            allowed={title.length > 10 && body.length > 15}
          >
            <p>Create Post!</p>
          </PostButton>
        </form>
      </div>
    </Content>
  );
}

export default CreatePost;
