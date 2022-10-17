import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import {
    useGetPostQuery,
} from "../../src/redux/slices/apiSlice";
import axios from "axios";

const Content = styled.div`
background-color: white;
background: url('/p404.png'), grey;
`
//Actually MAP OUT EACH COMMENT NOW
//Grab session.username when CREATING A POST
//Able to post a new comment in the thread
//Needed some clarification but I believe I would need to adjust my API slice
//and move my getSinglePostQuery to a seperate slice here to store in redux store

export async function getServerSideProps(context) {
    console.log(context);
    const { data: post } = await axios.get(`http://localhost:3000/api/posts/${context.params.id}`);
    return {
        props: {post}
    }
}

function SinglePost(props) {

    return (
        <Content>
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
                </div>
                </li>
                );
            })}
        </ul>
       </Content>
    );
}

export default SinglePost;

