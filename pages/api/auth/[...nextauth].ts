import NextAuth from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise, { mongoDbUri } from "~/lib/mongodb.client";
import { MongoClient } from "mongodb";

// See: https://authjs.dev/getting-started/email-tutorial
// See: https://authjs.dev/guides/providers/email
// See: https://authjs.dev/guides/basics/pages - customizing these auth pages

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    EmailProvider({
      server: process.env.AUTH_EMAIL_SERVER,
      from: process.env.AUTH_EMAIL_FROM
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
      const client = new MongoClient(mongoDbUri);
      try {
        // Check whether the submitted email address matches an existing user in the database
        await client.connect();
        const database = client.db(process.env.MONGODB_DB);
        const collection = database.collection("users");
        const cursor = collection.find();
        const userEmails: string[] = [];

        for await (const userDoc of cursor) {
          userEmails.push(userDoc.email);
        }
        if (user.email && userEmails.includes(user.email)) {
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
