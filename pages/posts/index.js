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

const Content = styled.div`
height: 100vh;
background-color: white;
/* I was thinking we can Have a cool background image for our Forums Page! */
background: url('/p404.png'), grey;
`;

//I am Assuming I need 

function Posts() {
  const { data: posts } = useGetPostsQuery();
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
            {/* I will put '/posts/${post.id}' here once the Single Post View is Up */}
              <Link href={{pathname: `/posts/${post.id}`, query: {id: post.id}}}>
                <h4>
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
