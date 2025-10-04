import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
import useAuthGuard from '../../hooks/useAuthGuard';
import Header from './admin_header';
import CustomTabBar_admin from './admin_tab';
const { width } = Dimensions.get('window'); // screen width





const ContentFeedScreen = ({ onBack }) => {
  useAuthGuard();
   const router = useRouter();
  const [posts, setPosts] = useState([]);
   const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
  setRefreshing(true);
  await fetchQuote();
  setRefreshing(false);
};

  
  
       useEffect(() => {
           fetchQuote();
       }, []);
    const fetchQuote = async () => {
    try {
      const response = await fetch("https://radhavallabha-backend-599500600776.asia-south1.run.app/api/get/Quote");
  
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
  
      const data = await response.json(); // parse directly if server returns JSON
      setPosts(data);
    } catch (error) {
      console.error("Error fetching quote images:", error.message);
    }
  };

  
  
  
  const handleDelete = async (id) => {
    
    
    try {
      const response = await fetch(`https://radhavallabha-backend-599500600776.asia-south1.run.app/api/delete/quote/${id}`, {
        method: 'DELETE',
      });
  
      const result = await response.json();
      if (response.ok) {
        alert(result.message || 'Item deleted');
        fetchQuote();
      } else {
        alert(result.message || 'Failed to delete');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('Error deleting item: ' + error.message);
    }
  };


  const renderPost = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.place}>{item.place}</Text>
        <Text style={styles.timestamp}>{item.date?._seconds
                ? new Date(item.date._seconds * 1000).toLocaleDateString()
                : '-'}{' '}</Text>
      </View>
      <Text style={styles.content}>{item.quote}</Text>
     {item.imageUrl && (
  <Image
    source={{ uri: item.imageUrl }}
    style={styles.postImage}
    resizeMode="cover"
  />
)}
   <View style={styles.iconRow}>
                  <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Icon name="trash-outline" size={20} color="#ccc" />
                  </TouchableOpacity>
                </View>
      <View style={styles.cardFooter}>
       
       
      </View>
    </View>
  );

  return (
    <>
      <Header />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
         
          <Text style={styles.headerTitle}>Spiritual Engagements</Text>
        </View>

        {posts.length > 0 ? (     
      <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.feed}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#7e57c2']} // Android
              tintColor="#7e57c2" // iOS
            />
          }
        />
        )
      :(
      <Text style={{ color: '#fff', textAlign: 'center', marginVertical: 20 }}>
      No Quotes found
    </Text>
      )}
   
        {/* Floating Action Button */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => router.push('./upload_quotes')}
        >
          <Icon name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </SafeAreaView>
      <CustomTabBar_admin />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b1b1b',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 20 : 12,
    backgroundColor: '#1b1b1b',
    borderBottomWidth: 1,
    borderBottomColor: '#2e2e2e',
    justifyContent:'center'
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    
  },
  feed: {
    padding: 16,
    paddingBottom: 120, // ensures FAB doesn't overlap list
  },
  card: {
    backgroundColor: '#2e2e2e',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  place: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  timestamp: {
    color: '#aaa',
    fontSize: 12,
  },
  content: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  postImage: {
    width: '100%',
    height: width * 0.5, // responsive height
    borderRadius: 10,
    marginBottom: 10,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeCount: {
    color: '#aaa',
    marginLeft: 8,
  },
fab: {
  position: 'absolute',
  left: 20, // ⬅️ moved to left
  bottom: 130,
  backgroundColor: '#e91e63',
  width: 60,
  height: 60,
  borderRadius: 30,
  alignItems: 'center',
  justifyContent: 'center',
  elevation: 5,
  zIndex: 10,
},

    iconRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: RFValue(16),
    marginTop: RFValue(10),
  },
});

export default ContentFeedScreen;
