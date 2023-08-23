import Link from "next/link";
import React from "react";
import styled from "styled-components";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { useSession } from "next-auth/react";

const LandingpageContainer = styled.div`
  background: #36454f;
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Header = styled.div`
  height: 3.5em;
  width: 100%;
  img {
    height: 100%;
    padding-left: 0.6%;
  }
  display: flex;
  flex-direction: row;
  background: #36454f;
  justify-content: space-between;
  @media only screen and (min-width: 850px) {
  }
  .login {
    padding-right: 1%;
  }
`;

const Loginbtn = styled.div`
  margin-top: 1em;
  color: white;
  background-color: #36454f;
  border: solid 1px white;
  /* border-color: #5cdb95; */
  text-decoration: none;
  border-radius: 5px;
  padding: 5px 18px;
`;
const Headerfoot = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  color: white;
  height: 2.25em;
  padding: 0.5em;
  font-weight: 300;
  font-size: 0.85em;
  background: #376e6f;
  font-weight: 500;
  &:hover {
    cursor: pointer;
  }
  .sportbook {
    margin-left: 0.6em;
  }

  @media only screen and (min-width: 850px) {
  }
`;
const Welcomemsg = styled.div`
  height: 60vh;
  color: black;
  text-align: center;
  h1 {
    width: 100%;
    font-size: 2em;
    margin-bottom: 0;
    color: white;
    text-shadow: -0.025em -0.025em 4px rgb(0 0 0 / 25%);
  }
  span {
    color: #3dd883;
    font-size: 5em;
    font-weight: bold;
    text-shadow: -0.025em -0.025em 4px rgb(0 0 0 / 25%);
  }
  margin-top: 35%;

  @media only screen and (min-width: 850px) {
    margin-top: 12%;
  }
  img {
    display: flex;
    width: 80%;
    margin-left: 18%;

    @media only screen and (min-width: 850px) {
      width: 45%;
      margin-left: 34%;
    }
  }
  .a {
    color: black;
    background: #5cdb95;
    padding: 5%;
    font-weight: 600;
    border-radius: 0.55em;
    box-shadow: 0 12px 16px 4px rgb(0 0 0 / 20%);
    z-index: 3;

    @media only screen and (min-width: 850px) {
      padding: 2%;
    }
  }
`;

const Welcomemsgbtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 5%;
  cursor: pointer;
`;

const Projectionsinfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
  h1 {
    color: white;
    text-align: center;
    margin-top: 30%;
    text-shadow: -0.025em -0.025em 4px rgb(0 0 0 / 25%);
  }
  .infodiv {
    color: black;
  }
  .info {
    padding: 2rem;
    position: relative;
    background: #376e6f;
  }
  .infotitle {
    margin: 0 0 1rem;
    color: white;
  }
  .infop {
    margin-bottom: 1.5rem;
    color: white;
    font-weight: 250;
  }

  @media only screen and (min-width: 850px) {
    margin-top: 6%;
  }

  .howtobetButton {
    border: none;
    border-radius: 16px;
    color: black;
    background: #3dd883;
    font-weight: bold;
    padding: 1.5%;
    cursor: pointer;
  }
`;

const Headercontainer = styled.div`
  position: fixed;
  z-index: 4;
  width: 100%;
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 0.5%;
`;

function LandingPage() {
  const { data: session, status } = useSession();

  return (
    <LandingpageContainer>
      <Headercontainer>
        <Header>
          <img src="/FSBookie.png" />
          {session?.user ? (
            <ProfileContainer>
              <Link href="/account">
                <AccountBoxIcon fontSize="large" />
              </Link>
            </ProfileContainer>
          ) : (
            <Link className="login" href="/login">
              <Loginbtn>Login</Loginbtn>
            </Link>
          )}
        </Header>
        <Headerfoot>
          <Link href="/sportsbook">
            <div className="sportbook">Sportsbook</div>
          </Link>
          <Link href="/projections/NFL">
            <div className="projections">Trends</div>
          </Link>
          <Link href="/posts">
            <div className="forum">Forum</div>
          </Link>
          <Link href="/help/howtobet">
            <div className="howtobet">How to Bet</div>
          </Link>
        </Headerfoot>
      </Headercontainer>
      <Welcomemsg>
        <h1>Every Second</h1>
        <span>COUNTS</span>
        <img src="https://s3.amazonaws.com/cdn.fanduel.com/images/2019/Homepage/Home/phones-sm.png" />
        <Welcomemsgbtn>
          <Link href="/sportsbook" className="a">
            Sport Betting {">"}
          </Link>
        </Welcomemsgbtn>
      </Welcomemsg>
      <Projectionsinfo>
        <h1>FSBookie</h1>
        <div className="infodiv">
          <div className="info">
            <h3 className="infotitle">Why Our Bookie?</h3>
            <p className="infop">
              FSBookie aims to bring the best of both worlds from your everyday
              forums and live sportsbook odds into one application! Our bookie
              not only provides live betting trends and gamelines for each game
              but also provides users with unique trends that can only be viewed
              on FSBookie. Trends allow the community (new or veteran users) to
              view live statistics of bets that other users are making. This
              allows new users to understand betting patterns better while
              allowing experienced users to take advantage of this data to make
              better-informed bets. Our forums will be a middle ground for users
              to exchange information about upcoming events while allowing for a
              competitive edge adding friendly-banter!
            </p>
            <h3 className="infotitle">What Are Our Trends?</h3>
            <p className="infop">
              FSBookie provides a trends section that can be viewed as a
              compiled set of data of all user bets in our system. It displays
              statistics of betting trends which allows the user to create
              better-informed bets. This tool aims to be accessible to both new
              and veteran users as a new user can use these trends to start
              making smart bets for the first time or allow veteran users to use
              these statistics to create the best possible bet for a given game.
            </p>
            <h3 className="infotitle">Our Sportsbook!</h3>
            <p className="infop">
              The most important aspect of our application is our sportsbook. It
              contains multiple sports that follow live odds according to how
              the game is being played. Whether it may be odds for halftime, per
              quarter, or for the whole game, our application allows the user to
              see live gamelines as the game is being played. This allows the
              user to seamlessly create new bets as they see the game being
              played out and creating new bets as they deem fit according to the
              live odds.
            </p>
            <h3 className="infotitle">Our FSBookie Forum</h3>
            <p className="infop">
              At FSBookie, we believe that with sports, there should be a
              competition. Whether it is friendly-banter about your favorite
              teams to heated discussions about who is the better pick for that
              game, our forums section is a tool for the community to access and
              a middleground for sports and betting!
            </p>
            <h3 className="infotitle">Our History!</h3>
            <p className="infop">
              FSBookie was created from our inspiration that came with our love
              for sports. Being that some people in our group were unfamiliar
              with how to bet and reading gameline odds we were inspired to
              create an application that would ease in new members into the
              sports betting community while allowing veterans to access
              information that would otherwise be unavailable to any other
              sportsbookie application. Our Tech Stack includes React.js, Redux,
              Next.js, Styled-Components, RTK Queries, Next-auth, and Redux
              Thunks.
            </p>
            <h3 className="infotitle">
              For Information on How to start making Bets Click Here!
            </h3>
            <Link href="/help/howtobet">
              <button className="howtobetButton">How to Bet</button>
            </Link>
          </div>
        </div>
      </Projectionsinfo>
    </LandingpageContainer>
  );
}

export default LandingPage;
