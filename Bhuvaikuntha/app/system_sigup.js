import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import Checkbox from "expo-checkbox";
import RNPickerSelect from "react-native-picker-select";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const { width, height } = Dimensions.get("window");
const scale = (size) => (width / 375) * size;

export default function SignUpScreen() {
  const router = useRouter();

  // 🔹 Form States
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [pan, setPan] = useState("");

  const [isChecked, setIsChecked] = useState(false);
  const [dob, setDob] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");

  // Country & State Data
  const countryData = {
    India: [
      "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh",
      "Delhi","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand",
      "Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur",
      "Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan",
      "Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh",
      "Uttarakhand","West Bengal"
    ],
    USA: ["California", "Texas", "New York", "Florida", "Illinois"],
    UK: ["England", "Scotland", "Wales", "Northern Ireland"],
  };

  // 📅 Date Picker Handlers
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);
  const handleConfirm = (date) => {
    setDob(date.toISOString().split("T")[0]); // yyyy-mm-dd format
    hideDatePicker();
  };

  // 🔹 Signup Function
  const handleSignUp = async () => {
    if (!fullName || !email || !password || !phone) {
      alert("⚠️ Please fill all required fields");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.5:8080/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          password,
          phone,
          dob,
          country,
          state,
          address,
          city,
          pin,
          leaderName,
          pan: isChecked ? pan : null,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("✅ Account created successfully!");
        console.log("UID:", data.uid);
        router.push("./system_sigin");
      } else {
        alert("❌ " + data.error);
      }
    } catch (error) {
      console.error("API Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
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
          <Text
            style={styles.inactiveTab}
            onPress={() => router.push("./system_sigin")}
          >
            Sign in
          </Text>
          <Text style={styles.activeTab}>Sign up</Text>
        </View>

        {/* Full Name */}
        <TextInput
          style={styles.input}
          placeholder="Full Name*"
          value={fullName}
          onChangeText={setFullName}
        />

        {/* Email */}
        <TextInput
          style={styles.input}
          placeholder="Email Address*"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        {/* Password */}
        <TextInput
          style={styles.input}
          placeholder="Password*"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Mobile */}
        <View style={styles.rowInput}>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            style={styles.flexInput}
            placeholder="Enter your Phone Number*"
            keyboardType="phone-pad"
            maxLength={10}
            value={phone}
            onChangeText={setPhone}
          />
        </View>

        {/* DOB with calendar */}
        <TouchableOpacity style={styles.input} onPress={showDatePicker}>
          <Text style={{ color: dob ? "#000" : "#888" }}>
            {dob || "Date of Birth"}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        {/* Address */}
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={address}
          onChangeText={setAddress}
        />

        {/* City + PIN */}
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="City"
            value={city}
            onChangeText={setCity}
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="PIN Code"
            keyboardType="numeric"
            value={pin}
            onChangeText={setPin}
          />
        </View>

        {/* Country */}
        <View style={styles.dropdownWrapper}>
          <RNPickerSelect
            onValueChange={(value) => {
              setCountry(value);
              setState("");
            }}
            items={Object.keys(countryData).map((c) => ({
              label: c,
              value: c,
            }))}
            placeholder={{ label: "Select Country", value: "" }}
            style={pickerSelectStyles}
            value={country}
            useNativeAndroidPickerStyle={false}
          />
        </View>

        {/* State */}
        {country !== "" && (
          <View style={styles.dropdownWrapper}>
            <RNPickerSelect
              onValueChange={(value) => setState(value)}
              items={(countryData[country] || []).map((s) => ({
                label: s,
                value: s,
              }))}
              placeholder={{ label: "Select State", value: "" }}
              style={pickerSelectStyles}
              value={state}
              useNativeAndroidPickerStyle={false}
            />
          </View>
        )}

        {/* Leader Name */}
        <TextInput
          style={styles.input}
          placeholder="Leader Name"
          value={leaderName}
          onChangeText={setLeaderName}
        />

        {/* Checkbox */}
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? "#FF6600" : undefined}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.checkboxLabel}>
              I want 10 BE (Income Tax Benefit) receipts
            </Text>
            <Text style={styles.checkboxSubText}>
              Get tax-deductible receipts for all your donations under section 10BE
            </Text>
          </View>
        </View>

        {/* PAN Number (visible only when checked) */}
        {isChecked && (
          <TextInput
            style={styles.input}
            placeholder="PAN Number*"
            value={pan}
            onChangeText={setPan}
          />
        )}

        {/* Button */}
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(16),
    backgroundColor: "#fff",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: height * 0.05,
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
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: scale(20),
  },
  inactiveTab: {
    fontSize: scale(16),
    color: "#666",
    marginRight: scale(20),
  },
  activeTab: {
    fontSize: scale(16),
    color: "#FF6600",
    fontWeight: "700",
    borderBottomWidth: 2,
    borderBottomColor: "#FF6600",
    paddingBottom: 3,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: scale(10),
    paddingHorizontal: scale(12),
    marginBottom: scale(12),
    fontSize: scale(14),
    backgroundColor: "#fff",
  },
  rowInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: scale(12),
    backgroundColor: "#fff",
  },
  countryCode: {
    fontSize: scale(14),
    fontWeight: "600",
    marginRight: 8,
  },
  flexInput: {
    flex: 1,
    fontSize: scale(14),
    paddingVertical: scale(10),
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    flex: 0.48,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: scale(12),
  },
  checkboxLabel: {
    fontSize: scale(13),
    fontWeight: "600",
  },
  checkboxSubText: {
    fontSize: scale(12),
    color: "#666",
  },
  button: {
    backgroundColor: "#FF6600",
    paddingVertical: scale(14),
    borderRadius: 6,
    alignItems: "center",
    marginTop: scale(10),
  },
  buttonText: {
    color: "#fff",
    fontSize: scale(14),
    fontWeight: "700",
  },
});

// Picker Styles
const pickerSelectStyles = {
  inputIOS: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 12,
    fontSize: 14,
    color: "#000",
    backgroundColor: "#fff",
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 12,
    fontSize: 14,
    color: "#000",
    backgroundColor: "#fff",
  },
};
