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

export default function ListScreen() {
    useAuthGuard()
    const router = useRouter();
  return (
    <>
    <Header/>
    <View style={styles.container}>
      <Text style={styles.header}>LISTS</Text>
      <ScrollView contentContainerStyle={styles.scroll}>
        <ManagementCard
          icon={<MaterialIcons name="redeem" size={28} color="#fff" />}
          title="Prasad Coupon Management"
          
          onPress={() => router.push('./prasadam_management')}
        />
        <ManagementCard
          icon={<MaterialIcons name="format-quote" size={28} color="#fff" />}
          title="Quote & Content Posting"
          onPress={() => router.push('./quotes_list')}
        />
        <ManagementCard
          icon={<MaterialIcons name="computer" size={28} color="#fff" />}
          title="E-Learning Management"
          onPress={() => router.push('./e-learning_list')}
        />
        <ManagementCard
          icon={<FontAwesome name="image" size={28} color="#fff" />}
          title="Gallery Management"
          onPress={() =>  router.push('./gallery_list')}
        />
        <ManagementCard
        icon={<FontAwesome name="video-camera" size={28} color="#fff" />}
        title="Latest Video"
        onPress={() =>  router.push('./video_List')}
        />
          <ManagementCard
        icon={<FontAwesome name="bell" size={28} color="#fff" />}
        title="Festivals and Donation"
        onPress={() =>  router.push('./festivals_list')}
        />
          <ManagementCard

        icon={<FontAwesome name="tasks" size={28} color="#fff" />}
        title="Our Activity"
         onPress={() => router.push('./activities_list')}
        />
        <ManagementCard

        icon={<FontAwesome name="image" size={28} color="#fff" />}
        title="Festival Image Management"
         onPress={() => router.push('./festivalImage_list')}
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
