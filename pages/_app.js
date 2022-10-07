import '../styles/globals.css';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import { apiSlice } from '../src/redux/slices/apiSlice';
import { store } from '../src/redux/store/store';
import { SessionProvider } from 'next-auth/react';
import Layout from '../src/components/Layout';

const MainContainer = styled.div`
	position: relative;
	min-height: 100vh;
	padding-bottom: 2em;
	* {
		margin: 0;
		user-select: none;
	}
`;

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
	return (
		<Provider api={apiSlice} store={store}>
			<SessionProvider session={session}>
				<MainContainer>
					<Layout Component={Component} pageProps={pageProps} />
				</MainContainer>
			</SessionProvider>
		</Provider>
	);
}

export default MyApp;
