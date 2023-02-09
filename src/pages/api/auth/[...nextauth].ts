import { NextAuthDbAdapter } from '@/auth/backend/adapters/NextAuthDbAdapter'
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { AuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    // TODO: error page
    error: '/auth/error',
  },
  adapter: NextAuthDbAdapter(),

  callbacks: {
    session({ session, token, user }) {
      return {
        ...session,
        user: { email: user.email ?? '', id: user.id, name: user.name ?? '' },
      }
    },
  },
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, authOptions)
}
