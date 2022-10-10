import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

const URL = (process.env.BASE_URL || 'http://localhost:3000/') + 'api/auth/login';


export default NextAuth({
    pages: {
        signIn: "/login"
    },
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			
			async authorize(credentials, req) {
				// Add logic here to look up the user from the credentials supplied
				try {
                    // creates token if user is valid
                    const { data: token } = await axios.post(
                        URL,
                        {email: credentials.email, password: credentials.password}
                    );
                    // verifies if token is valid
                    if (token) {
                        const { data: user } = await axios.get(URL, {
                            headers: {
                                authorization: `${token}`,
                            },
                        });
                        user.token = token;
                        console.log('successfully logged in');
                        return user;
                    }
                } catch (err) {
                    console.error(err);
                }
			},
		}),
	],
    callbacks: {
		async jwt({ token, user }) {
			// Persist the OAuth access_token and or the user id to the token right after signin
			if (user) {
				return user;
			}
			return token;
		},
	},
});
