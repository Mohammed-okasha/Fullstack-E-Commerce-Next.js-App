import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import {
  connectToDatabase,
  insertDocument,
  fetchDocuments,
} from "@/utils/db-util";

async function handler(req, res) {
  let client;
  client = await connectToDatabase();
  try {
  } catch (error) {
    res.status(501).json({ message: "something went wrong, try again!" });
    return;
  }

  const itemId = req.query.itemId;

  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      res.status(401).json({ message: "you are not authenticated!" });
      return;
    }

    const userName = session.user.name;
    const newReview = { itemId, userName, ...req.body };

    try {
      await insertDocument(client, "reviews", newReview);
      client.close();
    } catch (error) {
      res.status(501).json({ message: "something went wrong, try again!" });
      return;
    }

    res
      .status(201)
      .json({ review: newReview, message: "your review added successfully" });
  }

  if (req.method === "GET") {
    let reviews;

    try {
      reviews = await fetchDocuments(
        client,
        "reviews",
        { _id: -1 },
        { itemId }
      );

      client.close();
    } catch (error) {
      res.status(501).json({ message: "something went wrong, try again!" });
      return;
    }

    res.status(200).json({
      reviews,
    });
  }
}

export default handler;
