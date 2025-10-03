import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
   FlatList, 
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ImageBackground
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Swiper from "react-native-swiper";
import BottomNav from "./bottomTab";

const { width, height } = Dimensions.get("window");
const scale = (size) => (width / 375) * size;

// ✅ Header
const AppHeader = () => {
  const router = useRouter();
  return (
    <SafeAreaView edges={["top"]} style={{ backgroundColor: "#FF6600" }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/profile")}>
          <Image
            source={require("../assets/images/icon.png")}
            style={styles.profile}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Home</Text>
    <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => router.push('/notification')}
        >
        
          <Ionicons name="notifications-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default function HomeScreen() {
  const router = useRouter();

  // Dummy Data
  const quickAccess = [
    { id: "1", title: "Daily Darshan", image: require("../assets/images/icon.png"), path: "/leader" },
    { id: "2", title: "My Donations", image: require("../assets/images/icon.png"), path: "/my-donations" },
    { id: "3", title: "Temple Updates", image: require("../assets/images/icon.png"), path: "/temple" },
    { id: "4", title: "Live Darshan", image: require("../assets/images/icon.png"), path: "/live_darshan" },
    { id: "5", title: "Anna Daan Seva", image: require("../assets/images/icon.png"), path: "/anna-daan" },
    { id: "6", title: "Offer Your Seva", image: require("../assets/images/icon.png"), path: "/offer-seva" },
  ];

  const donateNow = [
    {
      id: "1",
      title: "Bhuvaikuntha Temple Construction",
      desc: "Support the building of the Lord’s eternal home.",
      image: require("../assets/images/icon.png"),
    },
    {
      id: "2",
      title: "Ahmedabad Mandir",
      desc: "Offer your seva for this grand project.",
      image: require("../assets/images/icon.png"),
    },
  ];

  const sevaProgress = [
    { id: "1", title: "Sanctum Foundation Completed", image: require("../assets/images/card.png") },
    { id: "2", title: "Hall Pillars Initiated", image: require("../assets/images/card.png") },
     { id: "3", title: "Hall Pillars Initiated", image: require("../assets/images/card.png") },
  ];

  const sevaChampions = [
    { id: "1", name: "Jay Shah", amount: "₹1,20,000" },
    { id: "2", name: "Priya Patel", amount: "₹75,500" },
    { id: "3", name: "Rajiv Patel", amount: "₹63,400" },
  ];

 const donationImportance = [
  {
    id: "1",
    image: require("../assets/images/b.png"),
    shloka: "पत्रं पुष्पं फलं तोयं\nयो मे भक्त्या प्रयच्छति...",
    text: "If one offers Me with love and devotion a leaf, a flower, a fruit or water, I will accept it.",
  },
  {
    id: "2",
    image: require("../assets/images/b.png"),
    shloka: "दानं धर्मं परं स्मृतम्...",
    text: "Donation purifies the heart and brings you closer to the Lord.",
  },
  {
    id: "3",
    image: require("../assets/images/b.png"),
    shloka: "लोकः समस्ताः सुखिनो भवन्तु...",
    text: "Let the entire world be happy – giving helps spread happiness.",
  },
];
const blessings = [
  {
    id: "1",
    image: require("../assets/images/b.png"),
    text: "Maharashtra’s biggest gift to the world is Panduranga. This Bhuvaikuntha Pandharpur will spread the glories of Sri Sri Radha Pandharinath throughout the world.",
    author: "His Holiness Lokanath Swami Maharaja",
    role: "ISKCON Acharya",
  },
  {
    id: "2",
    image: require("../assets/images/b.png"),
    text: "By donating with love, you participate in the eternal seva of the Lord. This service is never lost.",
    author: "HH Radhanath Swami",
    role: "Spiritual Leader",
  },
];


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }} edges={["left", "right"]}>
      <StatusBar backgroundColor="#FF6600" barStyle="light-content" />

      {/* Header */}
      <AppHeader />

      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 90 }}>

         {/* ✅ Banner Carousel */}
<View style={styles.bannerWrapper}>
  <Swiper
    autoplay
    showsPagination
    dotStyle={styles.dot}
    activeDotStyle={styles.activeDot}
  >
    {/* Banner Slide 1 */}
    <View style={styles.bannerSlide}>
      <ImageBackground
        source={require("../assets/images/f1.png")}
        style={styles.bannerImage}
        imageStyle={{ borderRadius: 0 }}
      >
       
      </ImageBackground>
    </View>

    {/* Banner Slide 2 */}
    <View style={styles.bannerSlide}>
      <ImageBackground
        source={require("../assets/images/f1.png")}
        style={styles.bannerImage}
        imageStyle={{ borderRadius: 0 }}
      />
    </View>
  </Swiper>
</View>

      {/* Quick Access */}
<Text style={styles.sectionTitle}>Quick Access</Text>

<FlatList
  data={quickAccess}
  scrollEnabled={false} 
  keyExtractor={(item) => item.id.toString()}
  numColumns={2} // ✅ 2-column grid
  columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: 12 }}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.quickCard}
      onPress={() => router.push(item.path)}
    >
      <Image source={item.image} style={styles.quickIcon} />
      <Text style={styles.quickText}>{item.title}</Text>
    </TouchableOpacity>
  )}
/>


        {/* Featured Seva Campaigns */}
<View style={styles.rowBetween}>
  <Text style={styles.sectionTitle}>Featured Seva Campaigns</Text>
  <Text style={styles.seeAll}>See all</Text>
</View>

<ScrollView 
  horizontal 
  showsHorizontalScrollIndicator={false} 
  style={{ paddingLeft: 12 }}
>
  {donateNow.map((item) => (
    <View key={item.id} style={styles.donateCard}>
      <Image source={item.image} style={styles.donateImage} />

      <Text style={styles.donateTitle}>{item.title}</Text>
      <Text style={styles.donateDesc}>{item.desc}</Text>

      <TouchableOpacity style={styles.donateBtn}>
        <Text style={styles.donateBtnText}>DONATE ♥</Text>
      </TouchableOpacity>
    </View>
  ))}
</ScrollView>


    {/* Seva Progress */}
<View style={styles.rowBetween}>
  <Text style={styles.sectionTitle}>See the Progress of Your Seva</Text>
  <Text style={styles.seeAll}>See all</Text>
</View>

<ScrollView 
  horizontal 
  showsHorizontalScrollIndicator={false} 
  style={{ paddingLeft: 12 }}
>
  {sevaProgress.map((item) => (
    <View key={item.id} style={styles.progressCard}>
      <Image source={item.image} style={styles.progressImage} />
      
      {/* Gradient overlay for text */}
      <View style={styles.progressOverlay}>
        <Text style={styles.progressTitle}>{item.title}</Text>
      </View>
    </View>
  ))}
</ScrollView>


         
      {/* ✅ Seva Champions */}
<View style={styles.championsCard}>
  <Text style={styles.championsTitle}>Seva Champions</Text>
  <Text style={styles.championsSubtitle}>Honoring our dedicated devotees</Text>

  {sevaChampions.map((champ, index) => (
    <View key={champ.id} style={styles.championRow}>
      <Text style={styles.championRank}>{index + 1}</Text>
      <View style={styles.championAvatar} />
      <Text style={styles.championName}>{champ.name}</Text>
      <Text style={styles.championAmount}>₹{champ.amount.toLocaleString()}</Text>
    </View>
  ))}

  <TouchableOpacity>
    <Text style={styles.viewLeaderboard}>View all Leaderboard</Text>
  </TouchableOpacity>
</View>

{/* ✅ Importance of Donations (Carousel) */}
<Text style={styles.sectionTitle}>Importance of Donation</Text>

<View style={styles.carouselWrapper}>
  <Swiper
    autoplay
    loop
    dotStyle={styles.dotStyle}
    activeDotStyle={styles.activeDotStyle}
  >
    {donationImportance.map((card) => (
      <View key={card.id} style={styles.importanceCard}>
        {/* Background Image */}
        <Image source={card.image} style={styles.importanceImage} />

        {/* Dark Overlay */}
        <View style={styles.overlay} />

        {/* Centered Text */}
        <View style={styles.textWrapper}>
          <Text style={styles.shlokaText}>{card.shloka}</Text>
          <Text style={styles.importanceText}>{card.text}</Text>
        </View>
      </View>
    ))}
  </Swiper>
</View>


{/* ✅ Blessings from Acharya (Carousel) */}
<Text style={styles.sectionTitle}>Blessings from Our Acharya</Text>

<View style={styles.blessingCarousel}>
  <Swiper
    autoplay={false}  // ❌ no auto-scroll
    loop={false} 
    dotStyle={styles.dotStyle}
    activeDotStyle={styles.activeDotStyle}
    paginationStyle={{ bottom: 8 }} // keep dots inside card
  >
    {blessings.map((item) => (
      <View key={item.id} style={styles.blessingCard}>
        {/* Left image + right content */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={item.image} style={styles.blessingImage} />

          <View style={styles.blessingContent}>
            <Text style={styles.quoteMark}>“</Text>
            <Text style={styles.blessingText}>{item.text}</Text>
            <Text style={styles.blessingAuthor}>{item.author}</Text>
            <Text style={styles.blessingRole}>{item.role}</Text>
          </View>
        </View>
      </View>
    ))}
  </Swiper>
</View>
        </ScrollView>

        {/* Bottom Navigation */}
        <BottomNav />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  // Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(12),
    paddingVertical: scale(12),
    backgroundColor: "#FF6600",
  },
  profile: { width: scale(32), height: scale(32), borderRadius: 20 },
  headerTitle: { color: "#fff", fontSize: scale(16), fontWeight: "700" },

  // Banner
bannerWrapper: {
  width: "100%",
  aspectRatio: 3/4,   // ✅ exact temple proportion like your screenshot
  borderRadius: 0,
  overflow: "hidden",
  marginBottom: 10,
},

bannerSlide: {
  flex: 1,
},

bannerImage: {
  flex: 1,
  resizeMode: "cover",  // ✅ fills but keeps temple visible
  justifyContent: "flex-end",
},

bannerOverlay: {
  padding: 20,
  alignItems: "center",
},

bannerTitle: {
  fontSize: 22,
  fontWeight: "bold",
  color: "#FFD700",
  textAlign: "center",
},

bannerSubtitle: {
  fontSize: 14,
  color: "#fff",
  textAlign: "center",
  marginVertical: 5,
},

bannerBtn: {
  backgroundColor: "#FFA500",
  paddingVertical: 8,
  paddingHorizontal: 18,
  borderRadius: 20,
  marginTop: 10,
},

bannerBtnText: {
  color: "#fff",
  fontWeight: "bold",
},

dot: {
  backgroundColor: "rgba(255,255,255,0.5)",
  width: 6,
  height: 6,
  borderRadius: 3,
  margin: 3,
},

activeDot: {
  backgroundColor: "#FFA500",
  width: 8,
  height: 8,
  borderRadius: 4,
  margin: 3,
},

  // Section Title
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginHorizontal: 12,
    marginVertical: 10,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 12,
  },
  seeAll: { color: "#FF6600", fontSize: 12, fontWeight: "600" },

  // Quick Access
quickCard: {
  flex: 1,
  backgroundColor: "#fff",
  borderRadius: 12,
  marginBottom: 12,
  marginHorizontal: 4,
  overflow: "hidden",
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 2 },
  elevation: 2,
},

quickIcon: {
  width: "100%",
  height: 80,
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
},

quickText: {
  fontSize: 13,
  fontWeight: "600",
  color: "#000",
  padding: 8,
  textAlign: "center",
},

  // Donate Now
 rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 12,
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },

  seeAll: {
    fontSize: 13,
    color: "#FF6600",
    fontWeight: "600",
  },

donateCard: {
  width: 220,
  backgroundColor: "#fff",
  borderRadius: 12,
  marginRight: 12,
  padding: 10,
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 2 },
  elevation: 3, // shadow for Android
  minHeight: 220,   // ✅ fix card height
  marginBottom: 16, // ✅ spacing below card so next section won’t overlap
},


  donateImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },

  donateTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
    marginBottom: 4,
  },

  donateDesc: {
    fontSize: 12,
    color: "#666",
    marginBottom: 10,
  },

  donateBtn: {
    backgroundColor: "#FF7A00",
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  donateBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 13,
  },
  // Progress
 rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 12,
    marginTop: 10,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },

  seeAll: {
    fontSize: 13,
    color: "#FF6600",
    fontWeight: "600",
  },

  progressCard: {
    width: 180,
    height: 200,
    borderRadius: 12,
    marginRight: 12,
    overflow: "hidden",
  },

  progressImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },

  progressOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
  
  },

  progressTitle: {
    fontSize: 13,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  // Seva Champions
championsCard: {
    backgroundColor: "#FFF8F0", // light orange shade like screenshot
    marginHorizontal: 12,
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    elevation: 2,
  },
  championsTitle: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 4,
  },
  championsSubtitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginBottom: 12,
  },
  championRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginVertical: 4,
    elevation: 1,
  },
  championRank: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FF6600",
    marginRight: 8,
    width: 20,
    textAlign: "center",
  },
  championAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#ccc",
    marginRight: 8,
  },
  championName: {
    flex: 1,
    fontSize: 14,
    fontWeight: "500",
    color: "#333",
  },
  championAmount: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
  },
  viewLeaderboard: {
    color: "#FF6600",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 8,
  },

  // Importance of Donations
    sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginHorizontal: 12,
    marginVertical: 10,
    textAlign: "center",
  },

  carouselWrapper: {
    height: 240,
    marginHorizontal: 12,
    borderRadius: 12,
    overflow: "hidden",
  },

  importanceCard: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  importanceImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)", // semi-transparent black overlay
  },
  textWrapper: {
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  shlokaText: {
    color: "#fff",
    fontSize: 13,
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: 10,
    lineHeight: 18,
  },
  importanceText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    lineHeight: 20,
  },

  // Pagination dots
  dotStyle: {
    backgroundColor: "#ccc",
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  activeDotStyle: {
    backgroundColor: "#FF6600",
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  // Blessings
sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginHorizontal: 12,
    marginVertical: 10,
    textAlign: "center",
  },

  blessingCarousel: {
    height: 180,
    marginHorizontal: 12,
    borderRadius: 12,
    overflow: "hidden",
  },

  blessingCard: {
    flex: 1,
    backgroundColor: "#FFF8F0",
    borderRadius: 12,
    padding: 14,
    justifyContent: "center",
  },

  blessingImage: {
    width: 55,
    height: 55,
    borderRadius: 28,
    marginRight: 12,
  },

  blessingContent: {
    flex: 1,
    justifyContent: "center",
  },

  quoteMark: {
    fontSize: 22,
    color: "#FF6600",
    fontWeight: "bold",
    marginBottom: 4,
  },

  blessingText: {
    fontSize: 13,
    color: "#444",
    marginBottom: 6,
    lineHeight: 18,
  },

  blessingAuthor: {
    fontSize: 13,
    fontWeight: "700",
    color: "#000",
  },

  blessingRole: {
    fontSize: 11,
    color: "#777",
  },

  dotStyle: {
    backgroundColor: "#ccc",
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  activeDotStyle: {
    backgroundColor: "#FF6600",
    width: 7,
    height: 7,
    borderRadius: 4,
    marginHorizontal: 3,
  },
});
