import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  StatusBar,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const images = [
  { uri: "https://i.ibb.co/6Rm8W1B/temple.jpg" },
  { uri: "https://i.ibb.co/xzJt9Vh/temple2.jpg" },
  { uri: "https://i.ibb.co/kSX56tS/temple3.jpg" },
];

export default function WelcomeScreen() {
  const [index, setIndex] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Carousel */}
      <Carousel
        loop
        width={width}
        height={height * 0.72} // responsive height
        autoPlay={true}
        data={images}
        scrollAnimationDuration={1200}
        onSnapToItem={(i) => setIndex(i)}
        renderItem={({ item }) => (
          <ImageBackground
            source={{ uri: item.uri }}
            style={styles.background}
            resizeMode="cover"
          >
            {/* Skip Button */}
            <TouchableOpacity style={styles.skipBtn}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>

            {/* Overlay Content */}
            <View style={styles.content}>
              <Text style={styles.title}>Welcome to</Text>
              <Text style={styles.appName}>Bhuvaikuntha</Text>
              <Text style={styles.subtitle}>
                Your sacred companion for darshan, {"\n"} donations & devotion
              </Text>
            </View>

            {/* Pagination Dots inside */}
            <View style={styles.pagination}>
              {images.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.dot,
                    { opacity: i === index ? 1 : 0.3 },
                  ]}
                />
              ))}
            </View>
          </ImageBackground>
        )}
      />

      {/* Bottom Buttons */}
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.signUpBtn}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signInBtn}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  background: {
    flex: 1,
    justifyContent: "flex-start",
  },
  skipBtn: {
    position: "absolute",
    top: "5%", // responsive
    right: "5%", // responsive
    zIndex: 1,
  },
  skipText: {
    fontSize: width * 0.04, // responsive font size
    color: "#fff",
    fontWeight: "500",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "8%",
    marginTop: "15%",
  },
  title: {
    fontSize: width * 0.055, // scales with screen
    fontWeight: "600",
    color: "#fff",
  },
  appName: {
    fontSize: width * 0.07,
    fontWeight: "bold",
    color: "#fff",
    marginVertical: "2%",
  },
  subtitle: {
    fontSize: width * 0.035,
    textAlign: "center",
    color: "#fff",
    marginTop: "2%",
  },
  pagination: {
    position: "absolute",
    bottom: "5%",
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: width * 0.025,
    height: width * 0.025,
    borderRadius: 50,
    backgroundColor: "#fff",
    marginHorizontal: 4,
  },
  bottom: {
    padding: "6%",
  },
  signUpBtn: {
    backgroundColor: "#FF6600",
    paddingVertical: "4%",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: "4%",
  },
  signUpText: {
    color: "#fff",
    fontSize: width * 0.045,
    fontWeight: "600",
  },
  signInBtn: {
    borderWidth: 1,
    borderColor: "#ccc",
    paddingVertical: "4%",
    borderRadius: 8,
    alignItems: "center",
  },
  signInText: {
    color: "#000",
    fontSize: width * 0.045,
    fontWeight: "600",
  },
});
