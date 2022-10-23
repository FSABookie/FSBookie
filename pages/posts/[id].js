import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useSession } from "next-auth/react";
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
  .space {
    height: 50px;
    background-color: #242424
  }
  
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

    @media only screen and (min-width: 850px) {
      padding-right: 8%;
    }
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
      margin-top: 1px;
    }

    @media only screen and (min-width: 850px) {
      padding-left: 15%;

      h4{
        margin-top: 0;
        margin-bottom: 0;
      }
    }
  }
  
  .singleComment {
    margin-left: 10%;
  }

  .postInfo {
    padding: 4%;
    color: #D5D3D3;
    background-color: #242424;

    @media only screen and (min-width: 850px) {
      h2 {
        padding-left: 15%;
      }
      p {
        padding-left: 20%;
        padding-bottom: 5%;
      }

      .likes {
        padding-top: 3%;
      }
    }
  }

  .commentBody {
    font-weight: 300;
    padding: 1.5%;
    margin-bottom: 0;
    background-color:#d5d3d3;

    @media only screen and (min-width: 850px) {
      width: 70%;
      border: none;
    }

  }

  .likes {
    padding-top: 5%;
  }

  .toggle {
    display: none;
    background-color: orange;
}
`;

const Reply = styled.div`
background-color: black;
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
  //Possible way to use useState to hold bodyRef's states but causing infinite renders right now!
  // const [refs, setRefs] = useState([]);
  // const [bodyRefs, setBodyRefs] = useState([]);
  const [ incrementLike ] = useIncrementLikeMutation();
  const [ CreateComment ] = useCreateCommentMutation();
  const bodyRef = useRef();
  const refs = [];
  const bodyRefs = [];
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

  async function handleNestedComment(comment, idx) {
    const payload = {
      userId: session.user.id,
      commentId: comment.id,
      isParent: false,
      username: session.user.username,
      body: bodyRefs[idx].current.value,
    };
    try {
      const {data} = await CreateComment(payload);
      console.log(data);
    } catch (err) {
      console.log("Failed to Post!");
      console.error(err);
    }
  }

  async function handleLikes(payload) {
    await incrementLike(payload)
  }

  function replyToggle(e, idx) {
    e.preventDefault();
    refs[idx].current.classList.toggle('toggle')
    // e.target.classList.toggle('toggle')
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
              <ThumbUpIcon fontSize="small" onClick={() => handleLikes({id: post.id, payload: {likes: post.likes + 1}})} /> &nbsp;&nbsp;{post.likes} <br></br>
              <ThumbDownIcon fontSize="small" onClick={() => handleLikes({id: post.id, payload: {likes: post.likes - 1}})} />  <br></br>
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
                  // console.log(comment)
                  //I originally had my ref.push here but I am thinking of creating multiple refs in diff arrays
                  return (
                    <li key={idx}>
                      <div className="singleReply">
                        <h4>{comment.username}</h4>
                        <p className="commentBody">{comment.body}</p>
                        <div className="toggle">
                        {refs.push(React.createRef())}
                        </div>
                        <button onClick={(e) => replyToggle(e, idx)}>Reply</button>
                        {/* {setRefs(oldState => [...oldState, React.createRef()])} */}
                        <Reply className="toggle" key={idx} ref={refs[idx]}>
                        {bodyRefs.push(React.createRef())}
                        {/* {setBodyRefs(oldState => [...oldState, React.createRef()])} */}
                     <input type="text" className="hiddenReply" ref={bodyRefs[idx]} />
                     <button type="submit" onClick={() => handleNestedComment(comment, idx)}>SUBMIT REPLY</button>
                     </Reply>
                        <ul>
                        {comment.comments.length ? comment.comments.map((comment, idx) => {
                          //I am thinking of putting another onSubmit handler for Nested comments to make it easier
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
          <div className="space">
            
          </div>
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
