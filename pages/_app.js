import styled from 'styled-components';
import { Provider } from 'react-redux';
import { apiSlice } from '../src/redux/slices/apiSlice';
import { store } from '../src/redux/store/store';
import { SessionProvider } from 'next-auth/react';
import Layout from '../src/components/Layout';
import "../styles/globals.css";

const Container = styled.div `
    margin: 0;
	
`;


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<Provider api={apiSlice} store={store}>
			<SessionProvider session={session}>
				<Container>
					<Layout Component={Component} pageProps={pageProps} />
				</Container>
			</SessionProvider>
		</Provider>
	);
}

export default MyApp;