import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";

export default function BottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const tabs = [
    { name: "Home", icon: "home", path: "/dashboard" },
    { name: "Darshan", icon: "image", path: "/darshan" },
    { name: "Donate", icon: "gift", path: "/donate_now" },
    { name: "Seva", icon: "calendar", path: "/offer_seva" },
    { name: "Temple", icon: "document", path: "/temple" },
  ];

  return (
    <View style={styles.bottomNavWrapper}>
      <View style={styles.bottomNav}>
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;

          return (
            <TouchableOpacity
              key={tab.name}
              style={styles.navItem}
              onPress={() => router.push(tab.path)}
              activeOpacity={0.7}
            >
              {isActive ? (
                <View style={styles.activeCircle}>
                  <Ionicons name={tab.icon} size={22} color="#fff" />
                </View>
              ) : (
                <Ionicons name={tab.icon} size={22} color="#fff" />
              )}

              <Text
                style={[
                  styles.navText,
                  { color: isActive ? "#FF6600" : "#fff" },
                ]}
              >
                {tab.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNavWrapper: {
    backgroundColor: "#fff", // outer white background
    paddingBottom: 10,
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 16,
    backgroundColor: "#111", // black rounded bar
    borderRadius: 12,
    paddingVertical: 8,
  },

  navItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  activeCircle: {
    backgroundColor: "#FF6600",
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },

  navText: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 2,
  },
});
