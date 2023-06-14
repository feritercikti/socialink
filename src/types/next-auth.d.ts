import NextAuth from 'next-auth/next';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    id: ObjectId;
    name: string;
    email: string;
    password: string;
  }

  interface User {
    id: ObjectId;
    name: string;
    email: string;
    password: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: ObjectId;
    name: string;
    email: string;
    password: string;
  }
}
