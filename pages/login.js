import React, { useRef, useState } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
// import authService from "../services/auth.service";
import { useDispatch } from "react-redux";
import { signIn, getSession } from "next-auth/react";
import {
  Container,
  InputField,
  LoginFormContainer,
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
import Head from "next/head";

const Login = () => {
  const [pw, setPw] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState("password");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const credentials = {
      email,
      password: pw,
    };

    try {
      signIn("credentials", { ...credentials, redirect: false })
        .then((response) => {
          // console.log(response);
          if (response.ok) {
            router.push("/sportsbook/");
          } else if (response.error === "CredentialsSignin") {
            window.alert("Bad Credentials");
          }
        })
        .catch((err) => {
          console.log("look here", err);
        });
    } catch (err) {
      console.log("Failed to sign in");
      console.error(err);
    }
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
          <title>Login</title>
        </Head>
        <LoginFormContainer>
          <div className="formHeader">
            {" "}
            <h2>Log In</h2>
            <div>to continue to FSABookie Sportsbook</div>
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
              <RememberPW>
                <div className="checkbox">
                  <input type="checkbox" />
                </div>
                Remember my username
              </RememberPW>
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
              Log In
            </SignInButton>
          </form>
          <RegisterHere>
            <p>Need an account? </p>&nbsp;
            <Link href="/signup">
              <div
                style={{ textDecorationLine: "underline", fontWeight: "bold" }}
              >
                Register here
              </div>
            </Link>
          </RegisterHere>{" "}
          <hr />
          <div className="hotline">
            If you or someone you know has a gambling problem and wants help,
            call 1-800-GAMBLER
          </div>
        </LoginFormContainer>
      </Container>
      <Footer />
    </>
  );
};

export default Login;
