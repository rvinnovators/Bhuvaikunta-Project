
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import useAuthGuard from '../../hooks/useAuthGuard';
import Header from './admin_header';
import CustomTabBar_admin from './admin_tab';

const { width, height } = Dimensions.get('window');


const statusColors = {
  VALID: 'green',
  USED: 'gray',
  INVALID: 'red',
};



const LiveEventDashboard = () => {
  useAuthGuard();
  const router = useRouter();
  const { festivalId } = useLocalSearchParams();
  const [coupons, setCoupons] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
   const [loading, setLoading] = useState(false);
   const totalGenerated = coupons.length;
   const usedCount = coupons.filter(coupon => coupon.status === 'USED' ).length;
   const inValidatedCount = coupons.filter(coupon => coupon.status === 'INVALID' ).length;
   const activeCount = coupons.filter(coupon => coupon.isActive ).length;
   const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
  setRefreshing(true);
  await fetchCoupons();
  setRefreshing(false);
};


  useEffect(() => {
    fetchCoupons();
  }, [festivalId]);

     const fetchCoupons = async () => {
       if (!festivalId) return;
      try {
        setLoading(true);
        const response = await axios.get(
          `https://radhavallabha-backend-599500600776.asia-south1.run.app/api/coupons/byFestival/${festivalId}`
        );
        setCoupons(response.data);
        
      } catch (error) {
        console.error('Failed to fetch coupons:', error.message);
        Alert.alert('Error', 'Could not load coupons');
      } finally {
        setLoading(false);
      }
    };


  const handleToggleStatus = async (coupon) => {
  const newStatus =
    coupon.status === 'VALID'
      ? 'USED'
      : coupon.status === 'USED'
      ? 'INVALID'
      : 'VALID';

  try {
    await axios.patch(
      `https://radhavallabha-backend-599500600776.asia-south1.run.app/api/coupon/${coupon.id}/status`,
      { status: newStatus }
    );

    // Update frontend state after successful backend update
    const updatedCoupons = coupons.map((c) =>
      c.id === coupon.id
        ? {
            ...c,
            status: newStatus,
            isActive: newStatus === 'VALID',
          }
        : c
    );
    setCoupons(updatedCoupons);
    
  } catch (error) {
    console.error('Failed to update status:', error.message);
    Alert.alert('Error', 'Could not update coupon status.');
  }
};

  const filteredCoupons = coupons.filter(
    (coupon) =>
      coupon?.personName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coupon?.id.includes(searchQuery)
  );

  const renderCoupon = ({ item }) => (
    <View style={styles.couponItem}>
      <Text style={styles.couponName}>{item.personName}</Text>
      <TouchableOpacity onPress={() => handleToggleStatus(item)}>
        <Text style={[styles.couponStatus, { color: statusColors[item.status] }]}>
          {item.status}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <Header />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Icon name="arrow-left" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Live Event Dashboard</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{totalGenerated}</Text>
            <Text style={styles.statLabel}>Total Generated</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{usedCount}</Text>
            <Text style={styles.statLabel}>Coupons Scanned</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{inValidatedCount}</Text>
            <Text style={styles.statLabel}>Coupons Invalidated</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{activeCount}</Text>
            <Text style={styles.statLabel}>Active</Text>
          </View>
        </View>

        <TextInput
          style={styles.searchBar}
          placeholder="Search by name or coupon ID..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#aaa"
        />
         {loading ? (
          <Text style={{ color: '#aaa', textAlign: 'center' }}>Loading...</Text>
        ) : (
        <FlatList
          data={filteredCoupons}
          renderItem={renderCoupon}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
                  refreshControl={
                                  <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                    colors={['#7e57c2']} // Android spinner color
                                    tintColor="#7e57c2" // iOS spinner color
                                  />
                                }
        />
        )}
      </SafeAreaView>
      <CustomTabBar_admin />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0e12',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical:height * 0.01,
    paddingHorizontal: width * 0.04,
    backgroundColor: '#0e0e12',
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    color: '#fff',
    fontSize: width * 0.05,
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.04,
    marginTop: height * 0.01,
  },
  statCard: {
    backgroundColor: '#1a1a28',
    borderRadius: 10,
    padding: width * 0.05,
    width: '48%',
    marginBottom: height * 0.02,
    alignItems: 'center',
    elevation: 3,
  },
  statValue: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: width * 0.035,
    color: '#aaa',
    textAlign: 'center',
  },
  searchBar: {
    backgroundColor: '#1a1a28',
    borderRadius: 8,
    padding: width * 0.035,
    fontSize: width * 0.04,
    marginHorizontal: width * 0.04,
    marginTop: height * 0.01,
    marginBottom: height * 0.02,
    color: 'white',
  },
  listContent: {
    paddingBottom: height * 0.15,
  },
  couponItem: {
    backgroundColor: '#1a1a28',
    borderRadius: 10,
    padding: width * 0.04,
    marginBottom: height * 0.015,
    marginHorizontal: width * 0.04,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  couponName: {
    fontSize: width * 0.04,
    color: '#fff',
    fontWeight: '500',
  },
  couponStatus: {
    fontSize: width * 0.035,
    fontWeight: 'bold',
  },
});

export default LiveEventDashboard;
