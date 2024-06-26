import connectDB from '@/config/database';
import User from '@/models/User';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  callbacks: {
    // Invoked on successful signin
    async signIn({ profile }) {
      // Connect to the DB
      await connectDB();
      // Check if user exists
      const userExists = await User.findOne({ email: profile.email });
      // If not, add user to DB
      if (!userExists) {
        //Truncate username if too long
        const username = profile.name.slice(0, 20);
        await User.create({
          email: profile.email,
          username,
          image: profile.picture
        });
      }
      // Return true to allow signin
      return true;
    },
    // Modifies the session object
    async session({ session }) {
      // Get user from database
      const user = await User.findOne({ email: session.user.email });
      // Assign the user id to the session
      session.user.id = user._id.toString();
      // Return the session
      return session;
    }
  }
}