import connectDB from '@/config/database';
import User from '@/models/User';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import type { NextAuthOptions } from "next-auth"
import { Profile } from 'next-auth';



export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent" as const,
          access_type: "offline" as const,
          response_type: "code" as const
        }
      }
    }),
  ],
  callbacks: {
    async signIn(props): Promise<any> {
      const { profile } : { profile?: any } = props;
      await connectDB();
      const userExists = await User.findOne({ email: profile?.email });
      if (!userExists) {
        const username = profile?.name?.slice(0, 20);
        await User.create({
          email: profile?.email,
          username,
          image: profile.picture
        });
      }
      return true;
    },
    // Modifies the session object
    async session({ session }: { session: any }): Promise<any> {
      const user = await User.findOne({ email: session.user.email });
      session.user.id = user?._id.toString();
      return session;
    }
  }
}