//@ts-nocheck
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const CustomToast = ({ text1, text2, type }: any) => {
  const backgroundColor =
    {
      success: "#4CAF50",
      error: "#F44336",
      info: "#2196F3",
    }[type] || "#333";

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.content}>
        <View style={styles.iconPlaceholder} />
        <View>
          <Text style={styles.text1}>{text1}</Text>
          {text2 ? <Text style={styles.text2}>{text2}</Text> : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: 10,
    top: 10,
    padding: 16,
    borderRadius: 12,
    maxWidth: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    opacity: 0.95,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginRight: 12,
  },
  text1: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "700",
  },
  text2: {
    fontSize: 14,
    color: "#f1f1f1",
    marginTop: 4,
  },
});
