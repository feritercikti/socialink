import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { UserModel } from '@/backend/models/userModel';
import bcrypt from 'bcryptjs';
import dbConnect from '@/backend/config/dbConnect';

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        dbConnect();

        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await UserModel.findOne({ email });

        if (!user) {
          throw new Error('Invalid Email or Password');
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
          throw new Error('Invalid Email or Password');
        }

        // return user;
        return {
          ...user.toJSON(),
          id: user._id, // Use user._id instead of user.id
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (session.user) {
        session.role = token.role;
        session.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
});
