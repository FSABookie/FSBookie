import React, { useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import {
  useCreateCommentMutation,
  useGetPostQuery,
  useIncrementLikeMutation,
} from "../../src/redux/slices/apiSlice";
import { useSelector } from "react-redux";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

const Content = styled.div`
  background-color: white;
  background: #D5D3D3;
  height: max-height;
  
  &:hover {
    cursor: pointer;
  }
  .userList {
    list-style: none;
    width: max-width;
    padding: 0;
    margin: 0;
  }

  .backBtnDiv {
    padding-bottom: 8%;
    padding-top: 2%;
    padding-left: 2%;
    background-color: #242424;
    
  }

  .backBtn {
    border: none;
    border-radius:8px;
    height: 1.5em;
    width: 5em;
    font-weight: 650;
    background: black;
    color: white;
    position: fixed;
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
    background-color: #242424;
    color: black;

    h4 {
      color: white;
      margin-top: 2px;
    }
  }
  
  .singleComment {
    margin-left: 10%;
  }

  .postInfo {
    padding: 4%;
    color: #D5D3D3;
    background-color: #242424;
  }

  .commentBody {
    font-weight: 300;
    padding: 1.5%;
    margin-bottom: 0;
    background-color:#d5d3d3;
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

function SinglePost() {
  const { data: session } = useSession();
  const [ incrementLike ] = useIncrementLikeMutation();
  const [CreateComment] = useCreateCommentMutation();
  const bodyRef = useRef();
  const router = useRouter();
  const { postId } = useSelector((state) => state.persistedId);
  const { data: post, isSuccess } = useGetPostQuery(
    postId ? postId : skipToken
  );

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

  async function handleLikes(payload) {
    await incrementLike(payload)
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
              <ThumbUpIcon fontSize="small" onClick={() => handleLikes({id: post.id, payload: {likes: post.likes + 1}})} /> <br></br>
              <ThumbDownIcon fontSize="small" onClick={() => handleLikes({id: post.id, payload: {likes: post.likes - 1}})} /> {post.likes} <br></br>
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
                {post.comments.map((comment, idx) => {
                  console.log(comment)
                  return (
                    <li key={idx}>
                      <div className="singleReply">
                        <h4>{comment.username}</h4>
                        <p className="commentBody">{comment.body}</p>
                        <ul>
                        {comment.comments.length ? comment.comments.map((comment, idx) => {
                          return (
                            <li key={idx}>
                              <div className="singleComment">
                              <h4>{comment.username}</h4>
                              <p className="commentBody">{comment.body}</p>
                              </div>
                            </li>
                          )
                        }) : null} 
                        </ul>
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
