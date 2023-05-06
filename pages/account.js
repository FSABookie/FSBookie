import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { useUpdateUserMutation } from "../src/redux/slices/apiSlice";
import { useGetUserQuery } from "../src/redux/slices/apiSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2em;
  align-items: center;
  padding-top: 4%;
  width: 100%;

  .Name {
    font-weight: 500;
  }

  .setting {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    background-color: #d3d5d5;
    height: 10vh;
    width: 40vw;
    color: black;
    font-size: 20px;
  }

  .header {
    color: white;
    font-family: "Open Sans", sans-serif;
    font-size: 20px;
  }

  .logout {
    display: flex;
    flex-direction: row;
    column-gap: 0.4em;
    align-items: center;
    font-weight: 500;
    .logoutIcon {
      padding-top: 10%;
    }
  }

  @media only screen and (min-width: 850px) {
    /* .body {
      padding-top: 5%;
      row-gap: 0.3em; */

    /* .setting {
        width: 60%;
        margin-bottom: 3%;
        padding: 1%;
      } */
  }
`;

const ErrorMsg = styled.h2`
  color: white;
  font-size: 40px;
  text-align: center;
`;

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
    <>
      {isSuccess ? (
        <Container>
          <div className="header">
            <h2>Settings</h2>
          </div>
          <div className="Name setting">{session.user.name}</div>
          <div className="userEmail setting">
            <div>Current Email: {user.email}</div>
            <input
              placeholder="Change Email Address"
              type="text"
              ref={emailRef}
            />

            <button type="submit" onClick={handleEmail}>
              Change Email!
            </button>
          </div>
          <div className="userName setting">
            <div>Current Username: {user.username}</div>
            <input placeholder="Change Username" type="text" ref={userRef} />

            <button type="submit" onClick={handleUsername}>
              Change Username!
            </button>
          </div>
          <div className="userPass setting">
            <input
              placeholder="Change Password"
              type="password"
              ref={passRef}
            />

            <button type="submit" onClick={handlePassword}>
              Change Password!
            </button>
          </div>
          <div className="logout setting" onClick={handleLogout}>
            <Link className="logout" href="/sportsbook">
              <div>Logout</div>
              <div className="logoutIcon">
                <BiLogOut />
              </div>
            </Link>
          </div>
        </Container>
      ) : (
        <>
          <ErrorMsg>please login or create an account</ErrorMsg>
        </>
      )}
    </>
  );
}

export default Account;
