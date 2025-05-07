import type { Home } from "@/types/homeApi";
import { clearSession, getSession } from "@/utils/sessionMgmt";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { homes as mockHomes } from "../../api/homes";

export default function Properties() {
  const router = useRouter();

  const [avtarUrl, setAvatarUrl] = useState("");
  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (session?.email) {
        const name = session.email.split("@")[0];

        console.log(name);
        const apiUrl = `https://api.dicebear.com/9.x/initials/png?seed=${name}`;
        setAvatarUrl(apiUrl);
      }
    };

    fetchSession();
  }, []);

  const {
    data: homes,
    isLoading,
    error,
  } = useQuery<Home[]>({
    queryKey: ["homes"],
    queryFn: async () => {
      return Promise.resolve(mockHomes);
    },
  });

  const handleLogout = async () => {
    await clearSession();
    router.push("/");
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading properties...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error loading properties.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Row */}
      <View style={styles.header}>
        {avtarUrl && <Image source={{ uri: avtarUrl }} style={styles.avatar} />}
        <Text style={styles.title}>Property Platform</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Property List */}
      <FlatList
        data={homes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/propertyDetail/${item.id}` as any)}
          >
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.address}>{item.address}</Text>
              <Text>{item.description.slice(0, 20)}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    justifyContent: "space-between",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    flex: 1,
    textAlign: "center",
  },
  logoutButton: {
    padding: 8,
    backgroundColor: "#e63946",
    borderRadius: 8,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "500",
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 250,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  address: {
    fontWeight: "600",
    marginBottom: 4,
  },
});
