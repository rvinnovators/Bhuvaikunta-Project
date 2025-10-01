import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter(); // ✅ FIX

  const tabs = [
    { name: "Home", icon: "home", path: "/dashboard" },
    { name: "Darshan", icon: "image", path: "/darshan" },
    { name: "Donate", icon: "gift", path: "/donate" },
    { name: "Seva", icon: "calendar", path: "/offer_seva" },
    { name: "Temple", icon: "document", path: "/temple" },
  ];

  return (
    <View style={styles.bottomNav}>
      {tabs.map((tab) => {
        const isActive = pathname === tab.path;

        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.navItem}
            onPress={() => router.replace(tab.path)} // ✅ uses router from hook
            activeOpacity={0.7}
          >
            {isActive ? (
              <View style={styles.activeWrapper}>
                <View style={styles.activeCircle}>
                  <Ionicons name={tab.icon} size={22} color="#fff" />
                </View>
              </View>
            ) : (
              <Ionicons name={tab.icon} size={22} color="#666" />
            )}

            <Text
              style={[
                styles.navText,
                {
                  color: isActive ? "#FF6600" : "#666",
                  marginTop: isActive ? 32 : 4,
                },
              ]}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
    height: 70,
    paddingBottom: 12,
  },

  navItem: {
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
  },

  activeWrapper: {
    position: "absolute",
    top: -25, // circle floats half out
    alignItems: "center",
    justifyContent: "center",
  },

  activeCircle: {
    backgroundColor: "#FF6600",
    width: 55,
    height: 55,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  navText: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
});
