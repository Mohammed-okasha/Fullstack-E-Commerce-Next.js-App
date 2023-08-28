import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import {
  connectToDatabase,
  insertDocument,
  findUserByEmail,
  updateUserCart,
} from "@/utils/db-util";

import { userCartUpdateLogic } from "@/utils/helpers";
//=====================================================
async function handler(req, res) {
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
    res.status(501).json({ message: "something went wrong, try again!" });
    return;
  }

  if (req.method === "POST") {
    const sentItem = req.body;
    const { name, email } = session.user;

    // Find if User Already in Cart
    const existingUser = await findUserByEmail(client, "cart", email);

    if (existingUser) {
      const updatedCartItems = userCartUpdateLogic(
        existingUser.items,
        sentItem
      );

      // Update Database
      try {
        await updateUserCart(client, existingUser.email, updatedCartItems);
        client.close();
        res.status(201).json({ product: sentItem, message: "cart updated" });
      } catch (error) {
        res.status(501).json({ message: "failed to update cart, try again!" });
      }

      return;
    }

    const newUser = { name, email, items: [sentItem] };

    try {
      await insertDocument(client, "cart", newUser);
      client.close();
    } catch (error) {
      res.status(501).json({ message: "failed to add to cart, try again!" });
      return;
    }

    res.status(201).json({ product: sentItem, message: "item added to cart" });
  }

  if (req.method === "GET") {
    const userEmail = session.user.email;

    // Find User In Cart By Email
    const existingUser = await findUserByEmail(client, "cart", userEmail);
    const cart = existingUser ? existingUser.items : null;

    client.close();
    res.status(200).json({ cart });
  }
}

export default handler;
