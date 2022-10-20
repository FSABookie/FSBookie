import React, { useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import {
    useCreatePostMutation,
} from "../../src/redux/slices/apiSlice";

const Content = styled.div`
height: 100vh;
background-color: white;
background: url('/p404.png'),#242424;


.postForm {
  display: flex;
  flex-direction: column;
  gap: 1em;
  text-align: center;
}

.topbar {
  padding-top: 10%
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

.postButton {
  text-align: center;
  width: 50%;
  height: 2em;
  border-radius: 12px;
  border: none;
  background: #d5d3d3;
}
`;

function CreatePost() {
    const { data: session } = useSession();
    console.log(session);
    const [CreatePost] = useCreatePostMutation();
    const titleRef = useRef();
    const bodyRef = useRef();
    const router = useRouter();

async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      userId: session.user.userId,
      username: session.user.username,
      title: titleRef.current.value,
      body: bodyRef.current.value
    };

    try {
      // setError("");
      // setLoading(true);
      // await login(credentials);
      console.log(payload);
      const post = CreatePost(payload);
      if (post) {
        router.push('/posts');
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
            <form className="postForm" onSubmit={handleSubmit}>
                <label >
                    <input className="addTitle" placeholder="Add a title" type="text" ref={titleRef} />
                </label>
                <label>
                    <textarea className="bodyText" placeholder="Add optional body text" ref={bodyRef}/>
                </label>
                <div className="creatBtn">
                <button type="submit" className="postButton">Create Post!</button>
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