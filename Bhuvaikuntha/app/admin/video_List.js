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
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
import useAuthGuard from '../../hooks/useAuthGuard';
import Header from './admin_header';
import CustomTabBar_admin from './admin_tab';
const API_KEY = 'AIzaSyB_nXf7jV44rQc0d9hweAhQpir1KbZWBp8';

const { width,height } = Dimensions.get('window');



export default function LatestVideoScreen() {
  useAuthGuard()
 
  const [videoIds, setvideoIds] = useState([]);
  const [loading,setLoading] =useState(true);
  const [videos, setVideos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
  setRefreshing(true);
  await fetchYoutubeUrls();
  setRefreshing(false);
};


    useEffect(() => {
      fetchYoutubeUrls();
    }, []);

        const fetchYoutubeUrls = async () => {
        try {
          const response = await fetch('https://radhavallabha-backend-599500600776.asia-south1.run.app/api/get-videoID');
          const data = await response.json();
          if (Array.isArray(data.videoID)) {
            setvideoIds(data.videoID);
            setLoading(false);
          } else {
            setLoading(true);
            Alert.alert('Error', 'Invalid data format from server.');
          }
        } catch (error) {
          setLoading(true);
          console.error('Error fetching VideoID:', error);
          Alert.alert('Error', 'Failed to load videoIDs.');
        }
      };

  
useEffect(() => {
  if (!Array.isArray(videoIds) || videoIds.length === 0) return;

  const idsParam = videoIds.join(',');
  fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${idsParam}&key=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
         const mappedVideos = data.items.map(item => ({
      id: item.id,
      title: item.snippet.title,
      speaker: item.snippet.channelTitle,
      date: new Date(item.snippet.publishedAt).toLocaleDateString(),
      thumbnail: { uri: item.snippet.thumbnails.medium.url }
    }));
    setVideos(mappedVideos);
    })
    .catch(err => console.error("YouTube API fetch error:", err));
}, [videoIds]);

const handleDelete = async (id) => {
  
  try {
    const response = await fetch(`https://radhavallabha-backend-599500600776.asia-south1.run.app/api/delete/videoid/${id}`, {
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
      <Header />

  
        <Text style={styles.pageTitle}>UPLOADED VIDEO LIST</Text>

        {videoIds && videoIds.length > 0 ? (
         <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 130 }}
        showsVerticalScrollIndicator={false}
           refreshControl={
                        <RefreshControl
                          refreshing={refreshing}
                          onRefresh={onRefresh}
                          colors={['#7e57c2']} // Android spinner color
                          tintColor="#7e57c2" // iOS spinner color
                        />
                      }> 
      
        {/* Video List */}

{Array.isArray(videos) && videos.map((video, index) => (
  <TouchableOpacity
    key={index}
    style={styles.videoCard}
    onPress={() => setSelectedVideo(video)}
  >
    <Image source={video.thumbnail} style={styles.videoThumbnail} />
    <View style={{ flex: 1 }}>
      <Text style={styles.videoTitle}>{video.title}</Text>
      <Text style={styles.videoSpeaker}>{video.speaker}</Text>
      <Text style={styles.videoDate}>{video.date}</Text>
            <View style={styles.iconRow}>
                          <TouchableOpacity onPress={() => handleDelete(video.id)}>
                            <Icon name="trash-outline" size={23} color="#ccc" />
                          </TouchableOpacity>
                        </View>
    </View>
  </TouchableOpacity>
))}
            
      </ScrollView>
        ):(<View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No data found</Text>
          </View>)}

   <CustomTabBar_admin />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F0F0F' },
  pageTitle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    color: '#1e1e1e',
    backgroundColor: '#efb6d4',
    letterSpacing: 1.5,
    paddingVertical: 10,
  },
  banner: {
    marginHorizontal: 16,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  channelText: {
    paddingHorizontal: 16,
    marginTop: 15,
  },
  channelLabel: {
    color: '#A08AFF',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  channelTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 4,
  },
  subtext: {
    color: '#aaa',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 2,
  },
  videoCard: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 10,
    borderRadius: 10,
    gap: 10,
  },
  videoThumbnail: {
    width: 100,
    height: 60,
    borderRadius: 8,
  },
  videoTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
  },
  videoSpeaker: {
    color: '#A08AFF',
    fontSize: 12,
    marginVertical: 2,
  },
  videoDate: {
    color: '#bbb',
    fontSize: 11,
  },

    leftHalfLotus: {
    position: 'absolute',
    top: 350,
    left: -60,
    width: 130,
    height: 150,
    resizeMode: 'contain',
    opacity: 0.5,
  },
  rightHalfLotus: {
    position: 'absolute',
    top: 350,
    right: -60,
    width: 130,
    height: 150,
    resizeMode: 'contain',
    transform: [{ scaleX: -1 }],
    opacity: 0.5,
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
