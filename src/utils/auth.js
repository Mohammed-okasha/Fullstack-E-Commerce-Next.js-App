import { hash, compare } from "bcryptjs";
import { signIn, signOut } from "next-auth/react";

export async function hashPassword(password) {
  const encryptedPassword = await hash(password, 12);

  return encryptedPassword;
}

export async function verifyPassword(password, hashedPassword) {
  return await compare(password, hashedPassword);
}
//?====================================================================
export async function createAccount(user) {
  const res = await fetch("/api/auth/sign-up", {
    method: "POST",
    body: JSON.stringify(user),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  if (res.status !== 201 && !res.ok) {
    throw new Error(data.message || "something went wrong!");
  }

  return data;
}

export async function userLogin(user) {
  const res = await signIn("credentials", {
    redirect: false,
    email: user.email,
    password: user.password,
  });

  if ((res.status !== 201 || res.status !== 200) && !res.ok) {
    throw new Error(res.error || "something went wrong!");
  }
}

export function userLogout() {
  signOut({ redirect: false });
}
