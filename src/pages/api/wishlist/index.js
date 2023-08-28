import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import {
  connectToDatabase,
  findUserByEmail,
  insertDocument,
  updateUserWishlist,
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

  if (req.method === "POST") {
    const { email, name } = session.user;
    const item = req.body;
    const itemId = item.id;

    const existingUser = await findUserByEmail(client, "wishlist", email);

    if (existingUser) {
      const existingItem = existingUser.wishlist.find(
        (item) => item.id === itemId
      );

      let updatedWishlist;

      if (existingItem) {
        updatedWishlist = existingUser.wishlist.filter(
          (item) => item.id !== itemId
        );
      } else {
        updatedWishlist = [item, ...existingUser.wishlist];
      }

      try {
        await updateUserWishlist(client, email, updatedWishlist);
        client.close();
        res.status(201).json({ item: item, message: "wishlist updated" });
      } catch (error) {
        res.status(501).json({ message: "something went wrong, try again!" });
      }

      return;
    }

    const newUser = { email, name, item: item };

    try {
      await insertDocument(client, "wishlist", newUser);
    } catch (error) {
      res.status(501).json({ message: "something went wrong, try again!" });
      return;
    }

    res.status(201).json({ item: item, message: "wishlist updated" });
  }
}

export default handler;
