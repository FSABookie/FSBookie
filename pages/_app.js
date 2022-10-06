import "../styles/globals.css";
import styled from "styled-components";
import { Provider } from "react-redux";
import { apiSlice } from "../src/redux/slices/apiSlice";
import { store } from "../src/redux/store/store";
import { SessionProvider } from "next-auth/react"
import Header from "../src/components/Header";

const MainContainer = styled.div`
  position: relative;
  min-height: 100vh;
  padding-bottom: 2em;
  * {
    margin: 0;
    user-select: none;
  }
`;

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <SessionProvider session={session} basePath="capstone-bookie.herokuapp.com">
      <Provider api={apiSlice} store={store}>
        <MainContainer>
          <Header />
          <Component {...pageProps} />
        </MainContainer>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
