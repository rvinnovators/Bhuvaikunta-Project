import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNav from "./bottomTab";
import { useRouter } from "expo-router"; 

const { width, height } = Dimensions.get("window");
const scale = (size) => (width / 375) * size;

export default function DailyDarshanScreen() {
    const router = useRouter();
  const [activeTab, setActiveTab] = useState("Mangala Aarti");
  const [screen, setScreen] = useState({ width, height });

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setScreen({ width: window.width, height: window.height });
    });
    return () => subscription?.remove();
  }, []);

  const tabs = ["Mangala Aarti", "Sringar Darshan", "Festival Darshan"];

  const images = {
    "Mangala Aarti": [
      { id: "1", image: require("../assets/images/deities.jpg") },
      { id: "2", image: require("../assets/images/deities.jpg") },
      { id: "3", image: require("../assets/images/deities.jpg") },
    ],
    "Sringar Darshan": [
      { id: "4", image: require("../assets/images/Deity2.png") },
      { id: "5", image: require("../assets/images/Deity2.png") },
      { id: "6", image: require("../assets/images/Deity2.png") },
    ],
    "Festival Darshan": [
      { id: "7", image: require("../assets/images/deities.jpg") },
      { id: "8", image: require("../assets/images/deities.jpg") },
    ],
  };

  const imageHeight =
    screen.height > screen.width ? screen.height * 0.3 : screen.height * 0.6;

  return (
    <>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={scale(22)} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Daily Darshan</Text>
          <View style={{ width: scale(22) }} />
        </View>

        {/* Tabs (fixed height, won’t collapse) */}
        <View style={{ height: scale(50) }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabRow}
          >
            {tabs.map((tab) => (
              <TouchableOpacity
                key={tab}
                style={[
                  styles.tabButton,
                  activeTab === tab && styles.activeTab,
                ]}
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
          </ScrollView>
        </View>

        {/* Images list */}
               <FlatList
          data={images[activeTab]}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: scale(80) }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.imageCard}
              onPress={() =>
                router.push({
                  pathname: "/detail_view",   // navigate to detail screen
                   params: { id: item.id }, // send only ID
                })
              }
            >
              <Image
                source={item.image}
                style={[styles.darshanImage, { height: imageHeight }]}
                resizeMode="cover"
              />
            </TouchableOpacity>
          )}
        />
      </View>
      <BottomNav />
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(12),
    paddingVertical: scale(10),
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginTop: scale(30),
  },
  headerTitle: { fontSize: scale(16), fontWeight: "700", color: "#000" },

  tabRow: { alignItems: "center", paddingHorizontal: scale(8) },
  tabButton: {
    marginHorizontal: scale(5),
    paddingVertical: scale(6),
    paddingHorizontal: scale(20),
    borderRadius: 20,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
    minWidth: scale(100), // ensures tabs don’t shrink
  },
  activeTab: { backgroundColor: "#FF6600" },
  tabText: { fontSize: scale(13), fontWeight: "600", textAlign: "center" },

  imageCard: {
    marginHorizontal: scale(12),
    marginVertical: scale(8),
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  darshanImage: { width: "100%", borderRadius: 10 },
  playButton: { position: "absolute", top: "40%", left: "40%" },
});
