import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";  // ✅ new import

const { width, height } = Dimensions.get("window");
const scale = (size) => (width / 375) * size;

const notifications = [
  { id: "1", title: "Today's Sringar Darshan", desc: "View the divine darshan of Sri Sri Pandurangnath.", action: "View Darshan", time: "2 mins ago" },
  { id: "2", title: "Annadan Today", desc: "Serve prasadam to 500 devotees with your seva.", action: "Contribute", time: "6 hours ago" },
  { id: "3", title: "Sanctum Completed", desc: "Watch the foundation milestone video.", action: "Watch", time: "24 hours ago" },
  { id: "4", title: "New Scheme Brochure", desc: "View Brochure of Garthagraha seva details.", action: "View Scheme", time: "1 day ago" },
  { id: "5", title: "Kartik Maas Begins", desc: "Join this month of Damodar — the most auspicious month for seva and prayers.", action: "Offer Seva", time: "2 days ago" },
];

export default function NotificationScreen() {
  const router = useRouter();
  const [screen, setScreen] = useState({ width, height });

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setScreen({ width: window.width, height: window.height });
    });
    return () => subscription?.remove();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.desc}</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>{item.action}</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.time}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* ✅ StatusBar now orange with white icons */}
      <StatusBar style="light" backgroundColor="#FF6600" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            size={scale(20)}
            color="#fff"
            style={{ padding: scale(6) }}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
        <View style={{ width: scale(24) }} />
      </View>

      {/* Notification List */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: scale(30) }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FF6600",
    paddingHorizontal: scale(12),
    paddingTop: scale(40), // ✅ extra top padding for iOS notch
    paddingBottom: scale(14),
  },
  headerTitle: {
    fontSize: scale(18),
    fontWeight: "700",
    color: "#fff",
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  title: {
    fontSize: scale(15),
    fontWeight: "600",
    color: "#000",
    marginBottom: scale(4),
  },
  desc: {
    fontSize: scale(13),
    color: "#555",
    marginBottom: scale(8),
    width: "95%",
  },
  button: {
    backgroundColor: "#FF6600",
    paddingVertical: scale(6),
    paddingHorizontal: scale(14),
    borderRadius: scale(20),
    alignSelf: "flex-start",
  },
  buttonText: {
    fontSize: scale(12),
    color: "#fff",
    fontWeight: "600",
  },
  time: {
    fontSize: scale(11),
    color: "#888",
    marginLeft: scale(8),
  },
});
