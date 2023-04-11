import React, { useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
//Functions
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import {
  useGetPostsQuery,
  useIncrementLikeMutation,
} from "../../src/redux/slices/apiSlice";
import convertUTCtoEST from "../../src/functions/TimeCoverter";
// Icons
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";

const ThreadContainer = styled.div`
  color: white;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  /* max-width: 800px; */

  @media (max-width: 768px) {
    max-width: 100%;
    ${"" /* padding: 0 1rem; */}
  }
`;

const PostList = styled.div`
  width: 100%;
  max-width: 800px;

  @media (max-width: 850px) {
    max-width: 100%;
  }
`;

const CommentContainer = styled.div`
  border: 0.5px solid #666;
  background-color: #1a1a1c;
  padding: 1rem;
  margin-top: 1rem;
  width: 100%;

  @media (min-width: 850px) {
    max-width: 600px;
    margin: 1rem auto;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (min-width: 850px) {
    flex-direction: row;
    align-items: center;
  }
`;

const CommentTitle = styled.h3`
  color: white;
`;

const HeaderElement = styled.p`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: #666;
`;

const CommentContent = styled.p`
  font-size: 1rem;
`;

const CommentFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const CommentFooterText = styled.p`
  font-size: 1rem;
  padding-right: ${({ likes }) => (likes ? "15px" : "10px")};
  padding-left: ${({ likes }) => (likes ? "15px" : "10px")};
  color: #666;

  @media (min-width: 859px) {
    margin-left: 1rem;
  }
`;

const FooterEleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding-right: 10px;
  padding-left: 10px;
`;

const SideBar = styled.div`
  height: 7vh;
  /* width: 600px; */
  padding-inline: 15px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @media (max-width: 850px) {
    width: 100%;
  }
  h3 {
  }
`;

export default function ForumThread() {
  const { data: posts } = useGetPostsQuery();
  const [incrementLike] = useIncrementLikeMutation();
  const { data: session } = useSession();

  async function handleLikes(payload) {
    if (session) {
      await incrementLike(payload);
    } else {
      alert("Please Login To Like Posts!");
    }
  }

  return (
    <>
      {" "}
      <ThreadContainer>
        {/* <ThreadHeader>Forum Thread Title</ThreadHeader> */}
        <Link href="/posts/createpost">
          <SideBar>
            <h3>Create a Post</h3>
          </SideBar>
        </Link>
        <PostList>
          {posts?.length &&
            posts.map((singlePost) => {
              return (
                <Link
                  key={singlePost.id}
                  href={{
                    pathname: `/posts/${singlePost.id}`,
                    query: { id: singlePost.id },
                  }}
                >
                  <CommentContainer>
                    <CommentHeader>
                      <HeaderElement>{singlePost.username} </HeaderElement>
                      <HeaderElement>
                        {convertUTCtoEST(singlePost.createdAt)}
                      </HeaderElement>
                    </CommentHeader>
                    <CommentTitle>{singlePost.title}</CommentTitle>
                    <CommentContent>{singlePost.body}</CommentContent>
                    <CommentFooter>
                      <FooterEleContainer likes={true}>
                        <ThumbUpIcon
                          fontSize="small"
                          onClick={() =>
                            handleLikes({
                              id: singlePost.id,
                              payload: { likes: singlePost.likes + 1 },
                            })
                          }
                        />
                        <CommentFooterText>
                          {singlePost.likes}
                        </CommentFooterText>
                        <ThumbDownIcon
                          fontSize="small"
                          onClick={() =>
                            handleLikes({
                              id: singlePost.id,
                              payload: { likes: singlePost.likes - 1 },
                            })
                          }
                        />
                      </FooterEleContainer>
                      <FooterEleContainer>
                        <CommentIcon />
                        <CommentFooterText>
                          {singlePost.comments.length}
                        </CommentFooterText>
                      </FooterEleContainer>
                      <FooterEleContainer>
                        <ShareIcon />
                        <CommentFooterText>Share</CommentFooterText>
                      </FooterEleContainer>
                    </CommentFooter>
                  </CommentContainer>
                </Link>
              );
            })}
        </PostList>{" "}
      </ThreadContainer>
    </>
  );
}
