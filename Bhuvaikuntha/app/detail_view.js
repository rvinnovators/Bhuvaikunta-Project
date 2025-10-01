import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system/legacy"; // ✅ legacy import
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import { Asset } from "expo-asset";
import { useLocalSearchParams, useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");
const scale = (size) => (width / 375) * size;

// Example image mapping
const images = {
  1: require("../assets/images/deities.jpg"),
  2: require("../assets/images/deities.jpg"),
  3: require("../assets/images/deities.jpg"),
  4: require("../assets/images/Deity2.png"),
  5: require("../assets/images/Deity2.png"),
  6: require("../assets/images/Deity2.png"),
  7: require("../assets/images/deities.jpg"),
  8: require("../assets/images/deities.jpg"),
};

export default function DarshanDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [screen, setScreen] = useState({ width, height });

  // 🔄 Handle orientation changes
  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setScreen({ width: window.width, height: window.height });
    });
    return () => subscription?.remove();
  }, []);

  // 📏 Dynamic image height
  const imageHeight =
    screen.height > screen.width ? screen.height * 0.6 : screen.height * 0.9;

  // 👉 Pick the image
  const imageSource = images[id];

  if (!imageSource) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No image found</Text>
      </View>
    );
  }

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

      const targetPath = FileSystem.documentDirectory + "darshan.jpg";

      await FileSystem.copyAsync({
        from: fileUri,
        to: targetPath,
      });

      // Save to gallery
      const perm = await MediaLibrary.requestPermissionsAsync();
      if (perm.status !== "granted") {
        Alert.alert("Permission required", "Allow storage access to save image.");
        return;
      }

      const savedAsset = await MediaLibrary.createAssetAsync(targetPath);
      await MediaLibrary.createAlbumAsync("Downloads", savedAsset, false);

      Alert.alert("✅ Download Complete", "Image saved to Gallery/Downloads");
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

      const targetPath = FileSystem.cacheDirectory + "darshan.jpg";

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
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={scale(22)} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Daily Darshan</Text>
        <View style={{ width: scale(22) }} /> {/* spacer */}
      </View>

      {/* Image */}
      <View style={styles.imageWrapper}>
        <Image
          source={imageSource}
          style={[styles.image, { height: imageHeight }]}
          resizeMode="contain"
        />
      </View>

      {/* Buttons */}
      <View style={styles.buttonRow}>
        {/* Download button */}
        <TouchableOpacity
          style={styles.downloadButton}
          onPress={() => handleDownload(imageSource)}
        >
          <Text style={styles.downloadText}>Download </Text>
          <Ionicons name="download-outline" size={scale(18)} color="#fff" />
        </TouchableOpacity>

        {/* Share button */}
        <TouchableOpacity
          style={styles.shareButton}
          onPress={() => handleShare(imageSource)}
        >
          <Ionicons name="share-social-outline" size={scale(22)} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
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

  imageWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: scale(10),
  },
  image: {
    width: "95%",
    borderRadius: 10,
  },

  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: scale(20),
    marginBottom: scale(20),
  },

  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FF6600",
    paddingVertical: scale(12),
    paddingHorizontal: scale(20),
    borderRadius: 10,
    flex: 1,
    justifyContent: "center",
    marginRight: scale(10),
  },
  downloadText: {
    fontSize: scale(14),
    fontWeight: "600",
    color: "#fff",
  },

  shareButton: {
    backgroundColor: "#FF6600",
    padding: scale(12),
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
