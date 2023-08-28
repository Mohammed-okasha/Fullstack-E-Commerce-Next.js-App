import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import {
  connectToDatabase,
  findUserByEmail,
  updateUserCart,
} from "@/utils/db-util";

async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ message: "you are not authenticated!" });
    return;
  }

  const { email } = session.user;

  let client;
  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(501).json({ message: "something went wrong, try again!" });
    return;
  }

  const itemId = +req.query.itemId;

  let user;
  try {
    user = await findUserByEmail(client, "cart", email);
  } catch (error) {
    res.status(501).json({
      message: "something went wrong, try again!",
    });

    return;
  }

  if (req.method === "PUT") {
    const updatedQuantity = req.body.quantity;

    const updatedUserCart = user.items.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: updatedQuantity,
        };
      }

      return item;
    });

    try {
      await updateUserCart(client, email, updatedUserCart);
      client.close();
    } catch (error) {
      res.status(501).json({ message: "something went wrong, try again!" });
      return;
    }

    res.status(200).json({ message: "item quantity updated" });
  }

  if (req.method === "DELETE") {
    const updatedUserCart = user.items.filter((item) => item.id !== itemId);

    try {
      await updateUserCart(client, email, updatedUserCart);
      client.close();
    } catch (error) {
      res.status(501).json({
        message: "something went wrong, try again!",
      });
      return;
    }

    res.status(200).json({
      id: itemId,
      message: "item deleted form cart",
    });
  }
}

export default handler;
