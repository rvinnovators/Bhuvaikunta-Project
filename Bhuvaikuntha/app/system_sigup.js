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

  const [isChecked, setIsChecked] = useState(false);
  const [dob, setDob] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [country, setCountry] = useState("");
  const [state, setState] = useState("");

  // Country & State Data
  const countryData = {
    India: [
      "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
      "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
      "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
      "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan",
      "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
      "Uttarakhand", "West Bengal"
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
        <TextInput style={styles.input} placeholder="Full Name*" />

        {/* Email */}
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          keyboardType="email-address"
        />

        {/* Mobile */}
        <View style={styles.rowInput}>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            style={styles.flexInput}
            placeholder="Enter your Phone Number*"
            keyboardType="phone-pad"
            maxLength={10}
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
        <TextInput style={styles.input} placeholder="Address" />

        {/* City + PIN */}
        <View style={styles.row}>
          <TextInput style={[styles.input, styles.halfInput]} placeholder="City" />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="PIN Code"
            keyboardType="numeric"
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
        <TextInput style={styles.input} placeholder="Leader Name" />

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
          <TextInput style={styles.input} placeholder="PAN Number*" />
        )}

        {/* Button */}
        <TouchableOpacity style={styles.button}>
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
