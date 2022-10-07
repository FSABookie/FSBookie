import React, { useRef, useState } from "react";
import Router from "next/router";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import authService from "../src/services/auth.service";

const SignInFormContainer = styled.div`
  margin: 1em;
  form {
    display: flex;
    flex-direction: column;
    label {
      margin-top: 0.5em;
      display: flex;
      justify-content: space-between;
      input {
        min-width: 55%;
      }
    }
    button {
      width: fit-content;
      margin: 0.7em auto;
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
  const { register } = authService;

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  // const addressRef = useRef();
  //   const [error, setError] = useState("");
  //   const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    const credentials = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
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

  return (
      <SignInFormContainer>
        <form onSubmit={handleSubmit} autoComplete="off">
          <label>
            First Name:
            <input type="text" ref={firstNameRef} />
          </label>
          <label>
            Last Name:
            <input type="text" ref={lastNameRef} />
          </label>
          {/* <label>
            Address:
            <input type="text" ref={addressRef} />
          </label> */}
          <label>
            Email:
            <input type="text" ref={emailRef} />
          </label>
          <label>
            Password:
            <input type="password" ref={passwordRef} />
          </label>
          <label>
            Confirm password:
            <input type="password" ref={confirmPasswordRef} />
          </label>
          <button type="submit" className="mainButton">Sign Up</button>
        </form>
      </SignInFormContainer>
  );
}
