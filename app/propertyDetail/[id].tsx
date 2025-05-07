import Button from "@/components/Button";
import { getDistance } from "@/utils/location";
import Toast from "react-native-toast-message";
import * as Location from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { homes as mockHomes } from "../../api/homes";

export default function PropertyDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [property, setProperty] = useState<any>(null);
  const [distance, setDistance] = useState<Number>();
  const [locationPermission, setLocationPermission] = useState<Boolean>(false);

  const handleUnlock = () => {
    Toast.show({
      type: "info",
      text1: "Unlocking...",
      visibilityTime: 1000,
    });

    setTimeout(() => {
      const success = Math.random() > 0.5;

      if (success) {
        Toast.show({
          type: "success",
          text1: "Success",
          text2: "Home unlocked successfully!",
          visibilityTime: 4000, // <-- hide after 2 seconds
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Failed to unlock the home.",
          visibilityTime: 4000, // <-- hide after 2 seconds
        });
      }
    }, 2000);
  };

  useEffect(() => {
    if (!property) return;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission denied",
          "Please give the permission to check the distance."
        );
        setLocationPermission(false);
        return;
      }

      setLocationPermission(true);

      const location = await Location.getCurrentPositionAsync({});
      const dist = getDistance(
        location.coords.latitude,
        location.coords.longitude,
        property.latitude,
        property.longitude
      );
      setDistance(Math.round(dist));
    })();
  }, [property]);

  useEffect(() => {
    if (id) {
      const fetchedProperty = mockHomes.find((home) => home.id === id);
      if (fetchedProperty) {
        setProperty(fetchedProperty);
      }
    }
  }, [id]);

  if (!property) {
    return (
      <View style={styles.container}>
        <Text>Loading property details...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Sticky Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: property.image }} style={styles.image} />
        <Text style={styles.title}>{property.address}</Text>
        <Text style={styles.description}>{property.description}</Text>

        {!locationPermission && !distance && (
          <Text style={styles.location}>
            Latitude: {property.latitude}, Longitude: {property.longitude}
          </Text>
        )}

        {locationPermission && distance && (
          <Text style={styles.location}>
            {`Distance :- ${distance} Kilometers`}
          </Text>
        )}

        {typeof distance === "number" && distance <= 50 && (
          <TouchableOpacity style={styles.unlockButton} onPress={handleUnlock}>
            <Text style={styles.unlockButtonText}>Unlock Home</Text>
          </TouchableOpacity>
        )}

        {typeof distance === "number" && distance > 50 && (
          <Text style={styles.warning}>
            You are too far to unlock the home*
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 15,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#777",
    marginBottom: 20,
    lineHeight: 24,
  },
  location: {
    fontSize: 14,
    color: "#555",
  },
  warning: {
    marginTop: 18,
    fontSize: 15,
    color: "#FF0000",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  unlockButton: {
    backgroundColor: "#00FF00",
    padding: 12,
    marginTop: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  unlockButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  backButtonText: {
    fontSize: 16,
    color: "#007bff",
    fontWeight: "500",
  },
});
