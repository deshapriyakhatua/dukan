import NextAuth, {CredentialsSignin} from "next-auth"
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials"
import { credentialsSignInHelper, googleSignUp } from "./lib/authHelper";

export const { handlers, signIn, signOut, auth } = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        Google,
        Credentials({
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            credentials: {
                phone: {},
                password: {},
            },
            authorize: async (credentials) => {
                let user = null;
                try {
                    const userData = await credentialsSignInHelper(credentials);
                    user = {id: userData?._id, role: userData?.role};
                    console.log(user)
                    return user;

                } catch (error) {
                    console.log('authorize: ', error.message)
                    console.dir(new CredentialsSignin())
                    throw new CredentialsSignin( error.message + '#*');
                }
            },
        }),
    ],

    // debug: true,

    pages: {
        signIn: '/auth/signin'
    },

    callbacks: {

        signIn: async ({ user, account }) => {
            // Controls whether a user is allowed to sign in or not.
            // console.log('signIn callback: ', user)

            if (account?.provider === 'google') {
                try {

                    const fetchedUser = await googleSignUp(user);
                    // Attach the id to the token for further use
                    user.customId = fetchedUser?._id;
                    user.role = fetchedUser?.role;

                } catch (error) {
                    console.log(error)
                }
            }

            return true;
        },

        async jwt({ token, user, account }) {
            // This callback is called whenever a JSON Web Token is created (i.e. at sign in) or updated (i.e whenever a session is accessed in the client).
            // console.log('jwt callback: ', token, user)
            // Persist the custom ID in the token during the sign-in process
            if(account?.provider === 'credentials') {
                if(user?.id) token.id = user?.id;
            }
            if (account?.provider === 'google') {
                if(user?.customId) token.id = user?.customId;
            }
            if(user?.role) token.role = user?.role;

            return token;
        },

        async session({ session, token }) {
            // This callback is called whenever a session is checked. (i.e. when invoking the /api/session endpoint, using useSession or getSession).
            // console.log('session callback: ', session, token)
            // Add the custom ID to the session object
            if (token.id) {
                session.user.id = token?.id;
            }
            if(token.id) { 
                session.user.id = token.id; 
            }
            if(token?.role) session.user.role = token?.role;
            return session;
        },

        authorized: async ({ request, auth }) => {
            // Invoked when a user needs authorization, using Middleware.
            const url = request.nextUrl;
            console.log('authorized callback: ')
        }
    },
})