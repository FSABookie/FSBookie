import Link from "next/link";
import React from "react";
import styled from "styled-components";

const LandingpageContainer = styled.div`
  background: #1493ff;
  height: 400vh;
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const Header = styled.div`
  height: 3.5em;
  width: 100%;
  img {
    height: 100%;
  }
  display: flex;
  flex-direction: row;
  column-gap: 70%;
  background: #1493ff;
  @media only screen and (min-width: 850px) {
    column-gap: 90%;
  }
`;
const Loginbtn = styled.div`
  margin-top: 1em;
`;
const Headerfoot = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 21%;
  width: 100vw;
  color: white;
  height: 2.25em;
  padding: 0.5em;
  font-weight: 200;
  background: #1f375b;
  .sportbook {
    margin-left: 0.6em;
  }

  @media only screen and (min-width: 850px) {
    column-gap: 40%;
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
    color: darkblue;
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
  a {
    color: lightgreen;
    background: navy;
    padding: 5%;
    font-weight: bold;
    border-radius: 0.55em;
    box-shadow: 0 12px 16px 4px rgb(0 0 0 / 20%);

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
`;

const Projectionsinfo = styled.div`
  height: 100vh;
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
    background: rgba(31, 55, 91, 0.5);
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
`;

const Headercontainer = styled.div`
  position: fixed;
  z-index: 4;
`;

function LandingPage() {
  return (
    <LandingpageContainer>
      <Headercontainer>
        <Header>
          <img src="header-logo.png" />
          <Link href="/login">
            <Loginbtn>
              <button>Login</button>
            </Loginbtn>
          </Link>
        </Header>
        <Headerfoot>
          <Link href="/sportsbook">
            <div className="sportbook">Sportsbook</div>
          </Link>
          <div className="projections">Projections</div>
          <Link href="/posts">
          <div className="forum">Forum</div>
          </Link>
        </Headerfoot>
      </Headercontainer>
      <Welcomemsg>
        <h1>MAKE EVERY MOMENT</h1>
        <span>MORE</span>
        <img src="https://s3.amazonaws.com/cdn.fanduel.com/images/2019/Homepage/Home/phones-sm.png" />
        <Link href="/sportsbook">
          <Welcomemsgbtn>
            <a>Sport Betting {">"}</a>
          </Welcomemsgbtn>
        </Link>
      </Welcomemsg>
      <Projectionsinfo>
        <h1>FSBookie</h1>
        <div className="infodiv">
          <div className="info">
            <h3 className="infotitle">Why Our Bookie?</h3>
            <p className="infop">
            FSBookie aims to bring the best of both worlds from your everyday forums and 
            sportsbooks statistics into one application! Our bookie not only provides live betting 
            trends and gamelines for each game but also provides users with unique trends that 
            can only be viewed on FSBookie. Trends allow the community (new or veteran users) to 
            view live statistics of bets that other users are making. This allows new users to understand 
            betting patterns better while allowing experienced users to take advantage 
            of this data to make better-informed bets. Our forums will be a middle ground for users to 
            exchange information about upcoming events while allowing for a competitive edge adding friendly-banter!
            </p>
            <h3 className="infotitle">Why Choose our Projections?</h3>
            <p className="infop">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              tincidunt hendrerit ante a porta. Maecenas ultricies tempor ex,
              vel faucibus nibh blandit sit amet. Nunc vitae ante in urna rutrum
              placerat. Nam aliquet velit in neque porttitor lacinia. Nulla sit
              amet scelerisque sem. Maecenas semper, orci et consectetur rutrum,
              nibh nisi efficitur nulla, ac mattis ex ex a risus. Curabitur in
              ante ac arcu dignissim luctus. Vestibulum sagittis iaculis
              sagittis. Etiam in scelerisque dolor. Sed consequat, felis at
              gravida aliquam, nulla sem commodo urna, id pretium metus dui vel
              massa. Quisque condimentum scelerisque pharetra. Vestibulum
              faucibus tellus vel nibh dignissim, non dapibus libero tempor.
            </p>
            <h3 className="infotitle">Our Sportsbook</h3>
            <p className="infop">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              tincidunt hendrerit ante a porta. Maecenas ultricies tempor ex,
              vel faucibus nibh blandit sit amet. Nunc vitae ante in urna rutrum
              placerat. Nam aliquet velit in neque porttitor lacinia. Nulla sit
              amet scelerisque sem. Maecenas semper, orci et consectetur rutrum,
              nibh nisi efficitur nulla, ac mattis ex ex a risus. Curabitur in
              ante ac arcu dignissim luctus. Vestibulum sagittis iaculis
              sagittis. Etiam in scelerisque dolor. Sed consequat, felis at
              gravida aliquam, nulla sem commodo urna, id pretium metus dui vel
              massa. Quisque condimentum scelerisque pharetra. Vestibulum
              faucibus tellus vel nibh dignissim, non dapibus libero tempor.
            </p>
            <h3 className="infotitle">OurBookies Forum</h3>
            <p className="infop">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              tincidunt hendrerit ante a porta. Maecenas ultricies tempor ex,
              vel faucibus nibh blandit sit amet. Nunc vitae ante in urna rutrum
              placerat. Nam aliquet velit in neque porttitor lacinia. Nulla sit
              amet scelerisque sem. Maecenas semper, orci et consectetur rutrum,
              nibh nisi efficitur nulla, ac mattis ex ex a risus. Curabitur in
              ante ac arcu dignissim luctus. Vestibulum sagittis iaculis
              sagittis. Etiam in scelerisque dolor. Sed consequat, felis at
              gravida aliquam, nulla sem commodo urna, id pretium metus dui vel
              massa. Quisque condimentum scelerisque pharetra. Vestibulum
              faucibus tellus vel nibh dignissim, non dapibus libero tempor.
            </p>
          </div>
        </div>
      </Projectionsinfo>
    </LandingpageContainer>
  );
}

export default LandingPage;
