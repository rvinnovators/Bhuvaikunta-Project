import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  Dimensions, ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import useAuthGuard from '../../hooks/useAuthGuard';
import Header from './admin_header';
import CustomTabBar_admin from './admin_tab';
const windowWidth = Dimensions.get('window').width;

const ManagementCard = ({ icon, title, subtitle, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.iconContainer}>{icon}</View>
    <View style={styles.textContainer}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardSubtitle}>{subtitle}</Text>
    </View>
  </TouchableOpacity>
);

export default function AdminPanelScreen() {
    useAuthGuard()
    const router = useRouter();
  return (
    <>
    <Header/>
    <View style={styles.container}>
      <Text style={styles.header}>Admin Panel</Text>
      <ScrollView contentContainerStyle={styles.scroll}>
        <ManagementCard
          icon={<MaterialIcons name="redeem" size={28} color="#fff" />}
          title="Prasad Coupon Management"
          subtitle="Create and manage Prasad coupons"
          onPress={() => router.push('/admin/prasadam_management')}
        />
        <ManagementCard
          icon={<MaterialIcons name="format-quote" size={28} color="#fff" />}
          title="Quote & Content Posting"
          subtitle="Post quotes, images, and videos"
          onPress={() => router.push('/admin/upload_quotes')}
        />
        <ManagementCard
          icon={<MaterialIcons name="computer" size={28} color="#fff" />}
          title="E-Learning Management"
          subtitle="Upload e-learning video links"
          onPress={() => router.push('/admin/e-learning')}
        />
        <ManagementCard
          icon={<FontAwesome name="image" size={28} color="#fff" />}
          title="Gallery Management"
          subtitle="Upload daily darshan images"
          onPress={() =>  router.push('/admin/gallery_management')}
        />
        <ManagementCard
        icon={<FontAwesome name="video-camera" size={28} color="#fff" />}
        title="Latest Video"
        subtitle="Upload Latest Video from YOUTUBE"
        onPress={() =>  router.push('/admin/add_video')}
        />
          <ManagementCard
        icon={<FontAwesome name="bell" size={28} color="#fff" />}
        title="Festivals and Donation"
        subtitle="Upcoming festival"
        onPress={() =>  router.push('/admin/festival_upload')}
        />
  
        <ManagementCard
        icon={<FontAwesome name="tasks" size={28} color="#fff" />}
        title="Our Activity"
        subtitle="Mention Our Activities"
         onPress={() => router.push('/admin/our_activities')}
        />

            <ManagementCard
         icon={<FontAwesome name="image" size={28} color="#fff" />}
        title="Festivals Images"
        subtitle="Add festival Images"
         onPress={() => router.push('/admin/festivalImages')}
        />
      </ScrollView>

      {/* Bottom Navigation Bar */}
     <CustomTabBar_admin/>
    </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000', // dark theme
    paddingTop: 20,
  },
  header: {
    textAlign: 'center',
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scroll: {
    paddingHorizontal: 16,
    paddingBottom: 130,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#a47cf3',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 16,
    backgroundColor: '#a47cf3',
    padding: 12,
    borderRadius: 8,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#ccc',
    marginTop: 4,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#4b0082',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  centerIcon: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 30,
    color: '#4b0082',
  },
});
