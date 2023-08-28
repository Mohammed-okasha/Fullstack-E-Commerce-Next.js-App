import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import {
  connectToDatabase,
  findUserByEmail,
  updateUserCart,
  insertDocument,
} from "@/utils/db-util";

async function handler(req, res) {
  if (req.method !== "POST") {
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res
      .status(401)
      .json({ message: "not authenticated, you can't do this operation!" });
    return;
  }

  let client;

  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(501).json({ message: "something went wrong!" });
    return;
  }

  const { name, email } = session.user;

  const existingUser = await findUserByEmail(client, "cart", email);

  if (existingUser) {
    try {
      await updateUserCart(client, existingUser.email, req.body);
      res.status(201).json({ success: true });
    } catch (error) {
      res.status(501).json({ error: true });
    }

    client.close();
    return;
  }

  const newUser = { name, email, items: req.body };

  try {
    await insertDocument(client, "cart", newUser);
    client.close();
  } catch (error) {
    res.status(501).json({ message: "something went wrong!" });
    return;
  }

  res.status(201).json({ message: "cart saved successfully" });
}

export default handler;
