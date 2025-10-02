import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";

const { width } = Dimensions.get("window");
const scale = (size) => (width / 375) * size; // Responsive scaling

export default function EditProfileScreen() {
  const [dob, setDob] = useState(new Date(2000, 4, 23));
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("Madhya Pradesh");
  const [profileImage, setProfileImage] = useState(null);

  const countries = {
    India: ["Madhya Pradesh", "Maharashtra", "Delhi", "Gujarat", "Tamil Nadu"],
    USA: ["California", "Texas", "New York", "Florida"],
    UK: ["London", "Manchester", "Liverpool"],
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={scale(22)} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={{ width: scale(22) }} />
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        {/* Profile Image */}
        <View style={styles.profileContainer}>
          <Image
            source={
              profileImage
                ? { uri: profileImage }
                : require("../assets/images/icon.png")
            }
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
            <Ionicons name="camera" size={scale(18)} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
        <Input label="Full Name" value="Jagannath Gangul" />
        <Input label="Email Address" value="jagannath@example.com" />
        <Input label="Mobile Number" value="+91 8988930338" />

        {/* Date of Birth */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Date of Birth</Text>
          <TouchableOpacity
            style={styles.inputWrapper}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.input}>
              {dob.toLocaleDateString("en-GB")}
            </Text>
            <Ionicons name="calendar" size={scale(18)} color="#FF6600" />
          </TouchableOpacity>
        </View>
        {showDatePicker && (
          <DateTimePicker
            value={dob}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setDob(selectedDate);
            }}
          />
        )}

        <Input label="Address" value="ABC" />
        <View style={styles.row}>
          <Input label="City" value="ABC" style={{ flex: 1, marginRight: 8 }} />
          <Input label="PIN Code" value="123456" style={{ flex: 1, marginLeft: 8 }} />
        </View>

        {/* Country Dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Country</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={country}
              onValueChange={(itemValue) => {
                setCountry(itemValue);
                setState(countries[itemValue][0]); // reset state
              }}
              style={styles.picker}
            >
              {Object.keys(countries).map((c) => (
                <Picker.Item label={c} value={c} key={c} />
              ))}
            </Picker>
          </View>
        </View>

        {/* State Dropdown */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>State</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={state}
              onValueChange={(itemValue) => setState(itemValue)}
              style={styles.picker}
            >
              {countries[country].map((s) => (
                <Picker.Item label={s} value={s} key={s} />
              ))}
            </Picker>
          </View>
        </View>

        <Input label="Leader Name" value="ABC" />
        <Input label="PAN Number" value="ABC" />

        {/* Save Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const Input = ({ label, value, icon, dropdown, style }) => (
  <View style={[styles.inputContainer, style]}>
    <Text style={styles.inputLabel}>{label}</Text>
    <View style={styles.inputWrapper}>
      <TextInput
        value={value}
        style={styles.input}
        placeholder={label}
        placeholderTextColor="#888"
      />
      {icon && <Ionicons name={icon} size={scale(18)} color="#FF6600" />}
      {dropdown && (
        <Ionicons name="chevron-down" size={scale(18)} color="#FF6600" />
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    height: scale(56),
    backgroundColor: "#FF6600",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(16),
  },
  headerTitle: {
    fontSize: scale(18),
    fontWeight: "600",
    color: "#fff",
  },
  container: {
    padding: scale(16),
    paddingBottom: scale(40),
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: scale(20),
  },
  profileImage: {
    width: scale(90),
    height: scale(90),
    borderRadius: scale(45),
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: width / 2 - scale(60),
    backgroundColor: "#FF6600",
    borderRadius: scale(20),
    padding: scale(6),
  },
  inputContainer: {
    marginBottom: scale(12),
  },
  inputLabel: {
    fontSize: scale(13),
    color: "#333",
    marginBottom: scale(4),
    fontWeight: "500",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: scale(8),
    paddingHorizontal: scale(12),
    backgroundColor: "#fafafa",
  },
  input: {
    flex: 1,
    fontSize: scale(14),
    paddingVertical: Platform.OS === "ios" ? scale(10) : scale(8),
    color: "#000",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: scale(8),
    backgroundColor: "#fafafa",
  },
  picker: {
    width: "100%",
    height: scale(44),
  },
  button: {
    marginTop: scale(24),
    backgroundColor: "#FF6600",
    paddingVertical: scale(14),
    borderRadius: scale(30),
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: scale(16),
    fontWeight: "bold",
  },
});
