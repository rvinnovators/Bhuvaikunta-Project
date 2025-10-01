import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";


const { width } = Dimensions.get("window");
const scale = (size) => (width / 375) * size; // responsive scaling

export default function SevaReceipt() {
      const router = useRouter();
    
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Card */}
      <View style={styles.card}>
        {/* Temple Icon */}
        <Image
          source={require("../assets/images/logo.webp")} // replace with temple icon
          style={styles.templeIcon}
          resizeMode="contain"
        />

        <Text style={styles.sanskrit}>सर्वे भवन्तु सुखिनः</Text>

        {/* Thank You Message */}
        <Text style={styles.thankText}>
          🙏 Thank you, Jagannath!
        </Text>
        <Text style={styles.message}>
          Your seva for <Text style={{ fontWeight: "700" }}>Morning Mangala Aarti Seva</Text> 
          {"\n"}has been received with blessings
        </Text>

        {/* Seva Details */}
        <View style={styles.details}>
          <DetailRow label="Seva Type" value="Mangala Aarti Seva" />
          <DetailRow label="Ref Number" value="000085752257" />
          <DetailRow label="Payment Date, Time" value="25-02-2025, 13:22:16" />
          <DetailRow label="Payment Method" value="Bank Transfer" />
          <DetailRow label="Amount" value="₹5,459.00" highlight />
        </View>

        {/* Download & Share Buttons */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="download-outline" size={16} color="#fff" />
            <Text style={styles.actionText}>Download</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Ionicons name="share-social-outline" size={16} color="#fff" />
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Back to Home */}
      <TouchableOpacity style={styles.homeBtn}>
        <Text style={styles.homeText} onPress={() => router.replace("./dashboard")}>Back To Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* Reusable Detail Row */
const DetailRow = ({ label, value, highlight }) => (
  <View style={styles.detailRow}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text
      style={[
        styles.detailValue,
        highlight && { fontWeight: "700", color: "#000" },
      ]}
    >
      {value}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: scale(16),
    alignItems: "center",
    justifyContent: "center",
  },

  card: {
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 12,
    padding: scale(20),
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },

  templeIcon: {
    width: scale(80),
    height: scale(80),
    marginBottom: scale(8),
    tintColor: "#FF6600", // orange
  },

  sanskrit: {
    fontSize: scale(14),
    color: "#FF6600",
    fontWeight: "600",
    marginBottom: scale(10),
  },

  thankText: {
    fontSize: scale(16),
    fontWeight: "700",
    color: "#000",
    marginBottom: 4,
    textAlign: "center",
  },

  message: {
    fontSize: scale(13),
    color: "#444",
    textAlign: "center",
    marginBottom: scale(16),
  },

  details: {
    width: "100%",
    marginBottom: scale(16),
  },

  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: scale(8),
  },

  detailLabel: {
    fontSize: scale(13),
    color: "#666",
  },

  detailValue: {
    fontSize: scale(13),
    color: "#333",
    fontWeight: "500",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: scale(12),
  },

  actionBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FF6600",
    paddingVertical: scale(10),
    marginHorizontal: scale(4),
    borderRadius: 8,
  },

  actionText: {
    color: "#fff",
    marginLeft: 6,
    fontSize: scale(13),
    fontWeight: "600",
  },

  homeBtn: {
    marginTop: scale(20),
    backgroundColor: "#FF6600",
    paddingVertical: scale(12),
    paddingHorizontal: scale(40),
    borderRadius: 8,
    alignSelf: "center",
    width: "100%",
  },

  homeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: scale(14),
    textAlign: "center",
  },
});
