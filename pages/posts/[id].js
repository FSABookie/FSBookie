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
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import convertUTCtoEST from "../../src/functions/TimeCoverter";
import { useDispatch } from "react-redux";
import { wrapper } from "../../src/redux/store/store";
import { apiSlice } from "../../src/redux/slices/apiSlice";
import { useRouter } from "next/router";

const Content = styled.div`
  background-color: #242424;
  height: 100vh;
  margin: 5%;
  padding-left: 2%;

  .postBody {
    border-top: 2px solid #d5d3d3;
    @media only screen and (min-width: 850px) {
      justify-content: center;
      margin-right: 0;
    }
  }

  .userList {
    list-style: none;
    width: max-width;
  }

  .backBtn {
    border: none;
    border-radius: 8px;
    height: 1.5em;
    width: 5em;
    font-weight: 650;
    background: black;
    color: white;
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
      ${
        "" /* margin-top: 0;
      margin-bottom: 0; */
      }
      padding-left: 2%;
    }

    @media only screen and (min-width: 850px) {
      padding-left: 15%;

      ${
        "" /* h4 {
        margin-top: 0;
        margin-bottom: 0;
      } */
      }
    }
  }

  .singleComment {
    margin-left: 10%;
  }

  .postInfo {
    color: #d5d3d3;

    background-color: #242424;
    ${"" /* padding: 4%; */}

    .contentHeader {
      display: flex;
      justify-content: space-between;
      padding-bottom: 5%;

      .userAndTitle {
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        .author {
          font-size: 0.75em;
        }

        .title {
          font-size: 1.75em;
          padding-top: 5%;
        }
      }
    }
  }

  .commentBody {
    font-weight: 300;
    padding: 1.5%;
    margin-bottom: 0;
    margin-top: 0;
    background-color: #d5d3d3;
    border: none;
    border-radius: 25px;
    @media only screen and (min-width: 850px) {
      width: 70%;
      border: none;
    }
  }

  .toggle {
    display: none;
    background-color: orange;
  }

  .replyButton {
    border-radius: 8px;
    border: none;
  }
`;

const Likes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  padding-top: 4%;
`;

const Reply = styled.div`
  background-color: #242424;
  padding-left: 20%;
  padding-top: 5%;
  padding-bottom: 5%;
  border: none;
  border-radius: 8px;

  @media only screen and (min-width: 850px) {
    padding-left: 10%;
    padding-top: 2%;
    padding-bottom: 2%;
  }
`;

const PostBodyCntr = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 5%;
`;

const ContentBody = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  padding: 4%;

  h2 {
    margin-bottom: 3%;
  }
`;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    let postId = context.params?.id;

    console.log(context);

    if (typeof postId === "string") {
      console.log("DISPATCH");
      store.dispatch(apiSlice.endpoints.getPost.initiate(postId));
    }

    // await Promise.all(apiSlice.util.getRunningOperationPromise());
    // console.log("SERVER STATE", store.getState().pokemonApi);

    return {
      props: {},
    };
  }
);

function SinglePost(props) {
  const { data: session } = useSession();
  //Possible way to use useState to hold bodyRef's states but causing infinite renders right now!
  // const [refs, setRefs] = useState([]);
  // const [bodyRefs, setBodyRefs] = useState([]);
  const [incrementLike] = useIncrementLikeMutation();
  const [CreateComment] = useCreateCommentMutation();
  const bodyRef = useRef();
  const refs = [];
  const bodyRefs = [];
  const { query } = useRouter();
  const { data: post, isSuccess } = useGetPostQuery(
    query.id ? query.id : skipToken
  );

  useEffect(() => {
    console.log(post);
  }, [post]);

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
      const { data } = await CreateComment(payload);
      console.log(data);
    } catch (err) {
      console.log("Failed to Post!");
      console.error(err);
    }
  }

  async function handleLikes(payload) {
    await incrementLike(payload);
  }

  function replyToggle(e, idx) {
    e.preventDefault();
    refs[idx].current.classList.toggle("toggle");
    // e.target.classList.toggle('toggle')
  }

  return (
    post && (
      <Content>
        <PostBodyCntr>
          <Likes>
            <ArrowCircleUpOutlinedIcon
              fontSize="small"
              onClick={() =>
                handleLikes({
                  id: post.id,
                  payload: { likes: post.likes + 1 },
                })
              }
            />{" "}
            {post.likes} <br></br>
            <ArrowCircleDownOutlinedIcon
              fontSize="small"
              onClick={() =>
                handleLikes({
                  id: post.id,
                  payload: { likes: post.likes - 1 },
                })
              }
            />{" "}
          </Likes>
          <ContentBody>
            <div className="postInfo">
              <div className="contentHeader">
                {" "}
                <div className="userAndTitle">
                  <div className="author">
                    Posted By: {post.username} {convertUTCtoEST(post.createdAt)}
                  </div>
                  <div className="title">{post.title}</div>
                </div>
                <Link href="/posts">
                  <div className="backBtnDiv">
                    <button className="backBtn">BACK</button>
                  </div>
                </Link>
              </div>
            </div>
            <div>{post.body}</div>
            <form className="replyForm" onSubmit={handleSubmit}>
              <label>
                <input
                  className="commentInput"
                  placeholder="Add a Comment..."
                  type="text"
                  ref={bodyRef}
                />
              </label>
              <button className="replyBtn" type="submit">
                Reply
              </button>
            </form>
          </ContentBody>
        </PostBodyCntr>
        <ul className="userList">
          {post.comments.map((comment, idx) => {
            // console.log(comment)
            //I originally had my ref.push here but I am thinking of creating multiple refs in diff arrays
            return (
              <li key={idx}>
                <div className="singleReply">
                  <h4>{comment.username}</h4>
                  <p className="commentBody">{comment.body}</p>
                  <div className="toggle">{refs.push(React.createRef())}</div>
                  <button
                    className="replyButton"
                    onClick={(e) => replyToggle(e, idx)}
                  >
                    Reply
                  </button>
                  {/* {setRefs(oldState => [...oldState, React.createRef()])} */}
                  <Reply className="toggle" key={idx} ref={refs[idx]}>
                    <div className="toggle">
                      {bodyRefs.push(React.createRef())}
                    </div>
                    {/* {setBodyRefs(oldState => [...oldState, React.createRef()])} */}
                    <input
                      type="text"
                      className="hiddenReply"
                      ref={bodyRefs[idx]}
                    />
                    <button
                      type="submit"
                      onClick={() => handleNestedComment(comment, idx)}
                    >
                      SUBMIT REPLY
                    </button>
                  </Reply>
                  <ul className="userList">
                    {comment.comments.length
                      ? comment.comments.map((comment, idx) => {
                          //I am thinking of putting another onSubmit handler for Nested comments to make it easier
                          return (
                            <li key={idx}>
                              <div className="singleComment">
                                <h4>{comment.username}</h4>
                                <p className="commentBody">{comment.body}</p>
                              </div>
                            </li>
                          );
                        })
                      : null}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>{" "}
      </Content>
    )
  );
}

export default SinglePost;
