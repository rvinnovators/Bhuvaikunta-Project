import { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { useRouter } from 'expo-router';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
import useAuthGuard from '../../hooks/useAuthGuard';
import Header from './admin_header';
import CustomTabBar_admin from './admin_tab';
const { width } = Dimensions.get('window');

export default function festivalListScreen() {
    useAuthGuard()
    const router = useRouter();
    const [images,setImages] =useState([]);
      const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
  setRefreshing(true);
  await fetchFestival();
  setRefreshing(false);
};



     useEffect(() => {
         fetchFestival();
     }, []);
  const fetchFestival = async () => {
  try {
    const response = await fetch("https://radhavallabha-backend-599500600776.asia-south1.run.app/api/get/festivals");

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const data = await response.json(); // parse directly if server returns JSON
    setImages(data);
  } catch (error) {
    console.error("Error fetching Festivals :", error.message);
  }
};




const handleDelete = async (id) => {
  try {
    const response = await fetch(`https://radhavallabha-backend-599500600776.asia-south1.run.app/api/delete/festival/${id}`, {
      method: 'DELETE',
    });

    const result = await response.json();
    if (response.ok) {
      alert(result.message || 'Item deleted');
      fetchFestival();
    } else {
      alert(result.message || 'Failed to delete');
    }
  } catch (error) {
    console.error('Delete error:', error);
    alert('Error deleting item: ' + error.message);
  }
};



     
  return (
    <>

    <Header/>
   
    <View style={styles.container}>
      <Text style={styles.title}>Festivals Management</Text>

{images && images.length > 0 ? (
  <ScrollView contentContainerStyle={styles.scrollContainer}
    refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                          colors={['#7e57c2']} // Android spinner color
                          tintColor="#7e57c2" // iOS spinner color
                        />
                      }> 
    {images.map((item) => (
      <View key={item.id} style={styles.card}>
        
        <View style={styles.imageRow}>
          {item?.imageUrl && (
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
          )}
          <View style={styles.details}>
            <Text
              style={styles.label}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              Name: <Text style={styles.bold}>{item.name}</Text>
            </Text>
            <Text style={styles.label}>
              {item.date?._seconds
                ? new Date(item.date._seconds * 1000).toLocaleDateString()
                : '-'}{' '}
            </Text>
          </View>
        </View>

        <View style={styles.iconRow}>
          <TouchableOpacity onPress={() => handleDelete(item.id)}>
            <Icon name="trash-outline" size={20} color="#ccc" />
          </TouchableOpacity>
        </View>
      </View>
    ))}
  </ScrollView>
) : (
  <View style={styles.noDataContainer}>
    <Text style={styles.noDataText}>No data found</Text>
  </View>
)}

      <CustomTabBar_admin/>
    </View>
     </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f20',
    paddingHorizontal: RFValue(16),
    paddingTop: RFValue(40),
  },
  title: {
    fontSize: RFValue(22),
    fontWeight: 'bold',
    color: 'white',
    marginBottom: RFValue(12),
  },
  uploadButton: {
    backgroundColor: 'linear-gradient(to right, #9f4eff, #e679f7)', // Only web works
    backgroundColor: '#c94bf6',
    paddingVertical: RFValue(12),
    borderRadius: RFValue(14),
    alignItems: 'center',
    marginBottom: RFValue(20),
  },
  uploadText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: RFValue(16),
  },
  scrollContainer: {
    paddingBottom: RFValue(100),
  },
  card: {
    backgroundColor: '#1c1c2b',
    borderRadius: RFValue(12),
    padding: RFValue(12),
    marginBottom: RFValue(16),
  },
  date: {
    color: '#aaa',
    fontSize: RFValue(12),
    marginBottom: RFValue(6),
  },
  imageRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  image: {
    width: RFValue(60),
    height: RFValue(60),
    borderRadius: RFValue(6),
    marginRight: RFValue(10),
  },
  details: {
    flex: 1,
  },
  label: {
    color: '#ccc',
    fontSize: RFValue(13),
    marginBottom: RFValue(4),
  },
  bold: {
    fontWeight: 'bold',
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: RFValue(16),
    marginTop: RFValue(10),
  },
  noDataContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
},
noDataText: {
  fontSize: 16,
  color: '#888',
  fontWeight: '500',
},

});
