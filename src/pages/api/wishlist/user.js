import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import {
  connectToDatabase,
  findUserByEmail,
  insertDocument,
  updateUserWishlist,
  fetchDocuments,
} from "@/utils/db-util";

async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "you are not authenticated!" });
    return;
  }

  let client;

  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(501).json({ message: "something went wrong, try again!" });
    return;
  }

  const { email, name } = session.user;

  if (req.method === "POST") {
    const wishlist = req.body;
    const existingUser = await findUserByEmail(client, "wishlist", email);

    if (existingUser) {
      await updateUserWishlist(client, email, wishlist);
      client.close();
      res.status(201).json({ success: true });
      try {
      } catch (error) {
        res.status(501).json({ error: true });
      }

      return;
    }

    const newUser = { name, email, wishlist };

    try {
      await insertDocument(client, "wishlist", newUser);
      client.close();
    } catch (error) {
      res.status(501).json({ message: "something went wrong!" });
      return;
    }

    res.status(201).json({ message: "wishlist saved successfully" });
  }

  if (req.method === "GET") {
    const existingUser = await findUserByEmail(client, "wishlist", email);

    const wishlist = existingUser ? existingUser.wishlist : null;

    client.close();
    res.status(200).json({ wishlist });
  }
}

export default handler;
