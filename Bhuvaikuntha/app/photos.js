import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import { useRouter } from "expo-router";

import * as FileSystem from "expo-file-system/legacy"; // ✅ legacy import
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import { Asset } from "expo-asset";

const { width } = Dimensions.get("window");
const scale = (size) => (width / 375) * size;

// Sample images (bundled assets)
const photos = [
  require("../assets/images/Deity2.png"),
  require("../assets/images/deities.jpg"),
  require("../assets/images/Deity2.png"),
  require("../assets/images/deities.jpg"),
];

export default function PhotoDetailScreen() {
  const router = useRouter();
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // 📥 Download function
  const handleDownload = async (imageSource) => {
    try {
      let fileUri;

      if (typeof imageSource === "number") {
        const asset = Asset.fromModule(imageSource);
        await asset.downloadAsync();
        fileUri = asset.localUri;
      } else if (imageSource?.uri) {
        fileUri = imageSource.uri;
      } else {
        throw new Error("Invalid image source");
      }

      const targetPath = FileSystem.documentDirectory + `temple_${Date.now()}.jpg`;

      await FileSystem.copyAsync({
        from: fileUri,
        to: targetPath,
      });

      const perm = await MediaLibrary.requestPermissionsAsync();
      if (perm.status !== "granted") {
        Alert.alert("Permission required", "Allow storage access to save image.");
        return;
      }

      const savedAsset = await MediaLibrary.createAssetAsync(targetPath);
      await MediaLibrary.createAlbumAsync("Downloads", savedAsset, false);

      Alert.alert("✅ Saved", "Image downloaded to Gallery/Downloads");
    } catch (error) {
      console.error(error);
      Alert.alert("❌ Error", "Failed to download image.");
    }
  };

  // 📤 Share function
  const handleShare = async (imageSource) => {
    try {
      let fileUri;

      if (typeof imageSource === "number") {
        const asset = Asset.fromModule(imageSource);
        await asset.downloadAsync();
        fileUri = asset.localUri;
      } else if (imageSource?.uri) {
        fileUri = imageSource.uri;
      } else {
        throw new Error("Invalid image source");
      }

      const targetPath = FileSystem.cacheDirectory + `temple_share_${Date.now()}.jpg`;

      await FileSystem.copyAsync({
        from: fileUri,
        to: targetPath,
      });

      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert("⚠️ Not Supported", "Sharing not available on this device");
        return;
      }

      await Sharing.shareAsync(targetPath);
    } catch (error) {
      console.error(error);
      Alert.alert("❌ Error", "Failed to share image.");
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={scale(22)} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Photo</Text>
          <View style={{ width: scale(22) }} />
        </View>

        {/* Title & Description */}
        <View style={styles.textBox}>
          <Text style={styles.title}>Foundation Ceremony</Text>
          <Text style={styles.subtitle}>Bhoomi pujan and foundation laying</Text>
        </View>

        {/* Image Carousel */}
        <View style={styles.carouselContainer}>
          <Swiper
            ref={swiperRef}
            loop
            autoplay
            onIndexChanged={(index) => setActiveIndex(index)}
            dotStyle={styles.dot}
            activeDotStyle={styles.activeDot}
            paginationStyle={{ bottom: 10 }}
          >
            {photos.map((img, index) => (
              <Image
                key={index}
                source={img}
                style={styles.carouselImage}
                resizeMode="cover"
              />
            ))}
          </Swiper>
        </View>

        {/* Bottom Buttons */}
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.downloadBtn}
            onPress={() => handleDownload(photos[activeIndex])}
          >
            <Text style={styles.downloadText}>Download ⬇</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.shareBtn}
            onPress={() => handleShare(photos[activeIndex])}
          >
            <Ionicons name="share-outline" size={scale(20)} color="#FF5722" />
          </TouchableOpacity>
        </View>
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
  textBox: { padding: scale(12) },
  title: { fontSize: scale(16), fontWeight: "700", color: "#000" },
  subtitle: { fontSize: scale(13), color: "#666", marginTop: 4 },

  // Carousel
  carouselContainer: { height: scale(280), marginHorizontal: scale(10) },
  carouselImage: {
    width: "100%",
    height: "100%",
    borderRadius: scale(10),
  },
  dot: { backgroundColor: "#ccc", width: 8, height: 8, borderRadius: 4 },
  activeDot: { backgroundColor: "#FF5722", width: 10, height: 10, borderRadius: 5 },

  // Bottom Bar
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: scale(14),
  },
  downloadBtn: {
    flex: 1,
    backgroundColor: "#FF5722",
    paddingVertical: scale(14),
    borderRadius: scale(8),
    alignItems: "center",
    marginRight: scale(10),
  },
  downloadText: { color: "#fff", fontWeight: "700", fontSize: scale(14) },
  shareBtn: {
    width: scale(48),
    height: scale(48),
    borderRadius: scale(24),
    borderWidth: 1,
    borderColor: "#FF5722",
    alignItems: "center",
    justifyContent: "center",
  },
});
