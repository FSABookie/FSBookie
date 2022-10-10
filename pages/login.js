import React, { useRef, useState } from "react";
import Router, { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
// import authService from "../services/auth.service";
import { useDispatch } from "react-redux";
import { fetchUserThunk } from "../src/redux/slices/user-slice";
import { useGetSingleOrderQuery } from "../src/redux/slices/apiSlice";
import { signIn } from "next-auth/react";

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
        .catch((err) => {
          console.log(err);
        });
      // if (typeof window !== 'undefined') {
      // 	// let user = JSON.parse(window.localStorage.getItem('user'));
      // 	let payload = {
      // 		id: user.id,
      // 		email: user.email,
      // 		name: user.firstName + ' ' + user.lastName,
      // 		admin: user.isAdmin,
      // 	};
      // 	dispatch(fetchUserThunk(payload));
      // 	//work on posting to users cart on sign in later
      // 	Router.push('/');
      // }
    } catch (err) {
      console.log("Failed to sign in");
      console.error(err);
      // setError("Failed to sign in");
    }
    // setLoading(false);
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
