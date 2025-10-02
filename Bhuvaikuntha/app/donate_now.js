import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Share,
  Platform,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; 
import BottomNav from "./bottomTab"; 
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");
const scale = (size) => (width / 375) * size;

const donations = [
  {
    id: "1",
    title: "Bhuvaikuntha Temple Construction",
    desc: "Support the building of the Lord’s eternal home. Every brick and pillar rises with your seva.",
    image: require("../assets/images/Deity2.png"),
  },
  {
    id: "2",
    title: "Annadan Seva",
    desc: "Offer the gift of prasadam. Feed devotees and pilgrims with love and compassion.",
    image: require("../assets/images/Deity2.png"),
  },
  {
    id: "3",
    title: "Deity Seva",
    desc: "Serve Sri Pandurangnath with flowers, dress, and daily worship offerings.",
    image: require("../assets/images/Deity2.png"),
  },
  {
    id: "4",
    title: "Festival Seva",
    desc: "Be part of grand celebrations. Contribute to plans, decorations, and festive arrangements.",
    image: require("../assets/images/Deity2.png"),
  },
  {
    id: "5",
    title: "Gau Seva (Cow Seva)",
    desc: "Protect and serve the sacred cows of the Lord. Provide food, care, and shelter.",
    image: require("../assets/images/Deity2.png"),
  },
];

export default function DonateNowScreen() {
  const router = useRouter();
  const [screen, setScreen] = useState({ width, height });

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", ({ window }) => {
      setScreen({ width: window.width, height: window.height });
    });
    return () => subscription?.remove();
  }, []);

  const onShare = async (title) => {
    try {
      await Share.share({
        message: `I just found this seva: ${title}. Let's contribute together 🙏`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={item.image}
        style={[
          styles.image,
          { height: screen.height > screen.width ? scale(160) : scale(240) },
        ]}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.desc}</Text>
      </View>
      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.button} onPress={() => router.push("./donation")}>
          <Text style={styles.buttonText}>DONATE ❤️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.shareButton}
          onPress={() => onShare(item.title)}
        >
          <Ionicons name="share-social-outline" size={scale(18)} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Donate Now</Text>
          <TouchableOpacity onPress={() => onShare("Donation Seva")}>
            <Ionicons
              name="share-outline"
              size={scale(22)}
              color="#000"
              style={{ padding: scale(4) }}
            />
          </TouchableOpacity>
        </View>

        {/* Donation list */}
        <FlatList
          data={donations}
          keyExtractor={(item) => item.id}
          renderItem={renderCard}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: scale(80) }}
        />
      </SafeAreaView>
      <BottomNav />
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0, // fixes notch on Android
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
    fontSize: scale(20),
    fontWeight: "700",
    color: "#000",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: scale(12),
    marginVertical: scale(10),
    padding: scale(12),
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: scale(6),
    elevation: 3,
  },
  image: {
    width: "100%",
    borderRadius: scale(12),
  },
  textContainer: {
    marginVertical: scale(8),
  },
  title: {
    fontSize: scale(15),
    fontWeight: "600",
    marginBottom: scale(4),
     color: "#FF6600",
  },
  desc: {
    fontSize: scale(13),
    color: "#666",
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: scale(8),
  },
  button: {
    flex: 1,
    backgroundColor: "#FF5722",
    borderRadius: scale(25),
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: scale(10),
    marginRight: scale(10),
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: scale(14),
  },
  shareButton: {
    backgroundColor: "#888",
    borderRadius: scale(25),
    padding: scale(10),
    justifyContent: "center",
    alignItems: "center",
  },
});
