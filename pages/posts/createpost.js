import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useCreatePostMutation } from "../../src/redux/slices/apiSlice";
import { WindowSharp } from "@mui/icons-material";

const Content = styled.div`
  height: 100vh;
  background-color: white;
  background: url("/basketball.png"), #242424;

  .postForm {
    display: flex;
    flex-direction: column;
    gap: 1em;
    text-align: center;
  }

  .topbar {
    padding-top: 10%;
    display: flex;
    flex-direction: column;
    gap: 1em;
    text-align: center;
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
`;

function CreatePost() {
  const { data: session } = useSession();
  console.log(session);
  const [CreatePost] = useCreatePostMutation();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    console.log(title, body);
  }, [title, body]);

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
      {session ? (
        <div className="topbar">
          <form className="postForm">
            <label>
              <input
                className="addTitle"
                placeholder="Add a title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label>
              <textarea
                className="bodyText"
                placeholder="Add optional body text"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </label>
            <div className="creatBtn">
              <PostButton
                type="submit"
                className="postButton"
                onClick={handleSubmit}
                allowed={title.length > 10 && body.length > 15}
              >
                Create Post!
              </PostButton>
            </div>
          </form>
        </div>
      ) : (
        <>
          <h1>PLEASE LOGIN or CREATE an ACCOUNT before CREATING a NEW POST</h1>
        </>
      )}
    </Content>
  );
}

export default CreatePost;
