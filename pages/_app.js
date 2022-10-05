import "../styles/globals.css";
import styled from "styled-components";
import { Provider } from "react-redux";
import { apiSlice } from "../src/redux/slices/apiSlice";
import { store } from "../src/redux/store/store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider api={apiSlice} store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
