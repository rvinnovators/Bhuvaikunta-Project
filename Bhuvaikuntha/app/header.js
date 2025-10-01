import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const scale = (size) => (width / 375) * size;

export default function AppHeader({ title, showProfile = false, onBack, onNotification }) {
  return (
    <View style={styles.header}>
      {/* Left Side: Either Back or Profile */}
      {onBack ? (
        <TouchableOpacity onPress={onBack}>
          <Ionicons name="chevron-back" size={scale(22)} color="#fff" />
        </TouchableOpacity>
      ) : showProfile ? (
        <Image
          source={require("../assets/images/icon.png")}
          style={styles.profile}
        />
      ) : (
        <View style={{ width: scale(35) }} /> // placeholder to balance
      )}

      {/* Title */}
      <Text style={styles.headerTitle}>{title}</Text>

      {/* Right Side: Notification */}
      <TouchableOpacity onPress={onNotification}>
        <Ionicons name="notifications-outline" size={scale(22)} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#FF6600",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(12),
    paddingTop: scale(45),
    paddingBottom: scale(12),
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
    textAlign: "center",
  },
});
