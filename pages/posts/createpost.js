import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
    useGetPostQuery,
} from "../../src/redux/slices/apiSlice";

const Content = styled.div`
height: 100vh;
background-color: white;
/* I was thinking we can Have a cool background image for our Forums Page! */
background: url('/p404.png'), grey;
`;

function CreatePost() {
    const [newPost, setNewPost] = useState({});
    const { data: session } = useSession();
    const { data: post } = useGetPostQuery();
    console.log(post)

return (
    <Content>
        <div className="topbar">
            <h1>My Forum</h1>
        </div>
    </Content>
);
}

export default CreatePost;