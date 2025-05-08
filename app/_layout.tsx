import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import React from "react";
import Toast from "react-native-toast-message";
import { CustomToast } from "../components/CustomToast";
import { StatusBar } from "react-native";

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
      <StatusBar
        barStyle="dark-content"
        // barStyle="light-content"
        hidden={false}
      />
      <Toast
        config={{
          success: (props) => <CustomToast {...props} />,
          error: (props) => <CustomToast {...props} />,
          info: (props) => <CustomToast {...props} />,
        }}
      />
    </QueryClientProvider>
  );
}
