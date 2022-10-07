import styled from "styled-components";
import { Provider } from "react-redux";
import { apiSlice } from "../src/redux/slices/apiSlice";
import { store } from "../src/redux/store/store";
import { SessionProvider } from "next-auth/react"
import '../styles/globals.css'
const Container = styled.div `
    margin: 0;
`

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <SessionProvider session={session}>
      <Provider api={apiSlice} store={store}>
        <Container>
          <Component {...pageProps} />
        </Container>
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
