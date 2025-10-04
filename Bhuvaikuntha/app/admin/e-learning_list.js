import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import useAuthGuard from '../../hooks/useAuthGuard';
import Header from './admin_header';
import CustomTabBar_admin from './admin_tab';
const API_KEY = 'AIzaSyB_nXf7jV44rQc0d9hweAhQpir1KbZWBp8';

const { width,height } = Dimensions.get('window');



export default function ELeaningScreen() {
  useAuthGuard()
   const router = useRouter();
 const [playlists, setPlaylists] = useState([]);
 const [playlistIds, setPlaylistIds] = useState([]);
   const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
  setRefreshing(true);
  await fetchPlaylists();
  setRefreshing(false);
};

useEffect(() => {
   fetchYoutubeUrls();
 }, []);

    const fetchYoutubeUrls = async () => {
     try {
       const response = await fetch('https://radhavallabha-backend-599500600776.asia-south1.run.app/api/get-urls');
       const data = await response.json();
       if (Array.isArray(data.playlistIds)) {
         setPlaylistIds(data.playlistIds);
         setLoading(false);
       } else {
         setLoading(true);
         Alert.alert('Error', 'Invalid data format from server.');
       }
     } catch (error) {
       setLoading(true);
       console.error('Error fetching YouTube URLs:', error);
       Alert.alert('Error', 'Failed to load playlist IDs.');
     }
   };
 useEffect(() => {
     fetchPlaylists();
   }, [playlistIds]);

   const fetchPlaylists = async () => {
    if (playlistIds.length === 0) return;
       try {
         const responses = await Promise.all(
           playlistIds.map(id =>
             fetch(`https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=${id}&key=${API_KEY}`)
               .then(res => res.json())
           )
         );
 
         const allPlaylists = responses
           .map(res => res.items?.[0]) // optional chaining
           .filter(Boolean);
 
         setPlaylists(allPlaylists);
       } catch (error) {
         console.error('Error fetching playlists:', error);
       }
     };
 
 
 
 const handleDelete = async (id) => {
   
  
  try {
    const response = await fetch(`https://radhavallabha-backend-599500600776.asia-south1.run.app/api/delete/playlist/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Item deleted');
      fetchYoutubeUrls(); 
    } else {
      alert('Failed to delete');
    }
  } catch (error) {
    console.error('Delete error:', error);
    alert('Error deleting item');
  }
};

  return (
    <View style={styles.container}>
      {/* Header */}
    <Header/>

      {/* Title */}

       <View style={styles.header}>
                <Text style={styles.headerText}>PLAYLIST URL LIST</Text>
        </View>
    

      {/* Courses */}
      <ScrollView contentContainerStyle={styles.scrollContent}  
       refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={['#7e57c2']} // Android spinner color
                  tintColor="#7e57c2" // iOS spinner color
                />
              }> 
  {playlistIds.length >0 ? (  
    playlists.map((playlist, index) => (
      <TouchableOpacity
        key={index}
        style={styles.card}
        activeOpacity={0.8}
      >
        <Image
          source={{ uri: playlist.snippet.thumbnails.medium.url }}
          style={styles.courseImage}
        />
        <Text style={styles.courseTitle}>{playlist.snippet.title}</Text>
                    <View style={styles.iconRow}>
                                  <TouchableOpacity onPress={() => handleDelete(playlist.id)}>
                                    <Icon name="trash-outline" size={23} color="#ccc" />
                                  </TouchableOpacity>
                                </View>
      </TouchableOpacity>
      
    ))
  ) : ( 

     <Text style={{ color: '#fff', textAlign: 'center', marginVertical: 20 }}>
      No festival found
    </Text>

  
  )}
</ScrollView>

    <CustomTabBar_admin/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010',
  },
  header: {
    backgroundColor: '#1c1c1c',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingTop: 40,
    paddingBottom: 12,
  },
  logo: {
    width: width * 0.18,
    height: width * 0.1,
    resizeMode: 'contain',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginHorizontal: 8,
  },
  prasadamButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  prasadamIcon: {
    width: 20,
    height: 24,
    marginRight: 4,
  },
  prasadamText: {
    color: '#000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  titleContainer: {
    padding: 14,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#eeb6d4',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#fff',
    fontSize: 14,
    marginTop: 6,
    textAlign: 'center',
  },
  divider: {
    height: 2,
    width: '60%',
    backgroundColor: '#aaa',
    marginTop: 10,
    borderRadius: 2,
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingBottom: 132,
  },
  card: {
    backgroundColor: '#1b1b1b',
    borderWidth: 1,
    borderColor: '#805ad5',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 8,
    justifyContent: 'space-between',
  },
  courseImage: {
    width: 190,
    height: 100,
    resizeMode: 'cover',
    marginRight: 10,
  },
  courseTitle: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 14,
  },
  progressCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#00acc1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomTab: {
    position: 'absolute',
    bottom: 0,
    height: 70,
    backgroundColor: '#6a4dad',
    width: '100%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  homeButton: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 40,
    marginTop: -20,
  },
    header: { backgroundColor: '#efb6d4', padding: 14, alignItems: 'center' },
  headerText: { fontSize: 16, fontWeight: 'bold', color: '#1e1e1e' },
   loadingContainer: {
  flex: 1,
  backgroundColor: 'transparent', 
  justifyContent: 'center',
  alignItems: 'center',
},

  spinner: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
});
