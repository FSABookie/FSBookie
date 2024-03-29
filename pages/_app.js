import styled from "styled-components";
import { Provider } from "react-redux";
import { apiSlice } from "../src/redux/slices/apiSlice";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, wrapper } from "../src/redux/store/store";
import { SessionProvider } from "next-auth/react";
import Layout from "../src/components/Layout";
import "../styles/globals.css";

const Container = styled.div`
  margin: 0;
  min-height: 100vh;
  width: 100vw;
  max-width: 100%;
`;

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const { store, props } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider api={apiSlice} store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SessionProvider session={session}>
          <Container>
            <Layout Component={Component} pageProps={pageProps} />
          </Container>
        </SessionProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
