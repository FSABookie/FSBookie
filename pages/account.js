import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { useUpdateUserMutation } from "../src/redux/slices/apiSlice";
import { useGetUserQuery } from "../src/redux/slices/apiSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";

const Container = styled.div`

  .body {
    display: flex;
    flex-direction: column;
    row-gap: 2em;
    align-items: center;
    padding-top: 25%;

    .setting {
      background-color: #d3d5d5;
      padding: 3%;
      width: 70%;
      padding-left: 5%;
      height: 10%;
      color: black;
    }

    .header {
        color: white;
        padding-left: 6%;
        padding-right: 6%;
        margin-bottom: 5%; 
        font-family: "Open Sans", sans-serif;
        border: 1px solid white;
        font-size: 0.7em;
    }

    .logout {
      display: flex;
      flex-direction: row;
      column-gap: 0.4em;
      .logoutIcon {
        padding-top: 10%;
      }
    }
  }

  @media only screen and (min-width: 850px) {
    .body {
        padding-top: 5%;
        row-gap: 0.3em;
    

    .setting {
    width: 60%;
    margin-bottom: 3%;
    padding: 1%;
    }

    .header {
        color: white;
        padding-left: 3%;
        padding-right: 3%;
        margin-bottom: 5%; 
        font-family: "Open Sans", sans-serif;
        border: 2px solid white;
    }
  }
}
`;

const LinkContainer = styled.div``;

function Account() {
  const [UpdateUser] = useUpdateUserMutation();
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/sportsbook" });
  };
  const { data: session, status } = useSession();
  const { data: user, isSuccess } = useGetUserQuery(
    status === "authenticated" ? session.user.id : skipToken
  );

  const emailRef = useRef();
  const userRef = useRef();
  const passRef = useRef();

  async function handleEmail(e) {
    e.preventDefault();
    const payload = {
      email: emailRef.current.value,
    };
    try {
      await UpdateUser({ payload, id: session.user.id });
    } catch (err) {
      console.log("Failed to Update!");
      console.error(err);
    }
  }

  async function handleUsername(e) {
    e.preventDefault();
    const payload = {
      username: userRef.current.value,
    };
    try {
      await UpdateUser({ payload, id: session.user.id });
    } catch (err) {
      console.log("Failed to Update!");
      console.error(err);
    }
  }

  async function handlePassword(e) {
    e.preventDefault();
    const payload = {
      password: passRef.current.value,
    };
    try {
      await UpdateUser({ payload, id: session.user.id });
      alert("PASSWORD SUCCESSFULLY UPDATED");
    } catch (err) {
      console.log("Failed to Update!");
      console.error(err);
    }
  }

  return (
    <Container>
      {isSuccess ? (
        <div className="body">
            <div className="header">
                <h2>Settings</h2>
            </div>
          <div className="Name setting">
            {session.user.name}
          </div>
          <div className="userEmail setting">
            <div>
            {user.email}
            </div>
            <input placeholder="Change Email Address" type="text" ref={emailRef} />
            <div>
            <button type="submit" onClick={handleEmail}>
              Change Email!
            </button>
            </div>
          </div>
          <div className="userName setting">
            <div>
            {user.username}
            </div>
            <input placeholder="Change Username" type="text" ref={userRef} />
            <div>
            <button type="submit" onClick={handleUsername}>
              Change Username!
            </button>
            </div>
          </div>
          <div className="userPass setting">
            <input placeholder="Change Password" type="password" ref={passRef} />
            <div>
            <button type="submit" onClick={handlePassword}>
              Change Password!
            </button>
            </div>
          </div>
          <div className="logout setting">
            <div>Logout</div>
            <Link href="/sportsbook">
              <LinkContainer onClick={handleLogout}>
                <div className="logoutIcon">
                  <BiLogOut />
                </div>
              </LinkContainer>
            </Link>
          </div>
        </div>
      ) : (
        <>
          <p>please login or create an account</p>
        </>
      )}
    </Container>
  );
}

export default Account;
