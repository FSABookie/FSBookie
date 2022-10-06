import "../styles/globals.css";
import styled from "styled-components";
import { Provider } from "react-redux";
import { apiSlice } from "../src/redux/slices/apiSlice";
import { store } from "../src/redux/store/store";
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: {session, ...pageProps} }) {
  return (
    <SessionProvider session={session}>
      <Provider api={apiSlice} store={store}>
        <Component {...pageProps} />
      </Provider>
    </SessionProvider>
  );
}

export default MyApp;
