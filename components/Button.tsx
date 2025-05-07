import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type ButtonProps = {
  route: "/" | "/login" | "/register";
  color: string;
  label: string;
  isDisable: boolean;
};

const Button: React.FC<ButtonProps> = ({ route, color, label, isDisable }) => {
  const router = useRouter();

  const handlePress = () => {
    if (!isDisable) {
      router.push(route);
    }
  };

  return (
    <TouchableOpacity
      disabled={isDisable}
      style={[
        styles.button,
        { backgroundColor: color, opacity: isDisable ? 0.5 : 1 },
      ]}
      onPress={handlePress}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default Button;
