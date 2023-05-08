import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { useUpdateUserMutation } from "../src/redux/slices/apiSlice";
import { useGetUserQuery } from "../src/redux/slices/apiSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import Head from "next/head";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2em;
  align-items: center;
  padding-top: 4%;
  width: 100%;
  margin .Name {
    font-weight: 500;
  }

  .setting {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 5px;
    background-color: #d3d5d5;
    width: 65vw;
    max-width: 400px;
    color: black;
    font-size: 20px;
    font-weight: 500;
    gap: 5px;
  }

  .header {
    color: white;
    font-family: "Open Sans", sans-serif;
    font-size: 20px;
    h2 {
      margin: 10% 0 0 0;
    }
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

  .info {
    text-align: center;
  }

  @media only screen and (max-width: 850px) {
    padding-bottom: 6%;
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
      <Head>
        <title>Account</title>
      </Head>
      {isSuccess ? (
        <Container>
          <div className="header">
            <h2>Settings</h2>
          </div>
          <div className="Name setting">{session.user.name}</div>
          <div className="userEmail setting">
            <div className="info">Current Email: {user.email}</div>
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
            <div className="info">Current Username: {user.username}</div>
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
