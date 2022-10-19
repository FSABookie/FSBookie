import React, { useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useDispatch } from "react-redux";
import {
  useGetPostsQuery,
  useGetPostQuery,
  useGetUserQuery,
  useCreatePostMutation,
  useDeletePostMutation,
} from "../../src/redux/slices/apiSlice";
import { selectId } from "../../src/redux/slices/postSlice";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const Content = styled.div`
height: 100%;
background-color: white;
/* I was thinking we can Have a cool background image for our Forums Page! */
background: url('/p404.png'), #D5D3D3;

.postList {
  list-style: none;
  font-size: 1.1em;
  padding: 0;
}

.row{
  background-color: white;
  padding: 1.5%;
  width: 100%;
}

 .footer {
  border-top: 1.5px solid black;
  color:#D5D3D3;
  background-color: #D5D3D3;
  text-align: center;
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
 }

 .postTitle {
  padding: 0;
  margin: 4%;
 }

 .postDetails {
  padding: 0;
  margin: 4%;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
 }

 .Header {
  text-align: center;
  padding-top: 4%;
 }

 .createPost {
  padding: 2%;
  border: none;
  font-size: 1em;
 }
`;

//I am Assuming I need 

function Posts() {
  const { data: posts } = useGetPostsQuery();
  const dispatch = useDispatch();
  // IDK if we should do getSingleUserQuery like here or create another APIslice to get all Users
  // and then just plug in the ID given from post.userId

  return (
  <Content>
    {/* <Link href={'/posts/createpost'}>
      <div className="Header">
      <button className="createPost">Create Post</button>
      </div>
    </Link> */}
    {posts?.length && posts.map((post) => {
        return (
          <ul key={post.id} className="postList">
          <li className='row'>
              <Link href={{pathname: `/posts/${post.id}`, query: {id: post.id}}}>
              <h4 onClick={() => dispatch(selectId(post.id))}>
                  {post.title}
                </h4>
              </Link>
              <p className="postDetails">
                <div className="postDetail">
               Posted by: {post.username} {post.createdAt}<br></br> </div>
               <div className="postDetail">
               <ThumbUpIcon fontSize="small"/> {post.likes} <br></br>
               </div>
               {/* <div className="postDetail">
              Created At: {post.createdAt}<br></br></div> */}
              {post.comments.length} comments
              </p>
            </li>
          </ul>
    )})}
    <div className="footer">
    <Link href={'/posts/createpost'}>
        <button className="createPost">Create Post</button>
        </Link>
    </div>
  </Content>
  );
}

export default Posts;
