import React, { useEffect, useState } from "react";
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
import DropDown from "../../src/components/PostComps/dropDown";

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

  @media (max-width: 849px) {
    max-width: 100%;
  }
`;

const SortBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 10px;

  div {
    padding-right: 5px;
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

const CreatePostBtn = styled.div`
  height: 7vh;
  /* width: 600px; */
  padding-inline: 15px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @media (max-width: 849px) {
    width: 100%;
  }
  h3 {
  }
`;

const options = ["Trending", "Most Popular", "Most Recent"];

export default function ForumThread() {
  const [filter, setFilter] = useState(null);
  const { data: posts } = useGetPostsQuery();
  const [incrementLike] = useIncrementLikeMutation();
  const { data: session } = useSession();
  const [filteredPosts, setFP] = useState();

  useEffect(() => {
    posts && setFP(posts);
    let arr = [];

    if (posts) {
      arr.push(...posts);
    }

    if (filter === "Most Recent") {
      setFP(
        arr.sort(function (a, b) {
          return b.createdAt - a.createdAt;
        })
      );
    }
    if (filter === "Most Popular") {
      setFP(
        arr.sort(function (a, b) {
          return b.likes - a.likes;
        })
      );
      console.log(filteredPosts);
    }
  }, [filter, posts]);

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
          <CreatePostBtn>
            <h3>Create a Post</h3>
          </CreatePostBtn>
        </Link>
        <SortBar>
          <div>Sort By</div>{" "}
          <DropDown options={options} setFilter={setFilter} filter={filter} />
        </SortBar>
        <PostList>
          {filteredPosts?.length &&
            filteredPosts.map((singlePost) => {
              return (
                <CommentContainer key={singlePost.id}>
                  <CommentHeader>
                    <HeaderElement>{singlePost.username} </HeaderElement>
                    <HeaderElement>
                      {convertUTCtoEST(singlePost.createdAt)}
                    </HeaderElement>
                  </CommentHeader>
                  <Link
                    href={{
                      pathname: `/posts/${singlePost.id}`,
                      query: { id: singlePost.id },
                    }}
                  >
                    <CommentTitle>{singlePost.title}</CommentTitle>
                  </Link>
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
                      <CommentFooterText>{singlePost.likes}</CommentFooterText>
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
              );
            })}
        </PostList>{" "}
      </ThreadContainer>
    </>
  );
}
