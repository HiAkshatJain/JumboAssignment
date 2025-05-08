import { User } from "@/types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SESSION_KEY = "user";

export const saveSession = async (user: User): Promise<void> => {
  try {
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } catch (error) {
    console.error("Error saving session:", error);
  }
};

export const getSession = async (): Promise<User | null> => {
  try {
    const data = await AsyncStorage.getItem(SESSION_KEY);
    return data ? (JSON.parse(data) as User) : null;
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
};

export const clearSession = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error("Error clearing session:", error);
  }
};
