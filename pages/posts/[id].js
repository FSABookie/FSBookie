import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import {
  useCreateCommentMutation,
  useGetPostQuery,
  useIncrementCommentLikeMutation,
  useIncrementLikeMutation,
} from "../../src/redux/slices/apiSlice";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import { convertUTCtoTimeAgo } from "../../src/functions/TimeCoverter";
import { wrapper } from "../../src/redux/store/store";
import { apiSlice } from "../../src/redux/slices/apiSlice";
import { useRouter } from "next/router";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { BsReply } from "react-icons/bs";
import Desktop from "../../src/components/PostComps/Desktop";
import ImageCarousel from "../../src/components/sports-components/betslipComponents/ImageCarousel";
import Head from "next/head";

const Content = styled.div`
  ${
    "" /* border: 0.5px solid #666;
  background-color: #1a1a1c;
  margin: 5%;
  padding-left: 2%;
  dislay: flex;
  flex-direction: column;
  height: 100%; */
  }
  border: 0.5px solid #666;
  background-color: #1a1a1c;
  padding: 1rem;
  width: 100%;
  margin: 1.7%;
  padding-left: 2%;
  display: flex;
  flex-direction: column;

  .backBtn {
    border: none;
    border-radius: 8px;
    height: 1.5em;
    width: 5em;
    font-weight: 650;
    background: black;
    color: white;
    cursor: pointer;
  }

  .postBody {
    border-top: 2px solid #d5d3d3;
    @media only screen and (min-width: 850px) {
      justify-content: center;
      margin-right: 0;
    }
  }

  .postInfo {
    color: #d5d3d3;

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
    font-size: 0.85em;
    padding-left: 2%;
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
  width: 90%;
  h2 {
    margin-bottom: 3%;
  }

  .body {
    font-size: 0.85em;
  }
`;

const PostFooter = styled.div`
  display: flex;
  flex-direction: row;
`;

const FooterEleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-right: 2%;
  padding-top: 7%;
  cursor: pointer;
  ${"" /* padding-left: 10px; */}
`;

const ReplySection = styled.div`
  padding-top: 5%;

  .user {
    display: flex;
    flex-direction: row;
    font-size: 0.8em;

    .name {
      color: rgb(75, 174, 236);
    }
  }

  .replyFormContainer {
    margin-top: 2%;
    display: flex;
    flex-direction: column;
    border-style: inset;
    border-width: 0.5px;
    border-radius: 5px;

    .replyTextArea {
      border: 0.5px solid #666;
      background-color: #1a1a1c;
      width: 100%;
      resize: vertical;
      color: white;
      padding: 1.5%;
      font-size: 1em;
      font-weight: 1em;
      border-style: none;
    }

    .replyFooter {
      background-color: #27272a;
      width: 100%;
      padding: 1%;
    }
  }
`;

const SubmitButton = styled.button`
  border-style: none;
  border-radius: 10px;
  padding: 1.25% 2.25% 1.25% 2.25%;
  cursor: ${({ allowed }) => (allowed ? "pointer" : "not-allowed")};
`;

const Comments = styled.ul`
  padding-bottom: 1%;
  li {
    list-style: none;
    width: max-width;
  }

  .replyForm {
    text-align: center;
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

  .replyFooter {
    border: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
  }

  .footerEleContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding-right: 3.5%;

    p {
      font-size: 0.85em;
    }
  }

  .likesContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding-right: 3.5%;
    gap: 2px;
  }

  .singleReply {
    background: white;
    width: 100%;
    background-color: #1a1a1c;
    color: white;
    padding-bottom: 3%;

    .replyHeader {
      display: flex;
      flex-direction: row;
      font-size: 0.8em;
    }

    .time {
      color: #008000;
    }
  }
`;

const DesktopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: white;
  margin: 3%;
`;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    let postId = context.params?.id;

    if (typeof postId === "string") {
      // console.log("DISPATCH");
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
  const [comment, setComment] = useState("");
  //Possible way to use useState to hold bodyRef's states but causing infinite renders right now!
  // const [refs, setRefs] = useState([]);
  // const [bodyRefs, setBodyRefs] = useState([]);
  const [incrementLike] = useIncrementLikeMutation();
  const [incrementCommentLike] = useIncrementCommentLikeMutation();
  const [CreateComment] = useCreateCommentMutation();
  const { query } = useRouter();
  const { data: post, isSuccess } = useGetPostQuery(
    query.id ? query.id : skipToken
  );

  useEffect(() => {
    // console.log(session);
  }, [session]);

  const bodyRef = useRef();
  const refs = [];
  const bodyRefs = [];

  async function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      userId: session.user.id,
      postId: post.id,
      isParent: true,
      username: session.user.username,
      body: comment,
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

  async function handleCommentLikes(payload) {
    await incrementCommentLike(payload);
  }

  function replyToggle(e, idx) {
    e.preventDefault();
    refs[idx].current.classList.toggle("toggle");
    // e.target.classList.toggle('toggle')
  }

  async function copyToClip() {
    await navigator.clipboard.writeText(location.href);
    window.alert("Link copied to clipboard");
  }

  const style = { cursor: "pointer" };

  return (
    post && (
      <>
        <Head>
          <title>Post #{post.id}</title>
        </Head>
        <ImageCarousel />
        <DesktopContainer>
          <Content>
            <PostBodyCntr>
              <Likes>
                <BiUpvote
                  style={style}
                  fontSize="large"
                  onClick={() =>
                    handleLikes({
                      id: post.id,
                      payload: { likes: post.likes + 1 },
                    })
                  }
                />{" "}
                {post.likes} <br></br>
                <BiDownvote
                  style={style}
                  fontSize="large"
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
                        Posted By: {post.username}{" "}
                        {convertUTCtoTimeAgo(post.createdAt)}
                      </div>
                      <div className="title">{post.title}</div>
                    </div>
                    <div className="backBtnDiv">
                      <Link href="/posts">
                        <button className="backBtn">BACK</button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="body">{post.body}</div>
                <PostFooter>
                  <FooterEleContainer>
                    <CommentIcon />
                    &nbsp;
                    {post.comments.length}&nbsp;Comments
                  </FooterEleContainer>
                  <FooterEleContainer onClick={copyToClip}>
                    &nbsp;
                    <ShareIcon />
                    &nbsp;Share
                  </FooterEleContainer>
                </PostFooter>
                <ReplySection>
                  <div className="user">
                    {session ? (
                      <>
                        <span>Comment as&nbsp;</span>
                        <div className="name">{session?.user.username}</div>
                      </>
                    ) : (
                      "Sign in To Comment"
                    )}
                  </div>
                  <div className="replyFormContainer">
                    <textarea
                      className="replyTextArea"
                      placeholder="What are your thoughts?"
                      rows="10"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                    <div className="replyFooter">
                      <SubmitButton
                        onClick={handleSubmit}
                        allowed={comment.length >= 1}
                      >
                        Comment
                      </SubmitButton>
                    </div>
                  </div>
                </ReplySection>
              </ContentBody>
            </PostBodyCntr>
            <Comments>
              {post.comments.map((comment, idx) => {
                // console.log(comment)
                //I originally had my ref.push here but I am thinking of creating multiple refs in diff arrays
                return (
                  <li key={idx}>
                    <div className="singleReply">
                      <div className="replyHeader">
                        <div>{comment.username} - </div>
                        <div className="time">
                          &nbsp; {convertUTCtoTimeAgo(comment.createdAt)}
                        </div>
                      </div>
                      <p className="commentBody">{comment.body}</p>
                      <div className="toggle">
                        {refs.push(React.createRef())}
                      </div>
                      {/*HEEEEEEEREEEEEEEEEE */}
                      {/* <div
                        className="replyFooter"
                        onClick={(e) => replyToggle(e, idx)}
                      > */}
                      <div className="likesContainer">
                        <BiUpvote
                          style={style}
                          onClick={() =>
                            handleCommentLikes({
                              id: comment.id,
                              payload: { likes: comment.likes + 1 },
                            })
                          }
                        />
                        <p>{comment.likes}</p>
                        <BiDownvote
                          style={style}
                          onClick={() =>
                            handleCommentLikes({
                              id: comment.id,
                              payload: { likes: comment.likes - 1 },
                            })
                          }
                        />
                      </div>
                      <div className="footerEleContainer">
                        {" "}
                        <div
                          className="replyFooter"
                          onClick={(e) => replyToggle(e, idx)}
                        >
                          <BsReply /> <p>Reply</p>
                        </div>
                        {/* <div className="footerEleContainer">
                          <p>Share</p>
                        </div> */}
                      </div>
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
                      <Comments>
                        {comment.comments.length
                          ? comment.comments.map((comment, idx) => {
                              //I am thinking of putting another onSubmit handler for Nested comments to make it easier
                              return (
                                <li key={idx}>
                                  <div className="singleReply">
                                    <div className="replyHeader">
                                      <div>{comment.username} - </div>
                                      <div className="time">
                                        &nbsp;{" "}
                                        {convertUTCtoTimeAgo(comment.createdAt)}
                                      </div>
                                    </div>
                                    <p className="commentBody">
                                      {comment.body}
                                    </p>
                                    <div className="toggle">
                                      {refs.push(React.createRef())}
                                    </div>
                                    <div
                                      className="replyFooter"
                                      // onClick={(e) => replyToggle(e, idx)}
                                    >
                                      <BiUpvote />
                                      {0}
                                      <BiDownvote />
                                    </div>
                                    {/* {setRefs(oldState => [...oldState, React.createRef()])} */}
                                    <Reply
                                      className="toggle"
                                      key={idx}
                                      ref={refs[idx]}
                                    >
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
                                        onClick={() =>
                                          handleNestedComment(comment, idx)
                                        }
                                      >
                                        SUBMIT REPLY
                                      </button>
                                    </Reply>
                                  </div>
                                </li>
                              );
                            })
                          : null}
                      </Comments>
                    </div>
                  </li>
                );
              })}
            </Comments>{" "}
          </Content>
          <Desktop />
        </DesktopContainer>
      </>
    )
  );
}

export default SinglePost;
