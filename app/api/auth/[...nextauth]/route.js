import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

const handler = NextAuth({
  //saglayicilar
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    //signup
    async session({ session }) {
      //get active user information
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      // add a userID
      session.user.id = sessionUser._id.toString();
      return session;
    },
    //signin
    async signIn({ profile }) {
      try {
        //Connect DB
        await connectToDB();
        //cehck user
        const userExist = await User.findOne({
          email: profile.email,
        });
        //Create a new user
        if (!userExist) {
          await User.create({
            username: profile.name.replace(" ", "").toLowerCase(),
            email: profile.email,
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
