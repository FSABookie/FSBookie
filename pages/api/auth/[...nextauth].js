import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

const URL =
	(process.env.BASE_URL || 'http://localhost:3000/') + 'api/auth/login';

export default NextAuth({
	pages: {
		signIn: '/login',
	},
	providers: [
		CredentialsProvider({
			name: 'Credentials',

			async authorize(credentials, req) {
				// Add logic here to look up the user from the credentials supplied
				try {
					// creates token if user is valid
					const { data: token } = await axios.post(URL, {
						email: credentials.email,
						password: credentials.password,
					});
					// verifies if token is valid
					if (token) {
						const { data: user } = await axios.get(URL, {
							headers: {
								authorization: `${token}`,
							},
						});
						user.token = token;
						// console.log('successfully logged in', user);
						return user;
					}
				} catch (err) {
					console.error(err);
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user, account, profile, isNewUser }) {
			// Persist the OAuth access_token and or the user id to the token right after signin
			if (user) {
				token.id = user.id;
				token.isAdmin = user.isAdmin;
                token.name = user.firstName, user.lastName;
			}
			return token;
		},
		async session({ session, token, user }) {
			// Send properties to the client, like an access_token and user id from a provider.
            console.log(session, token, user);
			session.user.isAdmin = token.isAdmin;
			session.user.id = token.id;
            session.user.name = token.name;

			return session;
		},
	},
});
