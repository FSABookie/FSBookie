import styled from "styled-components";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";

const Container = styled.div`
  width: 100%;
  height: 3.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #2025b1;
  ${"" /* border-bottom: 1px lightgray; */}

  @media screen and (max-width: 1320px) {
    margin-right: 1rem;
  }
`;

const Logo = styled.img`
  height: 100%;
`;

const ButtonSet1 = styled.div`
  width: 20rem;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;

const HomeButton = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  cursor: pointer;
`;

const MyBetButton = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  cursor: pointer;
`;

const ButtonSet2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-left: 20em;
  width: 25rem;
`;

const AuthButton = styled.button`
  padding-left: 1rem;
  padding-right: 1rem;
  cursor: pointer;
`;

const HelperDiv = styled.div`
  height: 100%;
  width: 40rem;
`;

//COMPONENT STARTS HERE

function Nav() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const dispatch = useDispatch();

  return (
    <Container>
      <Link href="/">
        <Logo src="../../Motive Logo.png" />
      </Link>
      <ButtonSet1>
        <Link href="/sports/">
          <HomeButton>Home</HomeButton>
        </Link>
        <Link href="/bethistory">
          <MyBetButton>My Bets</MyBetButton>
        </Link>
        <Link href="/finance/Deposit">
          <HomeButton>Financial Services</HomeButton>
        </Link>
      </ButtonSet1>
      <HelperDiv />
      {!isLoggedIn ? (
        <ButtonSet2>
          <Link href="/Register">
            <AuthButton>Register</AuthButton>
          </Link>
          <Link href="/login">
            <AuthButton>Log In</AuthButton>
          </Link>
        </ButtonSet2>
      ) : (
        <ButtonSet2>
          <AuthButton>Profile Page</AuthButton>
          <AuthButton
            onClick={() => {
              persistor.purge();
              dispatch(fundsSliceActions.clearFunds());
              dispatch(authActions.logout());
            }}
          >
            Sign Out
          </AuthButton>
        </ButtonSet2>
      )}
    </Container>
  );
}

export default Nav;
