import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase, findUserByEmail } from "@/utils/db-util";
import { validateEmail, validatePassword } from "@/utils/validation-rules";
import { verifyPassword } from "@/utils/auth";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  url: process.env.NEXTAUTH_URL,

  providers: [
    CredentialsProvider({
      authorize: async (credentials) => {
        const { email, password } = credentials;

        // Validate User Data
        if (!validateEmail(email) || !validatePassword(password)) {
          throw new Error("please enter valid values!");
        }

        const client = await connectToDatabase();

        // if (!client) {
        //   throw new Error("something went wrong!");
        // }

        const user = await findUserByEmail(client, "userAccounts", email);

        if (!user) {
          throw new Error("not found user!");
        }

        // Verify User Password
        const isCorrectPassword = await verifyPassword(password, user.password);

        if (!isCorrectPassword) {
          throw new Error("password incorrect!");
        }

        client.close();
        return { name: user.name, email: user.email, image: null };
      },
    }),
  ],
};

export default NextAuth(authOptions);
