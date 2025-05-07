import Button from "@/components/Button";
import { getSession } from "@/utils/sessionMgmt";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        router.push("/properties");
      }
    };

    checkSession();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Our Property Platform!</Text>

      <Image source={require("../assets/home.jpg")} style={styles.image} />

      <Text style={styles.propertyDescription}>
        Explore stunning properties. Whether you're looking to buy, rent, or
        just browse, we have a range of options to help you find your dream
        home.
      </Text>
      <Button route="/login" color="#007BFF" label="Login" isDisable={false} />
      <Button
        route="/register"
        color="#28a745"
        label="Sign Up"
        isDisable={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  propertyDescription: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 24,
  },
});
