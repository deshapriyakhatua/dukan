import NextAuth from "next-auth"
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials"
import { googleSignUp } from "./lib/authHelper";


export const { handlers, signIn, signOut, auth } = NextAuth({
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
              let user = null
       
       console.log(credentials)
              if (!user) {
                // No user found, so this is their first attempt to login
                // Optionally, this is also the place you could do a user registration
                throw new Error("Invalid credentials.")
              }
       
              // return user object with their profile data
              return user
            },
          }),
    ],

    // debug: true,

    pages: {
        signIn: '/auth/signin'
    },

    callbacks: {

        session: async ({ session, token }) => {
            // console.log(token,session)
            session.user.id = token.sub; // Add user ID to the session
            return session;
        },

        signIn: async ({user, account}) => {
            // console.log(user, account)

            if(account?.provider === 'google') {
                try {
                    
                    googleSignUp(user);
                    
                } catch (error) {
                    console.log(error)
                }
            }
            
            return true;
        },

        authorized: async ({ request, auth }) => {
            const url = request.nextUrl;
            console.log('url: ',url)
        }
    },
})