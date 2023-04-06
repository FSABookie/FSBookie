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

// const Content = styled.div`
//   color: white;
//   height: 100%;
//   &:hover {
//     cursor: pointer;
//   }

//   h4 {
//     padding-left: 2%;
//     margin-bottom: 0;
//     font-style: oblique;
//   }

//   .postList {
//     list-style: none;
//     font-size: 1.1em;
//     padding: 0;
//     color: white;
//   }

//   .row {
//     border-top: 3px solid #242424;
//     padding: 1.5%;
//     width: 100%;
//     ${'' /* @media only screen and (min-width: 850px) {
//       // width: 100%;
//       // margin-left: 22.5%;
//     } */}
//   }

//   .footer {
//     border-top: 1.5px solid #242424;
//     color: #d5d3d3;
//     background-color: #242424;
//     text-align: center;
//     position: fixed;
//     bottom: 0;
//     right: 0;
//     width: 100%;
//   }

//   .postTitle {
//     padding: 0;
//     margin: 4%;
//   }

//   .postDetails {
//     padding: 0;
//     margin: 4%;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     gap: 0.5em;
//   }

//   .Header {
//     text-align: center;
//     padding-top: 4%;
//   }

//   .createPost {
//     padding: 2%;
//     border: none;
//     font-size: 1em;
//     background-color: #d5d3d3;
//     color: #242424;
//   }

//   @media only screen and (min-width: 850px) {
//     .createPost {
//       padding: 1.2%;
//     }
//   }
// `;

// //I am Assuming I need

// function Posts() {
//   return (
//     <Content>
//       Forums
//       {posts?.length &&
//         posts.map((post) => {
//           return (
//             <ul key={post.id} className="postList">
//               <li className="row">
// <Link
//   href={{
//     pathname: `/posts/${post.id}`,
//     query: { id: post.id },
//   }}
// >
//                   <h4 onClick={() => dispatch(selectId(post.id))}>
//                     {post.title}
//                   </h4>
//                 </Link>
//                 <div className="postDetails">
//                   <div className="postDetail">
//                     Posted by: {post.username} {convertUTCtoEST(post.createdAt)}
//                     <br></br>{" "}
//                   </div>
//                   <div className="postDetail">
// <ThumbUpIcon
//   fontSize="small"
//   onClick={() =>
//     handleLikes({
//       id: post.id,
//       payload: { likes: post.likes + 1 },
//     })
//   }
// />{" "}
//                     {post.likes}
//                     <br></br>
// <ThumbDownIcon
//   fontSize="small"
//   onClick={() =>
//     handleLikes({
//       id: post.id,
//       payload: { likes: post.likes - 1 },
//     })
//   }
// />{" "}
//                     <br></br>
//                   </div>
//                   {post.comments.length} comments
//                 </div>
//               </li>
//             </ul>
//           );
//         })}
//       <div className="footer">
//         <Link href={"/posts/createpost"}>
//           <button className="createPost">Create Post</button>
//         </Link>
//       </div>
//     </Content>
//   );
// }

// export default Posts;

const ThreadContainer = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem auto;
  max-width: 800px;

  @media (max-width: 768px) {
    max-width: 100%;
    ${"" /* padding: 0 1rem; */}
  }
`;

const CommentList = styled.div`
  width: 100%;
  max-width: 800px;

  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const CommentContainer = styled.div`
  border: 0.5px solid #666;
  background-color: #1a1a1c;
  padding: 1rem;
  margin-top: 1rem;
  width: 100%;

  @media (min-width: 769px) {
    max-width: 600px;
    margin: 1rem auto;
  }
`;

const CommentHeader = styled.div`
  display: flex;
  flex-direction: row;

  @media (min-width: 769px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
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

  @media (min-width: 769px) {
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

export default function ForumThread() {
  const { data: posts } = useGetPostsQuery();
  const [incrementLike] = useIncrementLikeMutation();
  const dispatch = useDispatch();
  const { data: session } = useSession();

  async function handleLikes(payload) {
    if (session) {
      await incrementLike(payload);
    } else {
      alert("Please Login To Like Posts!");
    }
  }

  return (
    <ThreadContainer>
      {/* <ThreadHeader>Forum Thread Title</ThreadHeader> */}
      <CommentList>
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
              </Link>
            );
          })}
      </CommentList>
    </ThreadContainer>
  );
}
