import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Platform,
  Dimensions,
} from "react-native";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

// scale function for responsive sizing
const guidelineBaseWidth = 375; // iPhone X width
const scale = (size) => (width / guidelineBaseWidth) * size;

export default function VideoDetailScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Fix for Android StatusBar */}
      <View style={styles.statusBarSpacer} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={scale(22)} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Video</Text>
        <View style={{ width: scale(22) }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Video Player */}
        <Video
          source={{
            uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          style={styles.video}
          useNativeControls
          resizeMode="cover"
        />

        {/* Title */}
        <Text style={styles.title}>Sanctum Foundation Completed</Text>

        {/* Description */}
        <Text style={styles.description}>
          With the blessings of the Lord and the heartfelt seva of devotees, the
          foundation of the sanctum has been successfully completed. This sacred
          base will hold the garbhagriha, the divine heart of Bhuvaikuntha
          Temple, where the Lord will eternally reside. Every brick and every
          stone laid here carries the love and devotion of thousands who have
          offered their seva. This milestone marks the beginning of the temple
          rising towards the skies, step by step, with divine grace. We thank
          each devotee for being a part of this historic moment. Your
          contribution is shaping a sanctum that will inspire generations to
          come.
        </Text>

        {/* Donate Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>DONATE SEVA ❤️</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  statusBarSpacer: {
    height: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#FF5722",
  },
  header: {
    height: scale(56),
    backgroundColor: "#FF5722",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(16),
  },
  headerTitle: {
    color: "#fff",
    fontSize: scale(18),
    fontWeight: "bold",
  },
  container: {
    padding: scale(16),
    paddingBottom: scale(40),
  },
  video: {
    width: "100%",
    height: height * 0.28, // responsive video height (28% of screen height)
    borderRadius: scale(10),
    backgroundColor: "#000",
  },
  title: {
    fontSize: scale(16),
    fontWeight: "bold",
    marginTop: scale(16),
    color: "#d32f2f",
  },
  description: {
    fontSize: scale(14),
    marginTop: scale(8),
    color: "#333",
    lineHeight: scale(20),
  },
  button: {
    marginTop: scale(24),
    backgroundColor: "#FF5722",
    paddingVertical: scale(14),
    borderRadius: scale(30),
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: scale(16),
    fontWeight: "bold",
  },
});
