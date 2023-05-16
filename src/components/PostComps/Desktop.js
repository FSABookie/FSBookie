import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { useSession } from "next-auth/react";

const DesktopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const DesktopViewColumn = styled.div`
  display: none;
  @media (min-width: 849px) {
    height: 100%;
    width: 40%;
    display: flex;
    flex-direction: column;
    margin: 1rem auto;
    margin-left: 1.5%;

    .createPost {
      margin-top: 3%;
      background-color: #1a1a1c;
      color: white;
      border-style: none;
      border: 0.5px solid #666;
      padding: 3%;
      font-size: 1.25em;
      cursor: pointer;
      width: 100%;
    }

    .promoImg {
      height: 100%;
      width: 100%;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      object-fit: cover;
      margin-top: 3%;
    }

    .rules {
      border: 0.5px solid #666;
      background-color: #1a1a1c;
      padding: 1rem;
      width: 100%;
      margin-top: 3%;

      p {
        font-size: 0.8em;
      }
    }
  }

  .about {
    @media (min-width: 850px) {
      border: 0.5px solid #666;
      background-color: #1a1a1c;
      padding: 1rem;
      width: 100%;
    }

    p {
      font-size: 0.8em;
    }
  }
`;

function Desktop() {
  const { data: session } = useSession();

  return (
    <>
      <DesktopViewColumn>
        <div className="about">
          About Community
          <p>
            Sportsbetting Forum for users to gather together to discuess
            anything related to sports, betting, and our application. Any
            feedback is welcome as long as its within our rules.
          </p>
        </div>
        {session ? (
          <Link href="/posts/createpost">
            <button className="createPost">Create a Post</button>
          </Link>
        ) : (
          <Link href="/login">
            <button className="createPost">
              Sign In To Share Your Thoughts Here
            </button>
          </Link>
        )}

        <div className="rules">
          Forum Rules
          <p>No touting/selling picks.</p>
          <hr />
          <p>No excessive self promotion.</p>
          <hr />
          <p>Be Respectful to all.</p>
          <hr />
        </div>
        <img className="promoImg" src="/promo1.jpeg" />
      </DesktopViewColumn>
    </>
  );
}

export default Desktop;
