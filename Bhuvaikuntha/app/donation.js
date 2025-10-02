import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  FlatList,
  ScrollView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");
const scale = (size) => (width / 375) * size;

const sevaItems = [
  {
    id: "1",
    title: "Offer Bricks",
    desc: "Each brick helps raise the sacred walls of the sanctum",
    price: 501,
    unit: "Brick",
    qty: 4,
  },
  {
    id: "2",
    title: "Offer Cement",
    desc: "Bind the foundation strong with sacred cement seva",
    price: 501,
    unit: "Bag",
    qty: 3,
  },
  {
    id: "3",
    title: "Offer Steel Rods",
    desc: "Support beams and pillars with strength for generations",
    price: 1101,
    unit: "Unit",
    qty: 3,
  },
];

export default function DonationDetailScreen() {
  const router = useRouter();
  const [items, setItems] = useState(sevaItems);

  const updateQty = (id, type) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: type === "inc" ? item.qty + 1 : Math.max(0, item.qty - 1),
            }
          : item
      )
    );
  };

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const renderItem = ({ item }) => (
    <View style={styles.sevaCard}>
      <View style={styles.iconBox}>
        <Ionicons name="cube-outline" size={scale(24)} color="#999" />
      </View>
      <View style={styles.sevaText}>
        <Text style={styles.sevaTitle}>{item.title}</Text>
        <Text style={styles.sevaDesc}>{item.desc}</Text>
        <Text style={styles.sevaPrice}>
          ₹{item.price}/ {item.unit}
        </Text>
      </View>
      <View style={styles.qtyBox}>
        <TouchableOpacity
          style={styles.qtyBtn}
          onPress={() => updateQty(item.id, "dec")}
        >
          <Text style={styles.qtyBtnText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.qtyText}>{item.qty}</Text>
        <TouchableOpacity
          style={styles.qtyBtn}
          onPress={() => updateQty(item.id, "inc")}
        >
          <Text style={styles.qtyBtnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      {/* Status Bar */}
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
          {/* Top Image */}
          <Image
            source={require("../assets/images/Deity2.png")}
            style={styles.banner}
          />

          {/* Title & Description */}
          <View style={styles.textContainer}>
            <Text style={styles.sectionTitle}>
              Support the Building of ISKCON Bhuvaikuntha Temple
            </Text>
            <Text style={styles.sectionDesc}>
              The vision of ISKCON Bhuvaikuntha Temple is unfolding step by step
              — a sacred home where Sri Sri Pandharinath will eternally reside.
              Every devotee’s offering becomes part of this divine journey: a
              brick that forms the sanctum walls, cement that binds the
              foundation, steel that raises the pillars, stone and marble that
              beautify the altar, and skilled artisans who shape every sacred
              detail. Your seva is not just material — it is devotion
              transformed into structure, strength, and sanctity. By
              contributing today, you are helping build a temple that will stand
              for generations.
            </Text>
          </View>

          {/* Seva Options */}
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: scale(100) }}
          />
        </ScrollView>
      </SafeAreaView>

      {/* Bottom Total Bar */}
      <View style={styles.bottomBar}>
        <Text style={styles.totalText}>Total Seva</Text>
        <Text style={styles.totalAmount}>
          ₹{totalAmount.toLocaleString()}
        </Text>
        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => alert("Next Step")}
        >
          <Text style={styles.nextText}>NEXT</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(12),
    paddingVertical: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerTitle: {
    fontSize: scale(18),
    fontWeight: "600",
    color: "#000",
  },
  banner: {
    width: "100%",
    height: scale(200),
    borderRadius: scale(8),
    marginTop: scale(8),
  },
  textContainer: {
    padding: scale(12),
  },
  sectionTitle: {
    fontSize: scale(16),
    fontWeight: "700",
    marginBottom: scale(6),
    color: "#D32F2F",
  },
  sectionDesc: {
    fontSize: scale(13),
    color: "#555",
    lineHeight: scale(18),
  },
  sevaCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    marginHorizontal: scale(12),
    marginVertical: scale(6),
    padding: scale(10),
    borderRadius: scale(8),
    borderWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
  },
  iconBox: {
    width: scale(50),
    height: scale(50),
    backgroundColor: "#f3f3f3",
    borderRadius: scale(8),
    alignItems: "center",
    justifyContent: "center",
    marginRight: scale(10),
  },
  sevaText: {
    flex: 1,
  },
  sevaTitle: {
    fontSize: scale(14),
    fontWeight: "600",
  },
  sevaDesc: {
    fontSize: scale(12),
    color: "#666",
    marginVertical: scale(4),
  },
  sevaPrice: {
    fontSize: scale(13),
    fontWeight: "600",
    color: "#FF5722",
  },
  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyBtn: {
    backgroundColor: "#FF5722",
    borderRadius: scale(4),
    paddingHorizontal: scale(8),
    paddingVertical: scale(2),
  },
  qtyBtnText: {
    color: "#fff",
    fontSize: scale(16),
    fontWeight: "700",
  },
  qtyText: {
    marginHorizontal: scale(8),
    fontSize: scale(14),
    fontWeight: "600",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(16),
    paddingVertical: scale(12),
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  totalText: {
    fontSize: scale(13),
    color: "#333",
  },
  totalAmount: {
    fontSize: scale(16),
    fontWeight: "700",
    color: "#000",
  },
  nextBtn: {
    backgroundColor: "#FF5722",
    borderRadius: scale(25),
    paddingHorizontal: scale(24),
    paddingVertical: scale(10),
  },
  nextText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: scale(14),
  },
});
