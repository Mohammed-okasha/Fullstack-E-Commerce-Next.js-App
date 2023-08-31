import {
  connectToDatabase,
  findUserByEmail,
  updateUserPassword,
} from "@/utils/db-util";
import { hashPassword } from "@/utils/auth";

async function handler(req, res) {
  let client;
  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(501).json({ message: "something went wrong, try agin!" });
    return;
  }

  const { email } = req.body;

  if (req.method === "POST") {
    if (!email || !email.includes("@")) {
      res.status(501).json({ message: "email not valid!" });
      return;
    }

    const existingUser = await findUserByEmail(client, "userAccounts", email);

    if (!existingUser) {
      res.status(501).json({ message: "user not found!" });
      client.close();
      return;
    }

    res.status(201).json({
      email: existingUser.email,
      message: "success email has been verified successfully",
    });
  }

  if (req.method === "PUT") {
    const { email, password } = req.body;

    const hashedPassword = await hashPassword(password);

    try {
      await updateUserPassword(client, "userAccounts", {
        email,
        password: hashedPassword,
      });

      client.close();

      res.status(200).json({
        message: "your password has been reset successfully",
      });
    } catch (error) {
      res.status(501).json({
        message: "something went wrong, try agin!",
      });
    }
  }
}

export default handler;
