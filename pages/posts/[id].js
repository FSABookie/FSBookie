import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import {
  useCreateCommentMutation,
  useGetPostQuery,
} from "../../src/redux/slices/apiSlice";
import axios from "axios";
import { useSelector } from "react-redux";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const Content = styled.div`
  background-color: white;
  background: url("/p404.png"), #D5D3D3;
  height: 100vh;
  
  .userList {
    list-style: none;
    width: max-width;
    padding: 0;
  }

  .backBtnDiv {
    padding-bottom: 8%;
    padding-top: 2%;
    padding-left: 2%;
  }

  .backBtn {
    border: none;
    border-radius:8px;
    height: 1.5em;
    width: 5em;
    font-weight: bold;
  }

  .replyForm {
    text-align: center;
    padding-top: 8%;
    padding-bottom: 5%;
  }

  .commentInput {
    border: none;
    border-radius: 8px 0 0 8px;
    width: 50%;
    height: 2em;
  }

  .replyBtn {
    border: none;
    background: white;
    border-radius: 0 8px 8px 0;
    border-left: solid 0.8px black;
    height: 2em;
  }

  .singleReply {
    background: white;
    width: 100%;
  }

  .postInfo {
    padding: 4%;
  }

  .commentBody {
    font-weight: 300;
    padding: 1.5%;
  }

  .likes {
    padding-top: 5%;
  }
`;
//Able to post a new comment in the thread

// export async function getServerSideProps(context) {
//     const { data: post } = await axios.get(`http://localhost:3000/api/posts/${context.params.id}`);
//     return {
//         props: {post}
//     }
// }

function SinglePost(props) {
  const { data: session } = useSession();
  const [CreateComment] = useCreateCommentMutation();
  const bodyRef = useRef();
  const router = useRouter();
  const { postId } = useSelector((state) => state.persistedId);
  const { data: post, isSuccess } = useGetPostQuery(
    postId ? postId : skipToken
  );

  useEffect(() => {
    console.log(postId);
    isSuccess && console.log(post);
    console.log(post, postId);
  }, [isSuccess]);

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      userId: session.user.id,
      postId: post.id,
      isParent: true,
      username: session.user.username,
      body: bodyRef.current.value,
    };
    try {
      await CreateComment(payload);
    } catch (err) {
      console.log("Failed to Post!");
      console.error(err);
    }
  }

  return (
    <Content>
      {session ? (
        <div>
          <Link href="/posts">
          <div className="backBtnDiv">
           <button className="backBtn"> BACK</button>
           </div>
            </Link>
          {isSuccess && (
            <>
             <div className="postInfo">
              Posted By: {post.username} {post.createdAt}
              
              <br></br>
              <div className="likes">
              <ThumbUpIcon fontSize="small"/> {post.likes} <br></br>
              </div>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
              <form className="replyForm" onSubmit={handleSubmit}>
            <label>
              <input className="commentInput" placeholder="Add a Comment..." type="text" ref={bodyRef} />
            </label>
            <button className="replyBtn" type="submit">Reply</button>
          </form>
          </div>
              <ul className="userList">
                {post.comments.map((comment) => {
                  return (
                    <li>
                      <div className="singleReply">
                        <h4>{comment.username}</h4>
                        <p className="commentBody">{comment.body}</p>
                      </div>
                    </li>
                  );
                })}
              </ul>{" "}
            </>
          )}
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
