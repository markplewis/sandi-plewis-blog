import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "lib/mongodb.client";
import { MongoClient } from "mongodb";

// See: https://authjs.dev/getting-started/email-tutorial
// See: https://authjs.dev/guides/providers/email
// See: https://authjs.dev/guides/basics/pages - customizing these auth pages

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
      // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    })
  ],
  callbacks: {
    // See: https://authjs.dev/guides/basics/callbacks#sign-in-callback
    async signIn({ user, email }) {
      // User has already clicked the sign-in link that was emailed to them, so allow sign-in
      if (!email?.verificationRequest) {
        return true;
      }
      // User has submitted the sign-in form but a verification email has not yet been sent to them
      let isAllowedToSignIn = false;
      const client = new MongoClient(process.env.MONGODB_URI);
      try {
        // Check whether the submitted email address matches an existing user in the database
        await client.connect();
        const database = client.db("test");
        const collection = database.collection("users");
        const cursor = collection.find();
        let userEmails = [];
        await cursor.forEach(user => {
          userEmails.push(user.email);
        });
        if (userEmails.includes(user.email)) {
          isAllowedToSignIn = true;
        }
      } catch (e) {
        console.error(e);
      } finally {
        // Ensure that the client will close upon completion/error
        await client.close();
      }
      return isAllowedToSignIn;
    }
  }
});
