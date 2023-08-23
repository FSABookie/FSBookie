import React, { useRef, useState } from "react";
import Router from "next/router";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import {
  Container,
  InputField,
  SignUpFormContainer,
  RememberPW,
  Required,
  RequiredContainer,
  SignInButton,
  PasswordContainer,
  PasswordInput,
  EyeHolder,
  RegisterHere,
} from "../styles/register.styles";
import { MdOutlineError } from "react-icons/md";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import Footer from "../src/components/Footer";
import Link from "next/link";
import Head from "next/head";

const SignInFormContainer = styled.div`
  margin: 1em;
  color: white;

  .mainButton {
    border: none;
    width: 50%;
    height: 1.8em;
    border-radius: 8px;
    font-weight: bold;
  }

  form {
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 0.8em;
    label {
      border: none;
      margin-top: 0.5em;
      display: flex;
      justify-content: space-between;
      input {
        min-width: 55%;
      }
      input {
        width: 100%;
        height: 3em;
        border: none;
        border-radius: 8px;
      }
    }
    button {
      width: fit-content;
      margin: 0.7em auto;
    }

    @media only screen and (min-width: 850px) {
      width: 60%;
      padding-left: 35%;
    }
  }
  p {
    margin: auto;
    text-align: center;
    font-style: italic;
    a {
      text-decoration: underline;
    }
  }
`;

export default function Signup() {
  const [pw, setPw] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [type, setType] = useState("password");
  // const addressRef = useRef();
  //   const [error, setError] = useState("");
  //   const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  async function register({ email, password, username, firstName, lastName }) {
    try {
      const { data: user } = await axios.post("api/users", {
        email,
        password,
        username,
        firstName,
        lastName,
      });
      console.log(user);
      return user;
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const credentials = {
      email,
      password: pw,
      username,
      firstName: firstName,
      lastName: lastName,
      // address: addressRef.current.value,
    };

    try {
      //   setError("");
      //   setLoading(true);
      await register(credentials);
      Router.push("/login");
      // if (typeof window !== 'undefined') {
      // 	let user = JSON.parse(window.localStorage.getItem('user'));
      // }
    } catch {
      console.log("Failed to sign in");
      console.error(err);
    }
    // setLoading(false);
  }

  const handleShowPw = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  return (
    <>
      <Container>
        <Head>
          <title>Account Signup</title>
        </Head>
        <SignUpFormContainer>
          <div className="formHeader">
            {" "}
            <h2>Create your FSABookie Account</h2>
            <div>
              You&apos;ll use this one account to access all DraftKings
              features.
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <label className="input">
              <div className="label">Email</div>
              <InputField
                placeholder="Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                empty={email.length < 1}
              />
            </label>
            <RequiredContainer>
              {email.length < 1 && (
                <Required>
                  <MdOutlineError color="red" />
                  &nbsp;
                  <div>Please enter your email address</div>
                </Required>
              )}
            </RequiredContainer>

            <label className="input">
              <div className="label">Username</div>
              <InputField
                placeholder="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                empty={username.length < 1}
              />
            </label>
            <RequiredContainer>
              {email.length < 1 && (
                <Required>
                  <MdOutlineError color="red" />
                  &nbsp;
                  <div>Please enter your email address</div>
                </Required>
              )}
            </RequiredContainer>

            <label className="input">
              <div className="label">First Name</div>
              <InputField
                placeholder="First Name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                empty={firstName.length < 1}
              />
            </label>
            <RequiredContainer>
              {email.length < 1 && (
                <Required>
                  <MdOutlineError color="red" />
                  &nbsp;
                  <div>Please enter your email address</div>
                </Required>
              )}
            </RequiredContainer>

            <label className="input">
              <div className="label">Last Name</div>
              <InputField
                placeholder="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                empty={lastName.length < 1}
              />
            </label>
            <RequiredContainer>
              {email.length < 1 && (
                <Required>
                  <MdOutlineError color="red" />
                  &nbsp;
                  <div>Please enter your email address</div>
                </Required>
              )}
            </RequiredContainer>

            <label className="input">
              <div className="label">Password</div>
              <InputField
                placeholder="Password"
                type={type}
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                empty={pw.length < 1}
              />
            </label>
            {pw.length < 1 && (
              <Required>
                <MdOutlineError color="red" />
                &nbsp;
                <div>A password is required</div>
              </Required>
            )}
            <SignInButton type="submit" className="mainButton">
              Create Account
            </SignInButton>
          </form>
          <RegisterHere>
            <p>Already have an account? </p>&nbsp;
            <Link href="/login">
              <div
                style={{ textDecorationLine: "underline", fontWeight: "bold" }}
              >
                Sign In
              </div>
            </Link>
          </RegisterHere>{" "}
          <hr />
        </SignUpFormContainer>
      </Container>
      <Footer />
    </>
  );
}
