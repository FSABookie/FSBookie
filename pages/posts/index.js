import React, { useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import {
  useGetPostsQuery,
  useGetPostQuery,
  useGetUserQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} from "../../src/redux/slices/apiSlice";
import { selectId } from "../../src/redux/slices/postSlice";
import { useDispatch } from "react-redux";

const Content = styled.div`
height: 160vh;
background-color: white;
/* I was thinking we can Have a cool background image for our Forums Page! */
background: url('/p404.png'), grey;
`;

//I am Assuming I need 

function Posts() {
  const { data: posts } = useGetPostsQuery();
  const dispatch = useDispatch();
  // IDK if we should do getSingleUserQuery like here or create another APIslice to get all Users
  // and then just plug in the ID given from post.userId

  return (
  <Content>
    <Link href={'/posts/createpost'}>
      <h2>Click Here to Create a New Post!</h2>
    </Link>
    {posts?.length && posts.map((post) => {
        return (
          <ul>
          <li className='row'>
              <Link href={{pathname: `/posts/${post.id}`, query: {id: post.id}}}>
                <h4 onClick={() => dispatch(selectId(post.id))}>
                  {post.title}
                </h4>
              </Link>
              <p>Likes: {post.likes} <br></br>
              Created At: {post.createdAt}</p>
              By: {post.username}<br></br>
              {post.comments.length} comments
            </li>
          </ul>
    )})};
  </Content>
  );
}

export default Posts;
