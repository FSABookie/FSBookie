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

useEffect(() => {
    console.log(props)
},[])

    return (
        <Content>
       <div>Hello</div>
       </Content>
    );
}

export default SinglePost;

