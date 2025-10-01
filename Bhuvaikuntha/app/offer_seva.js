import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from './bottomTab';
import { useRouter } from "expo-router";


const { width, height } = Dimensions.get("window");
const scale = (size) => (width / 375) * size; // responsive scaling

export default function SevaScreen() {
     const router = useRouter();
  const [activeTab, setActiveTab] = useState("Daily Seva");

  const tabs = ["Daily Seva", "Festival Seva", "Special Puja"];

  // 👉 Grouped seva data
  const sevaData = {
    "Daily Seva": [
      {
        id: "1",
        title: "Morning Mangala Aarti Seva",
        image: require("../assets/images/icon.png"),
        offerings: ["Garland Offering", "Tulsi Leaves", "Fruits Offering"],
        price: 2501,
        button: "Offer Seva",
      },
      {
        id: "2",
        title: "Evening Satsang Prayers",
        image: require("../assets/images/icon.png"),
        offerings: ["Flower Offering", "Rose Petals", "Sweets Offering", "Basil Leaves"],
        price: 1500,
        button: "Offer Seva",
      },
    ],

    "Festival Seva": [
      {
        id: "3",
        title: "Sandhya Aarti (Festival Special)",
        image: require("../assets/images/icon.png"),
        offerings: ["Incense Offering", "Sandalwood", "Snacks", "Herb Leaves"],
        price: 3000,
        button: "Offer Seva",
      },
      {
        id: "4",
        title: "Diwali Maha Aarti",
        image: require("../assets/images/icon.png"),
        offerings: ["Diyas", "Sweets", "Garlands", "Firecrackers Ritual"],
        price: 5000,
        button: "Join The Ritual",
      },
    ],

    "Special Puja": [
      {
        id: "5",
        title: "Morning Gayatri Havan",
        image: require("../assets/images/icon.png"),
        offerings: ["Grains Offering", "Jaggery Prasad", "Lentil Balls", "Decorative Diyas"],
        price: 3500,
        button: "Join The Ritual",
      },
      {
        id: "6",
        title: "Navratri Devi Puja",
        image: require("../assets/images/icon.png"),
        offerings: ["Kumkum", "Chunari", "Coconut", "Fruits"],
        price: 4500,
        button: "Offer Puja",
      },
    ],
  };

  return (
    <>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require("../assets/images/icon.png")}
            style={styles.profile}
          />
          <Text style={styles.headerTitle}>Offer Your Seva</Text>
          <Ionicons name="notifications-outline" size={scale(22)} color="#333" />
        </View>

        {/* Tabs */}
        <View style={styles.tabRow}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabButton, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabText,
                  { color: activeTab === tab ? "#fff" : "#333" },
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Dynamic Seva List */}
        <FlatList
          data={sevaData[activeTab]} // 👈 changes with selected tab
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: scale(80) }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image
                source={item.image}
                style={styles.cardImage}
                resizeMode="cover"
              />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.offeringsRow}>
                  {item.offerings.map((offer, idx) => (
                    <Text key={idx} style={styles.offering}  >
                      ● {offer}
                    </Text>
                  ))}
                </View>
                <View style={styles.cardFooter}>
                  <TouchableOpacity style={styles.sevaBtn}>
                    <Text style={styles.sevaBtnText} onPress={() => router.push("./receipt")}>{item.button}</Text>
                    <Ionicons
                      name="heart"
                      size={14}
                      color="#fff"
                      style={{ marginLeft: 5 }}
                    />
                  </TouchableOpacity>
                  <Text style={styles.price}>₹ {item.price}</Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>

      {/* Bottom Navigation */}
      <BottomNav />
    </>
  );
}


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(12),
    paddingVertical: scale(10),
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginTop: scale(30),
  },
  profile: {
    width: scale(32),
    height: scale(32),
    borderRadius: 16,
  },
  headerTitle: { fontSize: scale(16), fontWeight: "700", color: "#000" },

  // Tabs
  tabRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: scale(10),
    paddingHorizontal: scale(8),
  },
  tabButton: {
    flex: 1,
    marginHorizontal: scale(5),
    paddingVertical: scale(8),
    borderRadius: 20,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
  },
  activeTab: { backgroundColor: "#FF6600" },
  tabText: { fontSize: scale(13), fontWeight: "600" },

  // Cards
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: scale(12),
    marginVertical: scale(8),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    overflow: "hidden",
  },
  cardImage: { width: "100%", height: height * 0.22 },
  cardContent: { padding: scale(12) },
  cardTitle: { fontSize: scale(14), fontWeight: "700", marginBottom: 6 },
  offeringsRow: { flexDirection: "row", flexWrap: "wrap" },
  offering: {
    fontSize: scale(12),
    color: "#444",
    marginRight: 10,
    marginBottom: 4,
  },

  // Footer
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  sevaBtn: {
    backgroundColor: "#FF6600",
    paddingHorizontal: scale(16),
    paddingVertical: scale(8),
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  sevaBtnText: { color: "#fff", fontSize: scale(12), fontWeight: "600" },
  price: { fontSize: scale(14), fontWeight: "700", color: "#000" },
});
