import { MongoClient } from "mongodb";

const url = `mongodb+srv://${process.env.db_username}:${process.env.db_password}@${process.env.db_clusterName}.80nyhk2.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority`;

export async function connectToDatabase() {
  const client = await MongoClient.connect(url);
  return client;
}

export async function insertDocument(client, collection, doc) {
  const db = client.db();

  return await db.collection(collection).insertOne(doc);
}

export async function fetchDocuments(client, collection, sort, filter = {}) {
  const db = client.db();

  return await db.collection(collection).find(filter).sort(sort).toArray();
}

//* User =============================================================
export async function findUserByEmail(client, collection, email) {
  const db = client.db();

  const user = await db.collection(collection).findOne({ email: email });
  return user;
}

export async function updateUserPassword(client, collection, user) {
  const db = client.db();

  await db
    .collection(collection)
    .updateOne({ email: user.email }, { $set: { password: user.password } });
}
//* Cart ================================================================
export async function updateUserCart(client, userEmail, updatedItems) {
  const db = client.db();

  await db
    .collection("cart")
    .updateOne({ email: userEmail }, { $set: { items: updatedItems } });
}
//* Wishlist ==========================================================
export async function updateUserWishlist(client, userEmail, updatedWishlist) {
  const db = client.db();

  return await db
    .collection("wishlist")
    .updateOne({ email: userEmail }, { $set: { wishlist: updatedWishlist } });
}
