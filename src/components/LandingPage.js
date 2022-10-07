import Link from "next/link";
import React from "react";
import styled from "styled-components";

const LandingpageContainer = styled.div`
  background: #1493ff;
  height: 300vh;
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  height: 3.5em;
  width: 110%;
  img {
    height: 100%;
  }
  display: flex;
  flex-direction: row;
  column-gap: 19em;
  background: #1493ff;
`;
const Loginbtn = styled.div`
  margin-top: 1em;
`;
const Headerfoot = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 4.8em;
  width: 110%;
  color: white;
  height: 2.25em;
  padding: 0.5em;
  font-weight: 200;
  background: #1f375b;
  .sportbook {
    margin-left: 0.6em;
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
  margin-top: 6em;

  img {
    display: flex;
    width: 80%;
    margin-left: 5em;
  }
  a {
    color: lightgreen;
    background: navy;
    padding: 1.4em;
    font-weight: bold;
    border-radius: 0.55em;
    box-shadow: 0 12px 16px 4px rgb(0 0 0 / 20%);
  }
`;

const Welcomemsgbtn = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 3.25em;
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
    margin-top: 3em;
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
          <Loginbtn>
            <button>Login</button>
          </Loginbtn>
        </Header>
        <Headerfoot>
          <Link href="/sports">
            <div className="sportbook">Sportsbook</div>
          </Link>
          <div className="projections">Projections</div>
          <div className="forum">Forum</div>
        </Headerfoot>
      </Headercontainer>
      <Welcomemsg>
        <h1>MAKE EVERY MOMENT</h1>
        <span>MORE</span>
        <img src="https://s3.amazonaws.com/cdn.fanduel.com/images/2019/Homepage/Home/phones-sm.png" />
        <Link href="/sports">
          <Welcomemsgbtn>
            <a>Sport Betting {">"}</a>
          </Welcomemsgbtn>
        </Link>
      </Welcomemsg>
      <Projectionsinfo>
        <h1>WHY OURBOOKIE?</h1>
        <div className="infodiv">
          <div className="info">
            <h3 className="infotitle">What are our Projections?</h3>
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
