import NextAuth from "next-auth";
import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";
import Providers from "next-auth/providers";
export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        const client = await connectToDatabase();
        const usersCollection = client.db().collection("users");
        const user = await usersCollection.findOne({
          email: credentials.email,
        });
        if (!user) {
          client.close();
          throw new Error("No user Found!");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) {
          client.close();
          throw new Error("Wrong password! Could not log you in.");
        }

        client.close();
        return { email: user.email };
      },
    }),
  ],
});
