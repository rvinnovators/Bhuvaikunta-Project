// PrasadManagementScreen.js
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import useAuthGuard from '../../hooks/useAuthGuard';
import Header from './admin_header';
import CustomTabBar_admin from './admin_tab';



const { width, height } = Dimensions.get('window');


export default function PrasadManagementScreen() {
  useAuthGuard();
  
  const router = useRouter();
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
  setRefreshing(true);
  await fetchFestivals();
  setRefreshing(false);
};

  useEffect(() => {
    fetchFestivals();
  }, []);
      const fetchFestivals = async () => {
      try {
        const response = await fetch(`https://radhavallabha-backend-599500600776.asia-south1.run.app/api/prasadam/festivals`);
        const json = await response.json();
        if (json.success) {
          setFestivals(json.festivals);
        } else {
          console.error('Failed to load festivals:', json.festivals);
        }
      } catch (error) {
        console.error('Error fetching festivals:', error);
      } finally {
        setLoading(false);
      }
    };


const handleDelete = async (festivalId) => {
  try {
    setLoading(true);

    const response = await fetch(`https://radhavallabha-backend-599500600776.asia-south1.run.app/api/prasadam/festivals/soft-delete/${festivalId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const json = await response.json();

    if (response.ok && json.success) {
      setFestivals(json.festivals); // Update state/UI with updated list
    } else {
      console.error('Soft delete failed:', json.message || json);
      alert('Could not deactivate the festival.');
    }
  } catch (error) {
    console.error('Error soft deleting festival:', error);
    alert('An error occurred while deactivating the festival.');
  } finally {
    setLoading(false);
  }
};

  const getStatusStyle = (festivalDate) => {
  const today = new Date();
  const festival = new Date(festivalDate);

  // Remove time for comparison
  today.setHours(0, 0, 0, 0);
  festival.setHours(0, 0, 0, 0);

  if (festival.getTime() === today.getTime()) {
    return styles.active;
  } else if (festival < today) {
    return styles.completed;
  } else {
    return styles.upcoming;
  }
};

  const getStatusText = (festivalDate) => {
  const today = new Date();
  const festival = new Date(festivalDate);

  today.setHours(0, 0, 0, 0);
  festival.setHours(0, 0, 0, 0);

  if (festival.getTime() === today.getTime()) {
    return 'Active';
  } else if (festival < today) {
    return 'Completed';
  } else {
    return 'Upcoming';
  }
};

  return (
    <>
      <Header />
      <View style={styles.container}>
        {/* Header Row */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={RFValue(22)} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Prasad Management</Text>
        </View>

        {/* Events List */}
        <ScrollView contentContainerStyle={styles.scrollContent}    refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={['#7e57c2']} // Android spinner color
                  tintColor="#7e57c2" // iOS spinner color
                />
              }>
  {loading ? (
    <Text style={{ color: '#fff', textAlign: 'center' }}>Loading...</Text>
  ) : festivals.length === 0 ? (
    <Text style={{ color: '#ccc', textAlign: 'center' }}>No festivals found.</Text>
  ) : (
    festivals.map((item, index) => (
     <View key={item.id} style={styles.card}>
     <TouchableOpacity
    style={styles.cardTextContainer}
    onPress={() =>
      router.push({ pathname: './live_event', params: { festivalId: item.id } })
    }
    activeOpacity={0.8}
  >
    <Text style={styles.title}>{item.festivalName}</Text>
    <Text style={styles.date}>
      {new Date(item.festivalDate).toDateString()}
    </Text>
  </TouchableOpacity>

  <View style={styles.statusAndActions}>
    <View style={[styles.badge, getStatusStyle(item.festivalDate)]}>
      <Text style={styles.badgeText}>{getStatusText(item.festivalDate)}</Text>
    </View>

    <TouchableOpacity
      style={styles.iconButton}
      onPress={() => handleDelete(item.id)}
    >
      <FontAwesome name="trash" size={20} color="#F44336" />
    </TouchableOpacity>
  </View>
</View>
    ))
  )}
</ScrollView>


        {/* Add Button */}
        <TouchableOpacity style={styles.addButton} onPress={() => router.push('./prasadam_festival')}>
          <Ionicons name="add" size={RFValue(28)} color="#fff" />
        </TouchableOpacity>
      </View>
      <CustomTabBar_admin />
    </>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0e12',
    paddingHorizontal: width * 0.04,
    paddingTop: Platform.OS === 'android' ? height * 0.03 : height * 0.05,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.025,
  },
  headerText: {
    fontSize: RFValue(18),
    color: '#fff',
    fontWeight: '700',
    marginLeft: 12,
  },
  scrollContent: {
    paddingBottom: height * 0.1,
  },
 card: {
  backgroundColor: '#1a1a28',
  borderRadius: 16,
  padding: width * 0.045,
  marginBottom: height * 0.02,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.2,
  shadowRadius: 6,
  elevation: 4,
},
 cardTextContainer: {
  marginBottom: 10,
},
  title: {
    color: '#ffffff',
    fontSize: RFValue(14),
    fontWeight: '600',
    marginBottom: 4,
  },
  date: {
    color: '#a0a0a0',
    fontSize: RFValue(10),
  },
  badge: {
    borderRadius: 20,
    paddingVertical: 1,
    paddingHorizontal: 10,
  },
  badgeText: {
    color: '#fff',
    fontSize: RFValue(7.5),
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom:  RFValue(120),
    backgroundColor: '#6c5ce7',
    width: RFValue(50),
    height: RFValue(50),
    borderRadius: RFValue(25),
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  badge: {
  paddingVertical: 4,
  paddingHorizontal: 6,
  borderRadius: 12,
  alignSelf: 'flex-start',
  marginTop: 5,
},

badgeText: {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 12,
},

active: {
  backgroundColor: '#4CAF50', // Green
},

completed: {
  backgroundColor: '#F44336', // Red
},

upcoming: {
  backgroundColor: '#2196F3', // Blue
},
iconRow: {
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop:-height * 0.24,
},
iconButton: {
  marginHorizontal: 1,
  padding: 6,
},
statusAndActions: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},



});
