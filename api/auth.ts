import { User } from "@/types/user";
import { CryptoDigestAlgorithm, digestStringAsync } from "expo-crypto";

const SALT = "d23dgh23dh29vf2345f45ff3f3f39ed3f23d2v02"; // Randomly Ganerated

const userDB: Map<string, User> = new Map(); // Mock database

const hashPassword = async (password: string): Promise<string> => {
  return await digestStringAsync(CryptoDigestAlgorithm.SHA256, password + SALT);
};

export const registerUser = async ({
  email,
  password,
}: User): Promise<{ message: string }> => {
  if (userDB.has(email)) {
    throw new Error("User already exists");
  }
  const hashedPassword = await hashPassword(password);
  userDB.set(email, { email, password: hashedPassword });
  console.log("Full Database", userDB);
  return { message: "User registered successfully" };
};

export const loginUser = async ({
  email,
  password,
}: User): Promise<{ message: string; user: { email: string } }> => {
  const user = userDB.get(email);
  if (!user) throw new Error("User not found");

  const hashedPassword = await hashPassword(password);
  if (hashedPassword !== user.password) {
    throw new Error("Invalid credentials");
  }

  return { message: "Login successful", user: { email } };
};
