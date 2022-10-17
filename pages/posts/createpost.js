import React, { useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import {
    useCreatePostMutation,
} from "../../src/redux/slices/apiSlice";

const Content = styled.div`
height: 100%;
background-color: white;
/* I was thinking we can Have a cool background image for our Forums Page! */
background: url('/p404.png'), grey;
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
            <h1>Create a Post!</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Title: 
                    <input type="text" ref={titleRef} />
                </label>
                <label>
                    <textarea ref={bodyRef}/>
                </label>
                <button type="submit" className="postButton">Create Post!</button>
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