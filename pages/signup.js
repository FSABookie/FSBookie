import React, { useRef, useState } from "react";
import Router from "next/router";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import axios from "axios";

const SignInFormContainer = styled.div`
  margin: 1em;
  color:white;

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

  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const usernameRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  // const addressRef = useRef();
  //   const [error, setError] = useState("");
  //   const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  async function register({email, password, username, firstName, lastName}) {
		try {
			const {data: user} = await axios.post('api/users', {
				email,
				password,
        username,
        firstName,
        lastName
			});
      console.log(user);
      return user
		} catch (err) {
			console.error(err);
		}
	}

  async function handleSubmit(e) {
    e.preventDefault();
    const credentials = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
      username: usernameRef.current.value,
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
        <form className="signupForm" onSubmit={handleSubmit} autoComplete="off">
          <label>
            
            <input placeholder="First Name" type="text" ref={firstNameRef} />
          </label>
          <label>
           
            <input placeholder="Last Name" type="text" ref={lastNameRef} />
          </label>
          <label>
            
            <input placeholder="Username" type="text" ref={usernameRef} />
          </label>
          {/* <label>
            Address:
            <input type="text" ref={addressRef} />
          </label> */}
          <label>
         
            <input placeholder="Email Address" type="text" ref={emailRef} />
          </label>
          <label>
            
            <input placeholder="Password" type="password" ref={passwordRef} />
          </label>
          <label>
            
            <input placeholder="Confirm Password" type="password" ref={confirmPasswordRef} />
          </label>
          <button type="submit" className="mainButton">Sign Up</button>
        </form>
      </SignInFormContainer>
  );
}
