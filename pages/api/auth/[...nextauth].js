import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

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
                    console.log('HERE', credentials)
                    // creates token if user is valid
                    const { data: token } = await axios.post(
                        process.env.BASE_URL || 'https://capstone-bookie.herokuapp.com/' + 'api/auth/login',
                        {email: credentials.email, password: credentials.password}
                    );
                    // verifies if token is valid
                    if (token) {
                        const { data: user } = await axios.get(process.env.BASE_URL || 'https://capstone-bookie.herokuapp.com/' + 'api/auth/login', {
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
});
