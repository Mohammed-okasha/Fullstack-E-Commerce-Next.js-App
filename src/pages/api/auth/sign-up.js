import {
  connectToDatabase,
  insertDocument,
  findUserByEmail,
} from "@/utils/db-util";
import { hashPassword } from "@/utils/auth";
import { validateEmail, validatePassword } from "@/utils/validation-rules";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  const { name, email, password } = req.body;

  // Validate User Data
  if (!name || !validateEmail(email) || !validatePassword(password)) {
    res.status(422).json({ message: "please enter valid values!" });
    return;
  }

  let client;
  // Connect To Database
  try {
    client = await connectToDatabase();
  } catch (error) {
    res.status(501).json({ message: "something went wrong!" });
    return;
  }

  // Find if the incoming email is used by other user
  const exitingUser = await findUserByEmail(client, "userAccounts", email);

  if (exitingUser) {
    res.status(422).json({ message: "this email is already used!" });
    client.close();
    return;
  }

  // hashed Password
  const hashedPassword = await hashPassword(password);

  // Store User Data & Create User Account
  const newUser = { name, email, password: hashedPassword };

  try {
    await insertDocument(client, "userAccounts", newUser);
    client.close();
  } catch (error) {
    res
      .status(501)
      .json({ message: "failed to create an account, try again!" });
    return;
  }

  res.status(201).json({ message: "your account created successfully" });
}

export default handler;
