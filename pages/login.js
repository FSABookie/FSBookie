import React, { useRef, useState } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
// import authService from "../services/auth.service";
import { useDispatch } from "react-redux";
import { fetchUserThunk } from "../src/redux/slices/user-slice";
import { useGetSingleOrderQuery } from "../src/redux/slices/apiSlice";
import { signIn, getSession } from "next-auth/react";
import { handleFundsThunk } from "../src/redux/slices/Funds-slice";

const LoginFormContainer = styled.div`
  margin: 1em;
  form {
    display: flex;
    flex-direction: column;
    label {
      margin-top: 0.5em;
      display: flex;
      justify-content: space-between;
      input {
        width: 17em;
      }
    }
    button {
      margin: 0.65em auto;
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

const Login = () => {
  //   const { login } = authService;

  const emailRef = useRef();
  const passwordRef = useRef();
  // const [error, setError] = useState("");
  // const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const hanleFundsToThunk = async () => {
    const session = await getSession();
    console.log(session);
    dispatch(
      handleFundsThunk({
        id: session.user.id,
        funds: session.user.balance,
        type: null,
      })
    );
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const credentials = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      // setError("");
      // setLoading(true);
      // await login(credentials);
      console.log(credentials);
      signIn("credentials", { ...credentials, redirect: false })
        .then((response) => {
          console.log(response);
          if (response.ok) {
            router.push("/sportsbook");
          }
        })
        .then(hanleFundsToThunk)
        // .then(dispatch(handleFundsThunk({ id: user.id, funds: null, type: null })))
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("Failed to sign in");
      console.error(err);
    }
  }

  return (
    <LoginFormContainer>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" ref={emailRef} />
        </label>

        <label>
          Password:
          <input type="password" ref={passwordRef} />
        </label>

        <button type="submit" className="mainButton">
          Log In
        </button>
      </form>
      <p>
        Need an account? <Link href="/signup">Register here</Link>
      </p>
    </LoginFormContainer>
  );
};

export default Login;
