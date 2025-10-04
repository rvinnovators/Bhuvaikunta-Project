import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from "react";
import {
    Alert,
    Dimensions,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import useAuthGuard from '../../hooks/useAuthGuard';
import Header from "./admin_header";
import CustomTabBar_admin from "./admin_tab";

const HelpRequestScreen = () => {
  useAuthGuard();
  const [search, setSearch] = useState("");
  const { id } = useLocalSearchParams();
  const [helpRequests, setHelpRequests] = useState([]);

  useEffect(() => {
    const fetchHelpRequests = async () => {
      try {
        const response = await fetch(
          `https://radhavallabha-backend-599500600776.asia-south1.run.app/api/help/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch help requests");
        }
        const data = await response.json();
        setHelpRequests(data);
      } catch (error) {
        console.error("Error fetching help requests:", error);
      }
    };

    fetchHelpRequests();
  }, [id]);

  // Delete help request
  const handleDelete = async (requestId) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this request?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const response = await fetch(
              `https://radhavallabha-backend-599500600776.asia-south1.run.app/api/help/${requestId}/${id}`,
              { method: "DELETE" }
            );
            if (!response.ok) {
              throw new Error("Failed to delete help request");
            }
            // Remove from state
            setHelpRequests((prev) =>
              prev.filter((req) => req.id !== requestId)
            );
            Alert.alert("Success", "Help request deleted successfully");
          } catch (error) {
            console.error("Error deleting help request:", error);
            Alert.alert("Error", "Failed to delete help request");
          }
        },
      },
    ]);
  };

  // Filter help requests based on search text
  const filteredRequests = helpRequests.filter(
    (req) =>
      req.name.toLowerCase().includes(search.toLowerCase()) ||
      req.createdAt.toLowerCase().includes(search.toLowerCase())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const sendWhatsAppMessage = (phone, message) => {
    if (!phone) {
      Alert.alert("Error", "Phone number is missing.");
      return;
    }
    let url = `whatsapp://send?phone=${phone}&text=${encodeURIComponent(
      message
    )}`;
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "Make sure WhatsApp is installed on your device");
    });
  };

  return (
    <>
      <Header />
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Name or Date"
          placeholderTextColor="#aaa"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 140 }}
      >
        {filteredRequests.length > 0 ? (
          filteredRequests.map((helpRequest, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.header}>Help Request Details</Text>

              <View style={styles.row}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.value}>{helpRequest.name}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Contact:</Text>
                <Text style={styles.value}>{helpRequest.contact}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Message:</Text>
                <Text style={styles.value}>{helpRequest.message}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>Apply Date:</Text>
                <Text style={styles.value}>
                  {formatDate(helpRequest.createdAt)}
                </Text>
              </View>

              {/* WhatsApp Button */}
              <TouchableOpacity
                style={styles.whatsappButton}
                onPress={() =>
                  sendWhatsAppMessage(
                    helpRequest.contact,
                    `Hare Krishna ${helpRequest.name}, we received your request: "${helpRequest.message}".`
                  )
                }
              >
                <Text style={styles.whatsappText}>Send WhatsApp</Text>
              </TouchableOpacity>

              {/* Delete Button */}
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDelete(helpRequest.id)}
              >
                <Text style={styles.deleteText}>Delete Request</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.noData}>No matching requests found.</Text>
        )}
      </ScrollView>
      <CustomTabBar_admin />
    </>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a2e",
  },
  searchContainer: {
    backgroundColor: "#1a1a2e",
    padding: 10,
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: "#000",
  },
  card: {
    margin: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4b0082",
    marginBottom: 16,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
    flexWrap: "wrap",
  },
  label: {
    fontSize: width < 400 ? 14 : 16,
    fontWeight: "600",
    color: "#333",
  },
  value: {
    fontSize: width < 400 ? 14 : 16,
    color: "#555",
    maxWidth: "65%",
    textAlign: "right",
  },
  noData: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#aaa",
  },
  whatsappButton: {
    backgroundColor: "#25D366",
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
    alignItems: "center",
  },
  whatsappText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center",
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default HelpRequestScreen;
