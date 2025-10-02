import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");
const scale = (size) => (width / 375) * size;

const images = [
  require("../assets/images/Deity2.png"),
  require("../assets/images/Deity2.png"),
  require("../assets/images/Deity2.png"),
];

export default function DonationDetailScreen() {
  const router = useRouter();

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={scale(22)} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Donate Now</Text>
          <View style={{ width: scale(22) }} />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Image Carousel */}
          <View style={styles.carouselContainer}>
            <Swiper
              autoplay
              dotStyle={styles.dot}
              activeDotStyle={styles.activeDot}
              paginationStyle={{ bottom: 8 }}
            >
              {images.map((img, index) => (
                <Image
                  key={index}
                  source={img}
                  style={styles.carouselImage}
                  resizeMode="cover"
                />
              ))}
            </Swiper>
          </View>

          {/* Content */}
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>Garbhagriha Construction</Text>
            <Text style={styles.description}>
              The Garbhagriha is the heart of the temple — the sacred sanctum
              where the Lord will eternally reside and bless generations to
              come. Every stone, every layer of foundation, every ornament
              carved here carries profound spiritual significance. By supporting
              the construction of the Garbhagriha, you are directly
              contributing...
            </Text>

            <Text style={styles.keyTitle}>Key Features</Text>
            <View style={styles.list}>
              <Text style={styles.bullet}>• Pure marble flooring</Text>
              <Text style={styles.bullet}>• Gold-plated kalash</Text>
              <Text style={styles.bullet}>• Sacred geometry design</Text>
              <Text style={styles.bullet}>• Climate controlled environment</Text>
            </View>

            {/* Buttons */}
            <TouchableOpacity style={styles.donateBtn}>
              <Text style={styles.donateText}>DONATE NOW ❤️</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.downloadBtn}>
              <Text style={styles.downloadText}>DOWNLOAD BROCHURE ⬇</Text>
            </TouchableOpacity>
          </View>
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

  // Carousel
  carouselContainer: { height: scale(200), marginBottom: scale(10) },
  carouselImage: { width: "100%", height: "100%", borderRadius: scale(8) },
  dot: { backgroundColor: "#ccc", width: 8, height: 8, borderRadius: 4 },
  activeDot: { backgroundColor: "#FF5722", width: 10, height: 10, borderRadius: 5 },

  // Content
  content: { padding: scale(14) },
  sectionTitle: { fontSize: scale(16), fontWeight: "700", color: "#D84315", marginBottom: scale(10) },
  description: { fontSize: scale(13), lineHeight: 20, color: "#444" },
  keyTitle: { fontSize: scale(14), fontWeight: "600", marginTop: scale(16), marginBottom: scale(6) },
  list: { marginLeft: scale(8) },
  bullet: { fontSize: scale(13), marginBottom: 4, color: "#555" },

  // Buttons
  donateBtn: {
    backgroundColor: "#FF5722",
    paddingVertical: scale(14),
    borderRadius: scale(8),
    alignItems: "center",
    marginTop: scale(20),
  },
  donateText: { color: "#fff", fontWeight: "700", fontSize: scale(15) },
  downloadBtn: {
    borderWidth: 1,
    borderColor: "#FF5722",
    paddingVertical: scale(14),
    borderRadius: scale(8),
    alignItems: "center",
    marginTop: scale(12),
  },
  downloadText: { color: "#FF5722", fontWeight: "700", fontSize: scale(15) },
});
