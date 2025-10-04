import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function CustomTabBar_admin() {
  const router = useRouter();
  const segments = useSegments();
  const [role,setRole]=useState('')

  
  useEffect(() => {
    const getUser = async () => {
      const storedUser = await AsyncStorage.getItem('userData');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setRole(parsedUser.role || '');
      }
    };
    getUser();
  }, []);

  // Join segments to compare full route path
  const currentPath = segments.join('/');

  const renderTab = (route, iconName, iconSize = 24) => {
      const isActive =
    (!currentPath && route === 'admin/admin_dashboard') ||
    currentPath === route;
    return (
      <TouchableOpacity
        onPress={() => router.push(`../${route}`)}
        style={[styles.tabItem, isActive && styles.activeTabItem]}
      >
        <Ionicons name={iconName} size={iconSize} color={isActive ? "#7e57c2" : "white"} />
      </TouchableOpacity>
    );
  };

  const renderRoleBasedTab = () => {
  if (role === 'super_admin') {
    return renderTab('admin/users_list', 'person-add-outline');
  } else if (role === 'admin') {
    return renderTab('admin/add_video', 'logo-youtube', 28);
  } else if (role === 'sub_admin') {
   return renderTab('admin/scanCoupon', 'qr-code-outline', 28);
  }
  return null; // fallback if role is undefined
};

  return (
    <View style={styles.container}>
      <View style={styles.tabBackground}>
       {renderTab('admin/darshan_management', 'albums-outline')}
        {renderTab('admin/allList', 'list-outline', 28)}
        {renderTab('admin/admin_dashboard', 'grid-outline', 28)}
        {renderRoleBasedTab()}
        {renderTab('admin/admin_profile', 'person-circle-outline',28)}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 53,
    left: 10,
    right: 10,
    alignItems: "center",
  },
  tabBackground: {
    flexDirection: "row",
    backgroundColor: "#7e57c2",
    borderRadius: 40,
    justifyContent: "space-around",
    alignItems: "center",
    height: 60,
    width: "100%",
    paddingHorizontal: 20,
  },
  tabItem: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  activeTabItem: {
    backgroundColor: "white",
    width: 58,
    height: 58,
    borderRadius: 29,
    top: -18,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
