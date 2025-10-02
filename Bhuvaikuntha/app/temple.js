import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  StatusBar,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");
const scale = (size) => (width / 375) * size;

// --- Data ---
const templeSections = [
  { 
    id: "1", 
    title: "Garbhagrha Construction", 
    desc: "Sacred sanctum sanctorum for the main deities", 
    path: "/braochure_donation" 
  },
  { 
    id: "2", 
    title: "Kalyan Mandap", 
    desc: "Divine wedding hall for celestial ceremonies", 
    path: "/braochure_donation" 
  },
  { 
    id: "3", 
    title: "Spiritual Library", 
    desc: "Repository of sacred texts and scriptures", 
    path: "/braochure_donation"  
  },
  { 
    id: "4", 
    title: "Vrindavan Garden", 
    desc: "Sacred botanical garden with Krishna leela themes", 
    path: "/braochure_donation" 
  },
  { 
    id: "5", 
    title: "Goshala (Cow Shelter)", 
    desc: "Modern cow shelter following Vedic principles", 
    path: "/braochure_donation"  
  },
];


const galleryItems = [
  { id: "1", title: "Foundation Ceremony", desc: "Bhoomi pujan and foundation laying", path: "/photos"   },
  { id: "2", title: "Structural Framework", desc: "Main structure and pillars construction", path: "/braochure_donation"   },
  { id: "3", title: "Dome Installation", desc: "Sacred dome and shikhar installation" , path: "/braochure_donation"  },
  { id: "4", title: "Structural Framework", desc: "Main structure and pillars construction" , path: "/braochure_donation"  },
  { id: "5", title: "Foundation Ceremony", desc: "Bhoomi pujan and foundation laying" , path: "/braochure_donation"  },
  { id: "6", title: "Structural Framework", desc: "Main structure and pillars construction" , path: "/braochure_donation"  },
];

const videoItems = [
  { id: "1", title: "Sanctum Foundation Completed", thumbnail: require("../assets/images/Deity2.png") , path: "/videos"  },
  { id: "2", title: "Main Hall Pillars Installed", thumbnail: require("../assets/images/Deity2.png"), path: "/videos"   },
  { id: "3", title: "Celestial Gardens in Progress", thumbnail: require("../assets/images/Deity2.png") , path: "/videos"  },
  { id: "4", title: "Fountain Features Under Construction", thumbnail: require("../assets/images/Deity2.png"), path: "/videos"   },
  { id: "5", title: "Arcane Library Upcoming", thumbnail: require("../assets/images/Deity2.png"), path: "/videos"   },
  { id: "6", title: "Bookshelf Arrangements Planned", thumbnail: require("../assets/images/Deity2.png") , path: "/videos"  },
];

export default function TempleScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Brochure");

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={scale(22)} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Temple</Text>
          <View style={{ width: scale(22) }} />
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {["Brochure", "Photo", "Video"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Content */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: scale(100) }}>
          {/* Brochure */}
          {activeTab === "Brochure" && (
            <>
              <Image source={require("../assets/images/Deity2.png")} style={styles.banner} />
              <View style={styles.textContainer}>
                <Text style={styles.title}>Sri Sri Pandharinath Temple</Text>
                <Text style={styles.subtitle}>(Divine Bhuvaikuntha on Earth)</Text>
                <Text style={styles.description}>
                  Experience the divine architecture inspired by Vaikuntha itself.
                  This sacred temple complex will serve as a spiritual beacon for generations to come.
                </Text>
              </View>
              <TouchableOpacity style={styles.downloadBtn}>
                <Text style={styles.downloadText}>⬇ Download Brochure</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.viewOnlineBtn}>
                <Text style={styles.viewOnlineText}>View Online</Text>
              </TouchableOpacity>

              {templeSections.map((item) => (
                <View key={item.id} style={styles.sectionCard}>
                  <View style={styles.sectionIcon} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.sectionTitle}>{item.title}</Text>
                    <Text style={styles.sectionDesc}>{item.desc}</Text>
                  </View>
                  <TouchableOpacity style={styles.viewBtn}  onPress={() => router.push(item.path)}>
                    <Text style={styles.viewBtnText}>View</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </>
          )}

          {/* Photo Gallery */}
          {activeTab === "Photo" && (
            <View style={styles.galleryContainer}>
              {galleryItems.map((item) => (
                <View key={item.id} style={styles.galleryCard}>
                  <View style={styles.galleryImage} />
                  <Text style={styles.galleryTitle}>{item.title}</Text>
                  <Text style={styles.galleryDesc}>{item.desc}</Text>
                  <TouchableOpacity style={styles.galleryBtn} onPress={() => router.push(item.path)}>
                    <Text style={styles.galleryBtnText}>Explore Gallery</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {/* Video Gallery */}
          {activeTab === "Video" && (
            <View style={styles.videoContainer}>
              {videoItems.map((item) => (
                <TouchableOpacity key={item.id} style={styles.videoCard} onPress={() => router.push(item.path)}>
                  <Image source={item.thumbnail} style={styles.videoThumbnail} />
                  <View style={styles.playOverlay}>
                    <Ionicons name="play-circle" size={scale(36)} color="#fff" />
                  </View>
                  <Text style={styles.videoTitle}>{item.title}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(12),
    paddingVertical: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: { fontSize: scale(18), fontWeight: "600", color: "#000" },

  // Tabs
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f5f5f5",
    paddingVertical: scale(8),
    marginBottom: scale(8),
  },
  tab: { paddingVertical: scale(6), paddingHorizontal: scale(16), borderRadius: scale(20) },
  activeTab: { backgroundColor: "#FF5722" },
  tabText: { fontSize: scale(14), color: "#555" },
  activeTabText: { color: "#fff", fontWeight: "600" },

  // Brochure
  banner: { width: "100%", height: scale(180), borderRadius: scale(8) },
  textContainer: { padding: scale(12), alignItems: "center" },
  title: { fontSize: scale(16), fontWeight: "700", color: "#D32F2F" },
  subtitle: { fontSize: scale(13), fontWeight: "500", color: "#666", marginVertical: scale(4) },
  description: { fontSize: scale(12), color: "#444", textAlign: "center", marginTop: scale(4) },
  downloadBtn: {
    backgroundColor: "#FF5722",
    marginHorizontal: scale(20),
    marginTop: scale(12),
    paddingVertical: scale(12),
    borderRadius: scale(6),
    alignItems: "center",
  },
  downloadText: { color: "#fff", fontWeight: "600", fontSize: scale(14) },
  viewOnlineBtn: {
    borderWidth: 1,
    borderColor: "#FF5722",
    marginHorizontal: scale(20),
    marginTop: scale(8),
    paddingVertical: scale(12),
    borderRadius: scale(6),
    alignItems: "center",
  },
  viewOnlineText: { color: "#FF5722", fontWeight: "600", fontSize: scale(14) },
  sectionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: scale(12),
    marginVertical: scale(6),
    padding: scale(10),
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: "#eee",
  },
  sectionIcon: {
    width: scale(50),
    height: scale(50),
    backgroundColor: "#f0f0f0",
    borderRadius: scale(8),
    marginRight: scale(10),
  },
  sectionTitle: { fontSize: scale(14), fontWeight: "600" },
  sectionDesc: { fontSize: scale(12), color: "#666", marginTop: scale(4) },
  viewBtn: {
    backgroundColor: "#FF5722",
    paddingVertical: scale(6),
    paddingHorizontal: scale(12),
    borderRadius: scale(6),
  },
  viewBtnText: { color: "#fff", fontSize: scale(13), fontWeight: "600" },

  // Photo
  galleryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: scale(10),
  },
  galleryCard: {
    width: "48%",
    backgroundColor: "#fff",
    marginVertical: scale(6),
    padding: scale(10),
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
  },
  galleryImage: {
    width: "100%",
    height: scale(100),
    backgroundColor: "#f0f0f0",
    borderRadius: scale(6),
    marginBottom: scale(8),
  },
  galleryTitle: { fontSize: scale(13), fontWeight: "600", textAlign: "center" },
  galleryDesc: { fontSize: scale(11), color: "#666", textAlign: "center", marginVertical: scale(4) },
  galleryBtn: {
    backgroundColor: "#FF5722",
    paddingVertical: scale(6),
    paddingHorizontal: scale(12),
    borderRadius: scale(20),
    marginTop: scale(6),
  },
  galleryBtnText: { color: "#fff", fontSize: scale(12), fontWeight: "600" },

  // Video
  videoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: scale(10),
  },
  videoCard: {
    width: "48%",
    marginVertical: scale(6),
    borderRadius: scale(8),
    overflow: "hidden",
    backgroundColor: "#000",
  },
  videoThumbnail: { width: "100%", height: scale(120), borderRadius: scale(8) },
  playOverlay: {
    position: "absolute",
    top: "40%",
    left: "40%",
  },
  videoTitle: {
    position: "absolute",
    bottom: 6,
    left: 6,
    right: 6,
    color: "#fff",
    fontSize: scale(12),
    fontWeight: "600",
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
