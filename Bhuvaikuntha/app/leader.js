import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");
const scale = (size) => (width / 375) * size; // responsive scale

const topUsers = [
  { id: "1", name: "Rajesh Kumar", amount: "₹48,000" },
  { id: "2", name: "Anitha Krishna", amount: "₹5,000" },
  { id: "3", name: "Sneha Patel", amount: "₹38,000" },
];

const otherUsers = [
  { id: "4", name: "Divya Sharma", amount: "₹36,000" },
  { id: "5", name: "Priya Patel", amount: "₹35,000" },
  { id: "6", name: "You", amount: "₹34,000" },
  { id: "7", name: "Anjali Singh", amount: "₹33,000" },
  { id: "8", name: "Aryan Verma", amount: "₹32,000" },
  { id: "9", name: "Deepak Reddy", amount: "₹31,000" },
  { id: "10", name: "Meera Nair", amount: "₹30,000" },
];

export default function LeaderboardScreen() {
  const renderUser = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.rank}>{item.id}</Text>
      <View style={styles.userCircle} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.amount}>{item.amount}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#FF6600" />

      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={scale(20)} color="#fff" />
        <Text style={styles.headerTitle}>Leaderboard</Text>
        <View style={{ width: scale(20) }} />
      </View>

      {/* Top 3 Users */}
      <View style={styles.topContainer}>
        {topUsers.map((user, index) => (
          <View key={user.id} style={styles.topUser}>
            <View style={styles.bigCircle} />
            <Text style={styles.topName}>{user.name}</Text>
            <Text style={styles.topAmount}>{user.amount}</Text>
          </View>
        ))}
      </View>

      {/* Other Users */}
      <FlatList
        data={otherUsers}
        keyExtractor={(item) => item.id}
        renderItem={renderUser}
        contentContainerStyle={{ paddingBottom: scale(40) }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FF6600",
    paddingHorizontal: scale(16),
    paddingTop: scale(40),
    paddingBottom: scale(14),
  },
  headerTitle: {
    fontSize: scale(18),
    fontWeight: "600",
    color: "#fff",
  },

  topContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingVertical: scale(20),
    backgroundColor: "linear-gradient(180deg, #FF6600, #FF3300)",
  },
  topUser: { alignItems: "center", flex: 1 },
  bigCircle: {
    width: scale(70),
    height: scale(70),
    borderRadius: scale(35),
    backgroundColor: "#ddd",
    marginBottom: scale(8),
  },
  topName: {
    fontSize: scale(13),
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
  },
  topAmount: {
    fontSize: scale(14),
    fontWeight: "700",
    color: "#FF6600",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: scale(10),
    paddingHorizontal: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  rank: {
    fontSize: scale(14),
    fontWeight: "600",
    width: scale(25),
    color: "#666",
  },
  userCircle: {
    width: scale(28),
    height: scale(28),
    borderRadius: scale(14),
    backgroundColor: "#ccc",
    marginHorizontal: scale(8),
  },
  name: {
    flex: 1,
    fontSize: scale(14),
    color: "#333",
  },
  amount: {
    fontSize: scale(14),
    fontWeight: "600",
    color: "#000",
  },
});
