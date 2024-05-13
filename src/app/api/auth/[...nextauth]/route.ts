import { User } from '@/models';
import bcrypt from 'bcrypt';
import { connect } from 'mongoose';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { NextResponse } from 'next/server';

const { MONGODB_URI, NEXTAUTH_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } =
  process.env as Record<string, string>;

const handler = NextAuth({
  secret: NEXTAUTH_SECRET,
  providers: [
    // GoogleProvider({
    //   clientId: GOOGLE_CLIENT_ID,
    //   clientSecret: GOOGLE_CLIENT_SECRET,
    // }),
    CredentialsProvider({
      id: 'credentials',
      name: 'Sign in with email',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Enter your email' },
        password: { label: 'Password', type: 'password', placeholder: 'Enter your password' },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials ?? {};

        if (!email || !password) return null;

        await connect(MONGODB_URI);

        const userFound = await User.findOne({ email }).select('+password');

        if (!userFound) return NextResponse.json({ message: 'Invalid Email' }, { status: 409 });

        const passwordMatch = await bcrypt.compare(credentials!.password, userFound.password);

        if (!passwordMatch)
          return NextResponse.json({ message: 'Invalid Password' }, { status: 409 });

        return userFound;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          _id: token.id,
          name: token.name,
        },
      };
    },
  },
});

export { handler as GET, handler as POST };
