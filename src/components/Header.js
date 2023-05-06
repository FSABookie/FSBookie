import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styled from "styled-components";
import { signOut, useSession } from "next-auth/react";
import { FaUser } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { useGetUserQuery } from "../redux/slices/apiSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { useRouter } from "next/router";

const HeaderContainer = styled.div`
  display: hidden;
  color: white;
  h1,
  p {
    :hover {
      color: lightgray;
    }
  }

  .userBalance {
    color: green;
    display: flex;
    flex-direction: row;
    @media (max-width: 849px) {
      width: 100px;
      justify-content: space-evenly;
    }

    .balance {
      font-size: 0.8em;
    }

    &:hover {
      cursor: pointer;
    }
    .depositFunds {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .depositIcon {
    padding-top: 20%;
    color: lightgreen;
  }

  @media only screen and (min-width: 850px) {
    .userBalance {
      color: green;
      display: flex;
      flex-direction: row;
      width: 200px;
      justify-content: flex-end;
      gap: 5px;
      padding-right: 10px;
      .balance {
        font-size: 1em;
      }
    }
  }
`;

const HeaderTop = styled.div`
  height: 100%;
  background-color: black;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  * {
    margin: auto 0;
  }
  p {
    margin-top: 0.27em;
    padding: 0 0.4em 0.15em;
  }

  .hide {
    min-height: 10px;
    position: absolute;
    left: 0;
    top: 4%;
    height: 530vh;
    transition: 0.5s;
    overflow: hidden;
    text-overflow: clip;
    white-space: nowrap;
    width: 0%;
    z-index: 4;
  }

  .logo {
    height: 2.5em;
    .imglogo {
      height: 100%;
      padding-left: 10%;
    }
  }

  .loginLogo {
    height: 2.5em;
    .imglogoLogin {
      height: 100%;
      padding-left: 30%;
    }
  }

  @media only screen and (min-width: 850px) {
    height: 100%;
    background-color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    * {
      margin: auto 0;
    }
    p {
      margin-top: 0.27em;
      padding: 0 0.4em 0.15em;
    }

    .hide {
      min-height: 10px;
      position: absolute;
      left: 0;
      top: 4%;
      height: 530vh;
      transition: 0.5s;
      overflow: hidden;
      text-overflow: clip;
      white-space: nowrap;
      width: 0%;
      z-index: 4;
    }
  }
`;

const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const LogoLinkContainer = styled.div`
  width: 200px;
  justify-content: right;
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
  @media (max-width: 849px) {
    width: 100px;
  }
`;

const Page = styled.div`
  @media only screen and (min-width: 500px) {
    width: 50%;
  }
  @media only screen and (min-width: 850px) {
    width: 20%;
  }
  width: 70%;
  transition: 0.5s;
  position: absolute;
  left: 0;
  height: 530vh;
  z-index: 4;
  top: 4%;
  overflow: hidden;
  text-overflow: clip;
  white-space: nowrap;
  @media only screen and (min-width: 375px) {
    background: #242424;
  }
  button {
  }
  .active {
    opacity: 1;
  }

  .sideLinks {
    padding-left: 4%;
    padding-top: 4%;
    padding-bottom: 4%;
    display: flex;
    flex-direction: column;
    gap: 1.5em;
  }

  .singleLink {
    @media only screen and (max-width: 849px) {
      border-bottom: 1px solid grey;
      padding-bottom: 5%;
    }
    padding-bottom: 5%;
  }
`;
const Menu = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  color: white;
  width: 100%;
  a {
    display: block;
  }
`;

const HamburgerContainer = styled.div`
  @media (min-width: 850px) {
    width: 200px;
  }
  width: 100px;
  padding-left: 10px;
  box-sizing: border-box;
`;

const DepositButton = styled.button`
  background-color: rgb(144, 238, 144);
  border: none;
  border-radius: 2px;
  color: black;
  width: 100%;
  cursor: pointer;
`;

//COMPONENT STARTS HERE
function Header() {
  const { data: session, status } = useSession();

  const useIsMounted = () => {
    const isMounted = useRef(false);
    useEffect(() => {
      isMounted.current = true;
      return () => (isMounted.current = false);
    }, []);
    return isMounted;
  };

  let userStatusLink = "/login";
  if (typeof window !== "undefined") {
    if (session) {
      userStatusLink = "/account";
    }
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/sportsbook" });
  };

  const mySidenavRef = useRef();
  const [isOpen, setOpen] = useState(false);

  function toggleNav() {
    setOpen(!isOpen);
    mySidenavRef.current.classList.toggle("hide");
  }

  const { data: singleuser, isSuccess } = useGetUserQuery(
    status === "authenticated" ? session.user.id : skipToken
  );

  useEffect(() => {}, [isSuccess, singleuser]);
  // if we want to hide search when user switch pages, maybe should add 'isSearching' to redux store
  // also need to allow user to exit out by clicking elsewhere
  const isMounted = useIsMounted();
  return (
    <HeaderContainer>
      <HeaderTop className="hfLinks">
        <HamburgerContainer>
          {" "}
          <GiHamburgerMenu className="burgermenu" onClick={toggleNav} />
        </HamburgerContainer>

        <Page ref={mySidenavRef} className={isMounted ? "hide" : ""}>
          <Menu className="sidenav">
            <div className="sideLinks" onClick={toggleNav}>
              <div className="singleLink">
                <Link href="/sportsbook">Sportsbook</Link>
              </div>
              <div className="singleLink">
                <Link href="/myBets">My Bets</Link>
              </div>
              <div className="singleLink">
                <Link href="/help/howtobet">How To Bet</Link>
              </div>
              <div className="singleLink">
                <Link href="/posts">Forum</Link>
              </div>
              <div className="singleLink">
                <Link href="/projections/NFL">Trends</Link>
              </div>
              <div onClick={handleLogout} className="singleLink">
                <Link href="/sportsbook">Sign Out</Link>
              </div>
            </div>
          </Menu>
        </Page>

        <LinkContainer>
          <Link href={userStatusLink}>
            <FaUser />
          </Link>
          <Link href="/">
            <div className="logo">
              <img src="/FSBookie.png" className="imglogo" />
            </div>
          </Link>
        </LinkContainer>

        {isSuccess ? (
          <div className="userBalance">
            <div className="balance">
              ${singleuser.balance && singleuser.balance.toFixed(2)}
            </div>
            <Link href="/deposit" className="depositFunds">
              <FiPlusCircle size={21} />
            </Link>
          </div>
        ) : (
          <Link href="/login">
            <LogoLinkContainer>
              <BiLogIn />
              <p>Login</p>
            </LogoLinkContainer>
          </Link>
        )}
      </HeaderTop>
    </HeaderContainer>
  );
}

export default Header;
