import React, { useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
    useCreateCommentMutation,
} from "../../src/redux/slices/apiSlice";
import axios from "axios";

const Content = styled.div`
background-color: white;
background: url('/p404.png'), grey;
`;

const Reply = styled.div`
background-color: black;
.toggle {
    display: none;
    background-color: orange;
}
`;
//Able to post a new comment in the thread

export async function getServerSideProps(context) {
    console.log(context);
    const { data: post } = await axios.get(`http://localhost:3000/api/posts/${context.params.id}`);
    return {
        props: {post}
    }
}

function SinglePost(props) {
    const { data: session } = useSession();
    const [CreateComment] = useCreateCommentMutation();
    const bodyRef = useRef();
    const toggleRef = useRef();
    console.log(props)
    
    function replyFunc() {
         
    }

    function replyToggle() {
        toggleRef.current.classList.toggle('toggle')
        console.log(toggleRef.current)
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const payload = {
          userId: session.user.userId,
          username: session.user.username,
          body: bodyRef.current.value,
        };
        try {
          console.log(payload);
          const commment = CreateComment(payload);
          if (comment) {
            router.push(`/posts/${props.id}`);
          }
        } catch (err) {
          console.log("Failed to Post!");
          console.error(err);
        }
      }

    return (
        <Content>
            {session ? (
        <div>
        <Link href='/posts'>Click Here to go BACK to Posts!</Link>
       <h2>{props.post.title}</h2>
       <p>{props.post.body}</p>
       <p>Likes: {props.post.likes} <br></br>
        Created At: {props.post.createdAt}</p>
        By: {props.post.username}<br></br>
        <ul>
            {props.post.comments.map((comment) => {
                return (
                <li>
                <div>
                <h4>{comment.userId}</h4>
                <p>{comment.body}</p>
                <button onClick={replyToggle}>Reply</button>
                <Reply className="toggle" ref={toggleRef}>
                <input type="text" className="hiddenReply" ref={bodyRef} />
                <button type="submit" onSubmit={replyFunc}>SUBMIT REPLY</button>
                </Reply>
                </div>
                </li>
                );
            })}
        </ul>
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

