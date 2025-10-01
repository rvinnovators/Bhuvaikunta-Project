import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; 
const { width, height } = Dimensions.get("window");
const scale = (size) => (width / 375) * size;

// Example timings data
const timings = {
  Morning: [
    { time: "04:30 am to 05:00 am", title: "Morning Aarti" },
    { time: "07:15 am to 07:30 am", title: "Sringar Aarti" },
    { time: "07:30 am to 08:30 am", title: "Guru Puja" },
    { time: "08:00 am to 09:00 am", title: "Srimad Bhagavadam Class" },
  ],
  Afternoon: [
    { time: "12:00 pm to 12:30 pm", title: "Raj Bhog Aarti" },
    { time: "12:30 pm to 01:00 pm", title: "Bhog Offering" },
  ],
  Evening: [
    { time: "06:00 pm to 06:30 pm", title: "Sandhya Aarti" },
    { time: "08:00 pm to 08:30 pm", title: "Shayan Aarti" },
  ],
};

export default function LiveDarshanScreen() {
        const router = useRouter();
    
  const [selectedTab, setSelectedTab] = useState("Morning");

  return (
    <View style={styles.container}>
      {/* Header */}
    {/* Header */}
<View style={styles.header}>
  {/* Back Button (Left) */}
  <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
    <Ionicons name="chevron-back" size={scale(22)} color="#fff" />
  </TouchableOpacity>

  {/* Centered Title */}
  <Text style={styles.headerTitle}>Live Darshan</Text>
</View>


      {/* Video/Image Placeholder */}
      <View style={styles.videoWrapper}>
        <Image
          source={require("../assets/images/deities.jpg")}
          style={styles.video}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.playButton}>
          <Ionicons name="pause" size={scale(28)} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Temple Title */}
      <View style={styles.templeInfo}>
        <Text style={styles.templeTitle}>
          Sri Sri Pandharinath Temple – ISKCON Bhuvaikuntha
        </Text>
        <View style={styles.liveRow}>
          <Ionicons name="radio-outline" size={scale(14)} color="red" />
          <Text style={styles.liveText}>Live</Text>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {["Morning", "Afternoon", "Evening"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab && styles.activeTab,
            ]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Timings List */}
      <FlatList
        data={timings[selectedTab]}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.timeText}>{item.time}</Text>
            <Text style={styles.titleText}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
header: {
  backgroundColor: "#FF6600",
  paddingTop: scale(45),
  paddingBottom: scale(12),
  height: scale(85),
  justifyContent: "center",
  alignItems: "center",
},

backBtn: {
  position: "absolute",
  left: scale(12),
  bottom: scale(12), // keeps it vertically aligned with the title
},

headerTitle: {
  color: "#fff",
  fontSize: scale(18),
  fontWeight: "700",
  textAlign: "center",
},


  videoWrapper: {
    width: "100%",
    height: height * 0.3,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  video: { width: "100%", height: "100%" },
  playButton: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: scale(12),
    borderRadius: 50,
  },

  templeInfo: {
    padding: scale(12),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  templeTitle: {
    flex: 1,
    fontSize: scale(14),
    fontWeight: "600",
    color: "#222",
  },
  liveRow: { flexDirection: "row", alignItems: "center", marginLeft: scale(8) },
  liveText: { color: "red", marginLeft: 4, fontWeight: "600" },

  tabs: {
    flexDirection: "row",
    marginHorizontal: scale(12),
    marginBottom: scale(10),
  },
  tab: {
    flex: 1,
    paddingVertical: scale(8),
    marginHorizontal: scale(4),
    borderWidth: 1,
    borderColor: "#FF6600",
    borderRadius: 8,
    alignItems: "center",
  },
  activeTab: { backgroundColor: "#FF6600" },
  tabText: { color: "#FF6600", fontWeight: "600" },
  activeTabText: { color: "#fff" },

  list: { paddingHorizontal: scale(12) },
  listItem: {
    paddingVertical: scale(8),
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  timeText: { fontSize: scale(12), color: "#666" },
  titleText: { fontSize: scale(14), fontWeight: "600", color: "#222" },
});
