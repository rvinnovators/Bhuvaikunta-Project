import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Switch,
  Platform,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

// Scale function (base on iPhone X width = 375)
const guidelineBaseWidth = 375;
const scale = (size) => (width / guidelineBaseWidth) * size;

export default function ProfileScreen({ navigation }) {
      const router = useRouter();
    
  const [isEnabled, setIsEnabled] = React.useState(true);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* StatusBar for Android */}
      <View style={styles.statusBarSpacer} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={scale(22)} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: scale(22) }} /> {/* spacer */}
      </View>

      {/* Profile Info */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Jagannath Gangul</Text>
        <TouchableOpacity style={styles.editButton}>
          <Ionicons
            name="pencil-outline"
            size={scale(14)}
            color="#FF5722"
            style={{ marginRight: scale(6) }}
          />
          <Text style={styles.editText} onPress={() => router.push("./edit")}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Menu List */}
      <View style={styles.menu}>
        <MenuItem label="My Sevas" color="#4CAF50" />
        <MenuItem label="Privacy Settings" color="#FF9800" />
        <MenuItem label="Contact Temple" color="#9C27B0" />
        <MenuItem
          label="Notifications"
          color="#F44336"
          rightComponent={
            <Switch
              value={isEnabled}
              onValueChange={setIsEnabled}
              trackColor={{ true: "#4CAF50" }}
            />
          }
        />
        <MenuItem label="Sign Out" color="#9C27B0" />
      </View>
    </SafeAreaView>
  );
}

// ✅ Reusable Menu Item Component
function MenuItem({ label, color, rightComponent }) {
  return (
    <TouchableOpacity style={styles.menuItem}>
      <View style={[styles.iconBox, { backgroundColor: color }]} />
      <Text style={styles.menuText}>{label}</Text>
      {rightComponent ? (
        rightComponent
      ) : (
        <Ionicons name="chevron-forward" size={scale(18)} color="#999" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
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

  profileSection: {
    alignItems: "center",
    backgroundColor: "#FF5722",
    paddingBottom: scale(24),
    paddingTop: scale(20),
    borderBottomLeftRadius: scale(20),
    borderBottomRightRadius: scale(20),
  },
  avatar: {
    width: scale(90),
    height: scale(90),
    borderRadius: scale(45),
    borderWidth: 2,
    borderColor: "#fff",
    marginBottom: scale(10),
  },
  name: {
    fontSize: scale(16),
    fontWeight: "600",
    color: "#fff",
    marginBottom: scale(8),
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: scale(6),
    paddingHorizontal: scale(12),
    borderRadius: scale(6),
  },
  editText: {
    color: "#FF5722",
    fontSize: scale(13),
    fontWeight: "500",
  },

  menu: {
    marginTop: scale(20),
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: scale(14),
    paddingHorizontal: scale(16),
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  iconBox: {
    width: scale(16),
    height: scale(16),
    borderRadius: scale(4),
    marginRight: scale(12),
  },
  menuText: {
    flex: 1,
    fontSize: scale(14),
    color: "#333",
  },
});
