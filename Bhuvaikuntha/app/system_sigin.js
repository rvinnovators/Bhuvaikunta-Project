import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Dimensions,
  Alert,
  TextInput,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

// Screen dimensions
const { width, height } = Dimensions.get("window");

// scale function (responsive font & size)
const scale = (size) => (width / 375) * size;

export default function LoginScreen() {
  const router = useRouter();
  const [activeOption, setActiveOption] = useState("Biometric");
  const [pin, setPin] = useState("");
  const [otp, setOtp] = useState("");
  const [mobile, setMobile] = useState("");

  // 🔐 Fingerprint Authentication
  const handleFingerprintAuth = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        Alert.alert("Error", "Biometric hardware not available.");
        return;
      }

      const enrolled = await LocalAuthentication.isEnrolledAsync();
      if (!enrolled) {
        Alert.alert("Error", "No biometrics registered.");
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Confirm with Fingerprint",
        cancelLabel: "Cancel",
        disableDeviceFallback: false,
      });

      if (result.success) {
        router.push("./dashboard");
      } else {
        Alert.alert("Failed", "Fingerprint authentication failed!");
      }
    } catch (err) {
      console.log("Fingerprint Error:", err);
    }
  };

  // 🔐 Face Authentication
  const handleFaceAuth = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Verify with Face ID",
        cancelLabel: "Cancel",
        disableDeviceFallback: false,
      });

      if (result.success) {
        router.push("/home");
      } else {
        Alert.alert("Failed", "Face ID authentication failed!");
      }
    } catch (err) {
      console.log("Face ID Error:", err);
    }
  };

  // 🔑 PIN Login
  const handlePinLogin = () => {
    if (mobile.length < 10) {
      Alert.alert("Error", "Enter a valid mobile number.");
      return;
    }
    if (pin === "1234") {
      router.push("/home");
    } else {
      Alert.alert("Invalid PIN", "Please enter the correct PIN.");
    }
  };

  // 📩 OTP Login
  const handleOtpLogin = () => {
    if (mobile.length < 10) {
      Alert.alert("Error", "Enter a valid mobile number.");
      return;
    }
    if (otp === "0000") {
      router.push("/home");
    } else {
      Alert.alert("Invalid OTP", "Please enter the correct OTP.");
    }
  };

  // Simulate Sending OTP
  const sendOtp = () => {
    if (mobile.length < 10) {
      Alert.alert("Error", "Enter a valid mobile number.");
      return;
    }
    Alert.alert("OTP Sent", `OTP sent to +91 ${mobile}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/logo.webp")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.logoText}>ISKCON PANDHARPUR</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <Text style={[styles.tab, styles.activeTab]}>Sign in</Text>
        <Text style={styles.tab} onPress={() => router.push("./system_sigup")}>
          Sign up
        </Text>
      </View>

      {/* Options */}
      <View style={styles.optionContainer}>
        {["Biometric", "PIN", "OTP"].map((opt) => (
          <Text
            key={opt}
            style={[styles.option, activeOption === opt && styles.activeOption]}
            onPress={() => setActiveOption(opt)}
          >
            {opt}
          </Text>
        ))}
      </View>

      {/* Render Based on Selected Option */}
      {activeOption === "Biometric" && (
        <>
          <TouchableOpacity style={styles.button} onPress={handleFingerprintAuth}>
            <Ionicons name="finger-print-outline" size={scale(20)} color="#fff" />
            <Text style={styles.buttonText}>Authenticate with Biometrics</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleFaceAuth}>
            <Ionicons name="happy-outline" size={scale(20)} color="#fff" />
            <Text style={styles.buttonText}>Authenticate with Face Unlock</Text>
          </TouchableOpacity>
        </>
      )}

      {activeOption === "PIN" && (
        <View style={styles.inputContainer}>
          {/* Mobile Number */}
          <Text style={styles.label}>
            Mobile Number <Text style={{ color: "red" }}>*</Text>
          </Text>
          <View style={styles.mobileInputContainer}>
            <Text style={styles.countryCode}>+91</Text>
            <TextInput
              style={styles.mobileInput}
              placeholder="Enter your Phone Number"
              placeholderTextColor="#888"
              keyboardType="phone-pad"
              maxLength={10}
              value={mobile}
              onChangeText={setMobile}
            />
          </View>

          {/* PIN */}
          <Text style={styles.label}>PIN</Text>
          <View style={styles.otpContainer}>
            <Ionicons name="lock-closed-outline" size={scale(18)} color="#888" style={{ marginLeft: 8 }} />
            <TextInput
              style={styles.otpInput}
              placeholder="Enter 4 Digit Pin"
              placeholderTextColor="#888"
              secureTextEntry
              keyboardType="numeric"
              maxLength={4}
              value={pin}
              onChangeText={setPin}
            />
          </View>

          <TouchableOpacity style={styles.signInButton} onPress={handlePinLogin}>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      )}

      {activeOption === "OTP" && (
        <View style={styles.inputContainer}>
          {/* Mobile Number */}
          <Text style={styles.label}>
            Mobile Number <Text style={{ color: "red" }}>*</Text>
          </Text>
          <View style={styles.mobileInputContainer}>
            <Text style={styles.countryCode}>+91</Text>
            <TextInput
              style={styles.mobileInput}
              placeholder="Enter your Phone Number"
              placeholderTextColor="#888"
              keyboardType="phone-pad"
              maxLength={10}
              value={mobile}
              onChangeText={setMobile}
            />
          </View>

          {/* Send OTP */}
          <TouchableOpacity style={styles.sendOtpButton} onPress={sendOtp}>
            <Text style={styles.sendOtpText}>Send OTP</Text>
          </TouchableOpacity>

          {/* OTP Field */}
          <Text style={styles.label}>OTP</Text>
          <View style={styles.otpContainer}>
            <Ionicons name="lock-closed-outline" size={scale(18)} color="#888" style={{ marginLeft: 8 }} />
            <TextInput
              style={styles.otpInput}
              placeholder="Enter 4 Digit OTP"
              placeholderTextColor="#888"
              keyboardType="numeric"
              maxLength={4}
              value={otp}
              onChangeText={setOtp}
            />
          </View>

          <TouchableOpacity style={styles.signInButton} onPress={handleOtpLogin}>
            <Text style={styles.signInText}>Verify OTP</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Footer */}
      <Text style={styles.footerText}>
        Use your fingerprint, Face ID, PIN or OTP{"\n"}for quick and secure access
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: scale(16),
  },
  logoContainer: {
    alignItems: "center",
    marginTop: height * 0.2,
    marginBottom: scale(20),
  },
  logo: {
    width: width * 0.25,
    height: width * 0.25,
  },
  logoText: {
    fontSize: scale(14),
    fontWeight: "600",
    marginTop: 6,
    letterSpacing: 1,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: scale(20),
  },
  tab: {
    fontSize: scale(16),
    color: "#666",
    marginHorizontal: scale(20),
    paddingBottom: scale(6),
  },
  activeTab: {
    color: "#FF6600",
    fontWeight: "700",
    borderBottomWidth: 2,
    borderBottomColor: "#FF6600",
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: scale(20),
  },
  option: {
    fontSize: scale(12),
    color: "#aaa",
    marginHorizontal: scale(8),
    paddingVertical: scale(6),
    paddingHorizontal: scale(14),
    borderRadius: 20,
    backgroundColor: "#f2f2f2",
  },
  activeOption: {
    backgroundColor: "#FF6600",
    color: "#fff",
    fontWeight: "600",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CC5500",
    paddingVertical: scale(14),
    borderRadius: 10,
    marginVertical: scale(8),
  },
  buttonText: {
    color: "#fff",
    fontSize: scale(14),
    fontWeight: "600",
    marginLeft: 10,
  },
  inputContainer: {
    alignItems: "center",
    width: "100%",
  },
  label: {
    alignSelf: "flex-start",
    marginLeft: "10%",
    marginBottom: scale(5),
    fontSize: scale(13),
    fontWeight: "600",
    color: "#333",
  },
  mobileInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    width: "85%",
    paddingHorizontal: 10,
    marginBottom: scale(12),
    backgroundColor: "#fff",
  },
  countryCode: {
    fontSize: scale(14),
    fontWeight: "600",
    marginRight: 8,
  },
  mobileInput: {
    flex: 1,
    fontSize: scale(14),
    paddingVertical: scale(8),
  },
  otpContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    width: "85%",
    paddingHorizontal: 5,
    marginBottom: scale(15),
    backgroundColor: "#fff",
  },
  otpInput: {
    flex: 1,
    fontSize: scale(14),
    paddingVertical: scale(8),
    paddingHorizontal: 8,
  },
  signInButton: {
    backgroundColor: "#FF6600",
    width: "85%",
    paddingVertical: scale(14),
    borderRadius: 6,
    alignItems: "center",
  },
  signInText: {
    color: "#fff",
    fontSize: scale(14),
    fontWeight: "700",
  },
  sendOtpButton: {
    backgroundColor: "#eee",
    borderRadius: 6,
    paddingVertical: scale(10),
    paddingHorizontal: scale(20),
    marginBottom: scale(12),
  },
  sendOtpText: {
    color: "#333",
    fontSize: scale(13),
    fontWeight: "600",
  },
  footerText: {
    textAlign: "center",
    color: "#555",
    marginTop: scale(20),
    fontSize: scale(13),
    lineHeight: scale(18),
  },
});
