import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import { validatePassword } from "@/utils/validation-rules";
import {
  connectToDatabase,
  findUserByEmail,
  updateUserPassword,
} from "@/utils/db-util";
import { verifyPassword, hashPassword } from "@/utils/auth";

async function handler(req, res) {
  if (req.method !== "PUT") {
    return;
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "you are not authenticated!" });
    return;
  }

  const { oldPassword, newPassword } = req.body;

  if (!validatePassword(oldPassword) || !validatePassword(newPassword)) {
    res.status(422).json({ message: "please enter a valid password data" });
    return;
  }

  let client;
  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(501).json({ message: "something went wrong, try again!" });
    return;
  }

  const userEmail = session.user.email;
  const existingUser = await findUserByEmail(client, "userAccounts", userEmail);

  if (!existingUser) {
    res.status(404).json({ message: "user not found!" });
    client.close();
    return;
  }

  const verifyOldPassword = await verifyPassword(
    oldPassword,
    existingUser.password
  );

  if (!verifyOldPassword) {
    res.status(422).json({ message: "old password incorrect!" });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(newPassword);

  try {
    await updateUserPassword(client, "userAccounts", {
      email: userEmail,
      password: hashedPassword,
    });

    client.close();
  } catch (error) {
    res.status(501).json({
      message: "failed to change password, try again!",
    });

    return;
  }

  res.status(201).json({
    message: "password changed successfully",
  });
}

export default handler;
