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
import { convertUTCtoTimeAgo } from "../../src/functions/TimeCoverter";
// Icons
import { BiUpvote, BiDownvote } from "react-icons/bi";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import DropDown from "../../src/components/PostComps/dropDown";
import Desktop from "../../src/components/PostComps/Desktop";
import ImageCarousel from "../../src/components/sports-components/betslipComponents/ImageCarousel";
import Head from "next/head";

const ThreadContainer = styled.div`
  color: white;
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  margin: 0px 20px 20px 20px;
  /* max-width: 800px; */
`;

const PostList = styled.div`
  width: 100%;
`;

const SortBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin-top: 10px;

  div {
    padding-right: 5px;
  }

  @media (min-width: 850px) {
    max-width: 600px;
    margin: 1rem auto;
  }
`;

const PostContainer = styled.div`
  border: 0.5px solid #666;
  background-color: #1a1a1c;
  padding: 1rem;
  margin-top: 1rem;
  width: 100%;

  @media (min-width: 850px) {
    max-width: 1200px;
    width: 100%;
    margin: 1rem auto;
  }
`;

const SinglePostHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (min-width: 850px) {
    flex-direction: row;
    align-items: center;
  }
`;

const PostTitle = styled.h3`
  color: white;
`;

const HeaderElement = styled.p`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  color: #666;
`;

const PostBody = styled.p`
  font-size: 1rem;
`;

const CommentFooter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const PostFooterText = styled.p`
  font-size: 1rem;
  padding-right: ${({ likes }) => (likes ? "15px" : "10px")};
  padding-left: ${({ likes }) => (likes ? "15px" : "10px")};
  color: #666;
`;

const FooterEleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  @media (min-width: 850px) {
    padding-left: 3%;
  }
`;

const CreatePostBtn = styled.div`
  height: 4vh;
  /* width: 600px; */
  padding-inline: 15px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-top: 5%;
  @media (min-width: 849px) {
    display: none;
  }
`;

const PostHeader = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const BannerHolder = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 5em;
  width: 100%;
  margin-bottom: 3%;
`;

const Banner = styled.img`
  height: 100%;
  width: 100%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  object-fit: cover;
`;

const DesktopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

  const style = { cursor: "pointer" };

  return (
    <>
      <Head>
        <title>Forums</title>
      </Head>{" "}
      <ThreadContainer>
        <ImageCarousel />
        <BannerHolder>
          <Banner src="/banner.jpeg" />
        </BannerHolder>
        <PostHeader>
          {" "}
          <SortBar>
            <div>Sort By</div>{" "}
            <DropDown options={options} setFilter={setFilter} filter={filter} />
          </SortBar>{" "}
          <Link href="/posts/createpost">
            <CreatePostBtn>
              <h3>Create</h3>
            </CreatePostBtn>
          </Link>
        </PostHeader>
        <DesktopContainer>
          {" "}
          <PostList>
            {filteredPosts?.length &&
              filteredPosts.map((singlePost) => {
                return (
                  <PostContainer key={singlePost.id}>
                    <SinglePostHeader>
                      <HeaderElement>{singlePost.username} </HeaderElement>
                      <HeaderElement>
                        {convertUTCtoTimeAgo(singlePost.createdAt)}
                      </HeaderElement>
                    </SinglePostHeader>
                    <Link
                      href={{
                        pathname: `/posts/${singlePost.id}`,
                        query: { id: singlePost.id },
                      }}
                    >
                      <PostTitle>{singlePost.title}</PostTitle>
                      <PostBody>{singlePost.body}</PostBody>
                    </Link>
                    <CommentFooter>
                      <FooterEleContainer likes={true}>
                        <BiUpvote
                          style={style}
                          fontSize="large"
                          onClick={() =>
                            handleLikes({
                              id: singlePost.id,
                              payload: { likes: singlePost.likes + 1 },
                            })
                          }
                        />
                        <PostFooterText>{singlePost.likes}</PostFooterText>
                        <BiDownvote
                          style={style}
                          fontSize="large"
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
                        <PostFooterText>
                          {singlePost.comments.length}
                        </PostFooterText>
                      </FooterEleContainer>
                      <FooterEleContainer>
                        <ShareIcon />
                        <PostFooterText>Share</PostFooterText>
                      </FooterEleContainer>
                    </CommentFooter>
                  </PostContainer>
                );
              })}
          </PostList>{" "}
          <Desktop />
        </DesktopContainer>
      </ThreadContainer>
    </>
  );
}
