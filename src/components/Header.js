import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styled from "styled-components";
// redux
import { useSelector, useDispatch } from "react-redux";
import { signOut, useSession } from "next-auth/react";
// react-icons
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import { GiMeatCleaver, GiHamburgerMenu } from "react-icons/gi";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import {
  useGetUserQuery,
  useUpdateBetsMutation,
  useUpdateParlayMutation,
  useUpdateUserFundsMutation,
  useGetUsersActiveBetsQuery,
  useGetActiveParlayQuery,
} from "../redux/slices/apiSlice";
import { skipToken } from "@reduxjs/toolkit/dist/query";
import { checkBetsThunk } from "../redux/thunks/checkBets";
import { determineWinnerThunk } from "../redux/thunks/determineWinner";
import { useRouter } from "next/router";

const headerMainHeight = "7em";

const HeaderContainer = styled.div`
  display: hidden;

  color: white;
  height: 4vh;
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
    
    .balance {
      font-size: 0.8em;
    }
    
    &:hover {
      cursor: pointer;
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
  
  .logo{
    /* width: 10%; */
    height: 2.5em;
    .imglogo {
      height: 100%;
      padding-left: 10%;
    }
  }

  .loginLogo{
    /* width: 10%; */
    height: 2.5em;
    .imglogoLogin {
      height: 100%;
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

const mobileLogoTextWidth = "3.62em";

const HeaderMain = styled.div`
  margin-top: -1px;
  width: 100%;
  height: ${headerMainHeight};
  background-color: #8b0000;
  @media screen and (min-width: 750px) {
    background-color: #7b0000;
    > div {
      width: 750px;
      margin: auto;
      background-color: #8b0000;
    }
  }
  > div {
    h1 {
      margin-top: 0.13em;
    }
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .headerIconButton {
    background-color: #7b0000;
    width: calc(${headerMainHeight} - 0.5em);
    height: ${headerMainHeight};
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .headerIconButton:active {
    background-color: #660000;
  }
  /* #headerLogo {
    width: calc(${headerMainHeight} + ${mobileLogoTextWidth});
    padding-left: 0.25em;
    h1 {
      font-size: 1em;
      width: ${mobileLogoTextWidth};
      margin: 0 0.4em 0 0.5em;
    }
  } */
  .productType {
    font-size: 1.4em;
    padding: 0 0.2em;
    /* margin: 0 0.8em; */
  }
  #headerMainCenter {
    text-align: center;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-around;
    #siteTitle {
      width: fit-content;
      margin: 0.05em auto 0.15em;
      font-size: 2.1em;
      flex: 2 2 200%;
      border-bottom: 1px solid white;
    }
  }
  @media screen and (min-width: 800px) {
    // should expand logo to be wider, maybe at smaller width?
  }
`;

const LinkContainer = styled.div`
  padding-left: 15%;
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const LogoLinkContainer = styled.div`
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
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
    @media only screen and (max-width: 850px) {
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
  /* position: absolute; */
  color: white;
  width: 100%;
  a {
    display: block;
  }
`;

//COMPONENT STARTS HERE
function Header() {
  const { data: session, status } = useSession();
  const { data: user, isSuccess: gotActiveBets } = useGetUsersActiveBetsQuery(
    status === "authenticated" ? session.user.id : skipToken
  );
  const { data: parlay, isSuccess: gotParlay } = useGetActiveParlayQuery(
    status === "authenticated" ? session.user.id : skipToken
  );
  const [updateParlay] = useUpdateParlayMutation();
  const [updateBet] = useUpdateBetsMutation();
  const [updateFunds] = useUpdateUserFundsMutation();

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // gotActiveBets && console.log(user, gotActiveBets, session.user.id, parlay);
    // if we are able to successfully get users active bets
    // map through bets
    gotActiveBets &&
      user?.bets.forEach(async (bet) => {
        // fetch the api result for each active bet
        //CHECK HERE OR BACKEND FOR INCOMPLETED BETS??
        const { payload } = await dispatch(checkBetsThunk(bet.betId));
        if (payload[0]?.FinalType === "NotFinished") return;
        //dispatch data
        const data = await dispatch(
          determineWinnerThunk({ bet: bet, api: payload[0] })
        );
        // if the bet won, settle users funds

        if (data.payload === "won") {
          let payload = {
            isActive: false,
            status: "completed",
            result: "won",
          };
          await updateBet({ id: bet.id, payload });
          await updateFunds({
            funds: user.balance + bet.toWin,
            id: user.id,
          });
        }

        // IF THE BET LOSES
        if (data.payload === "lost") {
          let payload = {
            isActive: false,
            status: "completed",
            result: "lost",
          };
          await updateBet({ id: bet.id, payload });
        }
      });

    const handleWinningParlay = async (parlay) => {
      await updateParlay({
        id: parlay.id,
        payload: {
          isActive: false,
          status: "completed",
          result: "won",
        },
      });
      await updateFunds({
        funds: user.balance + parlay.toWin,
        id: user.id,
      });
    };

    gotParlay &&
      parlay?.parlays.forEach(
        async (parlay) =>
          await parlay.bets.forEach(async (bet) => {
            const { payload } = await dispatch(checkBetsThunk(bet.betId));
            if (payload[0]?.FinalType === "NotFinished") return;
            //dispatch data
            const data = await dispatch(
              determineWinnerThunk({ bet: bet, api: payload[0] })
            );
            // if the bet won, settle users funds
            if (data.payload === "won") {
              let payload = {
                isActive: false,
                status: "completed",
                result: "won",
              };
              await updateBet({ id: bet.id, payload });
            }
            // IF THE BET LOSES
            if (data.payload === "lost") {
              let payload = {
                isActive: false,
                status: "completed",
                result: "lost",
              };
              await updateBet({ id: bet.id, payload });
            }

            // if every game in the parlay is complete
            let completed = parlay.bets.every(
              (bet) => bet.status === "completed"
            );
            // check if the game lost
            if (completed) {
              // set a boolean to keep track of the bets result
              let result = true;
              await parlay.bets.forEach(async (bet) => {
                if (bet.result === "lost") {
                  await updateParlay({
                    id: parlay.id,
                    payload: {
                      isActive: false,
                      status: "completed",
                      result: "lost",
                    },
                  });
                  // set result to false if a game lost
                  result = false;
                }
              });
              // if every game won, win the parlay
              result &&
                (await handleWinningParlay({
                  id: parlay.id,
                  payload: {
                    isActive: false,
                    status: "completed",
                    result: "won",
                  },
                }));
            }
          })
      );
  }, [dispatch, router.asPath, gotActiveBets]);

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

  // if we want to hide search when user switch pages, maybe should add 'isSearching' to redux store
  // also need to allow user to exit out by clicking elsewhere
  return (
    <HeaderContainer>
      <HeaderTop className="hfLinks">
        {isSuccess ? (
          <>
            <GiHamburgerMenu className="burgermenu" onClick={toggleNav} />

            <Page ref={mySidenavRef} className={"hide"}>
              <Menu className="sidenav">
                {/* <a
								href='javascript:void(0)'
								onClick={toggleNav}
							>
								&times;
							</a> */}
                <div className="sideLinks" onClick={toggleNav}>
                  <div className="singleLink">
                    <Link href="/sportsbook/NFL">Sportsbook</Link>
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
                    <Link href="/sportsbook/NFL">Sign Out</Link>
                  </div>
                </div>
              </Menu>

              {/* <button onClick={toggleNav}>&#9776;</button> */}
            </Page>

            {/* account link - displayed as email */}
              <LinkContainer>
              <Link href={userStatusLink}>
                <FaUser />
                {/* <p>{session.user.email}</p> */}
               </Link>
            <Link href="/">
              <div className="logo">
                <img src="/FSBookie.png" className="imglogo"/>
              </div>
            </Link>
              </LinkContainer>
            {/* logout link */}
            {/* <Link href="/">
              <LinkContainer onClick={handleLogout}>
                <BiLogOut />
                <p>Logout</p>
              </LinkContainer>
            </Link> */}
            <div className="userBalance">
              <div className="balance">
                ${singleuser.balance && singleuser.balance.toFixed(2)}
              </div>
              <div className="depositFunds">
                <Link href="/deposit">
                  <ControlPointIcon fontSize="medium" className="depositIcon" />
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <GiHamburgerMenu onClick={toggleNav} />

            <Page ref={mySidenavRef}>
              <Menu className="sidenav">
                {/* <a
				href='javascript:void(0)'
				onClick={toggleNav}
			>
				&times;
			</a> */}
                <div className="sideLinks" onClick={toggleNav}>
                  <div className="singleLink">
                    <Link href="/sportsbook/NFL">Sportsbook</Link>
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
                </div>
              </Menu>

              {/* <button onClick={toggleNav}>&#9776;</button> */}
            </Page>

            <Link href="/">
              <div className="loginLogo">
                <img src="/FSBookie.png" className="imglogoLogin"/>
              </div>
            </Link>
            <Link href="/login">
              <LogoLinkContainer>
                <BiLogIn />
                <p>Login</p>
              </LogoLinkContainer>
            </Link>
          </>
        )}
        {/* {isLoggedIn && usersCart ? (
					<Link href='/cart'>
						<LinkContainer>
							<FaShoppingCart />
							<p>{`Cart (${usersCart.lineItems?.length})`}</p>
						</LinkContainer>
					</Link>
				) : (
					<Link href='/cart'>
						<LinkContainer>
							<FaShoppingCart />
							<p>{`Cart (${cart.length})`}</p>
						</LinkContainer>
					</Link>
				)} */}
      </HeaderTop>
    </HeaderContainer>
  );
}

// disabling SSR for the header, because its contents depend on the localStorage
export default Header;
