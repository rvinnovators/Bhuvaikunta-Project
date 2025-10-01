import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-swiper"; // npm install react-native-swiper
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import BottomNav from "./bottomTab";

// Responsive scaling
const { width, height } = Dimensions.get("window");
const scale = (size) => (width / 375) * size;

// ✅ Reusable Header Component
const AppHeader = () => {
  return (
    <SafeAreaView edges={["top"]} style={{ backgroundColor: "#FF6600" }}>
      <View style={styles.header}>
        <Image
          source={require("../assets/images/icon.png")}
          style={styles.profile}
        />
        <Text style={styles.headerTitle}>Welcome, Jagannath</Text>
        <Ionicons name="notifications-outline" size={22} color="#fff" />
      </View>
    </SafeAreaView>
  );
};

export default function HomeScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Home");

  // Dummy Data
  const quickAccess = [
    { id: "1", title: "Daily Darshan", image: require("../assets/images/icon.png"), path: "/daily-darshan" },
    { id: "2", title: "My Donations", image: require("../assets/images/icon.png"), path: "/my-donations" },
    { id: "3", title: "Temple Updates", image: require("../assets/images/icon.png"), path: "/updates" },
    { id: "4", title: "Live Darshan", image: require("../assets/images/icon.png"), path: "/live_darshan" },
    { id: "5", title: "Anna Daan Seva", image: require("../assets/images/icon.png"), path: "/anna-daan" },
    { id: "6", title: "Offer Your Seva", image: require("../assets/images/icon.png"), path: "/offer-seva" },
  ];

  const donateNow = [
    {
      id: "1",
      title: "Bhuvaikuntha Temple Construction",
      desc: "Support the building of the Lord’s eternal home.",
      image: require("../assets/images/icon.png"),
    },
    {
      id: "2",
      title: "Ahmedabad Mandir",
      desc: "Offer your seva for this grand project.",
      image: require("../assets/images/icon.png"),
    },
  ];

  const sevaProgress = [
    { id: "1", title: "Sanctum Foundation Completed", image: require("../assets/images/icon.png") },
    { id: "2", title: "Hall Pillars Initiated", image: require("../assets/images/icon.png") },
  ];

  const banners = [
    { id: "1", image: require("../assets/images/icon.png") },
    { id: "2", image: require("../assets/images/icon.png") },
    { id: "3", image: require("../assets/images/icon.png") },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} edges={["left", "right"]}>
      {/* ✅ Orange notch background */}
      <StatusBar backgroundColor="#FF6600" barStyle="light-content" />

      {/* ✅ Custom Header */}
      <AppHeader />

      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: height * 0.05 }}
        >
          {/* Banner Carousel */}
          <View style={styles.banner}>
            <Swiper
              autoplay
              dotStyle={{ backgroundColor: "#ccc", width: 8, height: 8, borderRadius: 4 }}
              activeDotStyle={{ backgroundColor: "#FF6600", width: 10, height: 10, borderRadius: 5 }}
            >
              {banners.map((item) => (
                <View key={item.id}>
                  <Image source={item.image} style={styles.bannerImage} resizeMode="cover" />
                  <TouchableOpacity style={styles.bannerBtn}>
                    <Text style={styles.bannerBtnText}>DONATE NOW</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </Swiper>
          </View>

          {/* Quick Access */}
          <Text style={styles.sectionTitle}>Quick Access</Text>
          <View style={styles.quickGrid}>
            {quickAccess.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.quickItem}
                onPress={() => router.push(item.path)}
              >
                <Image source={item.image} style={styles.quickIcon} />
                <Text style={styles.quickText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Donate Now */}
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Donate Now</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {donateNow.map((item) => (
              <View key={item.id} style={styles.donateCard}>
                <Image source={item.image} style={styles.donateImage} />
                <Text style={styles.donateTitle}>{item.title}</Text>
                <Text style={styles.donateDesc}>{item.desc}</Text>
                <TouchableOpacity style={styles.donateBtn}>
                  <Text style={styles.donateBtnText}>DONATE</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>

          {/* Seva Progress */}
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>See the Progress of Your Seva</Text>
            <Text style={styles.seeAll}>See all</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {sevaProgress.map((item) => (
              <View key={item.id} style={styles.progressCard}>
                <Image source={item.image} style={styles.progressImage} />
                <Text style={styles.progressTitle}>{item.title}</Text>
              </View>
            ))}
          </ScrollView>
        </ScrollView>

        {/* ✅ Bottom Navigation */}
        <BottomNav />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(12),
    paddingVertical: scale(12),
    backgroundColor: "#FF6600", // ✅ orange header (extends under notch)
  },
  profile: {
    width: scale(35),
    height: scale(35),
    borderRadius: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: scale(16),
    fontWeight: "700",
    flex: 1,
    textAlign: "center",
  },

  // Banner
  banner: { margin: scale(10), borderRadius: 10, overflow: "hidden", height: height * 0.22 },
  bannerImage: { width: "100%", height: "100%", borderRadius: 10 },
  bannerBtn: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: "#FF6600",
    paddingHorizontal: scale(14),
    paddingVertical: scale(6),
    borderRadius: 20,
  },
  bannerBtnText: { color: "#fff", fontSize: scale(12), fontWeight: "700" },

  // Section Titles
  sectionTitle: {
    fontSize: scale(16),
    fontWeight: "700",
    marginHorizontal: scale(12),
    marginVertical: scale(10),
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: scale(12),
  },
  seeAll: { color: "#FF6600", fontSize: scale(12), fontWeight: "600" },

  // Quick Access
  quickGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: scale(12),
  },
  quickItem: {
    width: "30%",
    alignItems: "center",
    marginBottom: scale(15),
  },
  quickIcon: { width: scale(50), height: scale(50), marginBottom: 5 },
  quickText: { fontSize: scale(12), textAlign: "center" },

  // Donate Now
  donateCard: {
    width: width * 0.7,
    backgroundColor: "#fff",
    marginHorizontal: scale(10),
    borderRadius: 8,
    padding: scale(10),
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  donateImage: { width: "100%", height: height * 0.15, borderRadius: 8 },
  donateTitle: { fontSize: scale(14), fontWeight: "700", marginVertical: 5 },
  donateDesc: { fontSize: scale(12), color: "#555" },
  donateBtn: {
    backgroundColor: "#FF6600",
    marginTop: 8,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
  },
  donateBtnText: { color: "#fff", fontWeight: "700" },

  // Progress
  progressCard: {
    width: width * 0.6,
    marginHorizontal: scale(10),
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 2,
  },
  progressImage: { width: "100%", height: height * 0.15 },
  progressTitle: { padding: 8, fontSize: scale(12), fontWeight: "600" },
});
