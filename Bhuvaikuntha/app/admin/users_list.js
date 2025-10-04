import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import useAuthGuard from '../../hooks/useAuthGuard';
import Header from './admin_header';
import CustomTabBar_admin from './admin_tab';

export default function UserListScreen() {
    useAuthGuard()
     const router = useRouter();
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
   const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
  setRefreshing(true);
  await fetchAll();
  setRefreshing(false);
};


useEffect(() => {
fetchAll();
}, []);

const fetchAll = async() => {
  await fetch(`https://radhavallabha-backend-599500600776.asia-south1.run.app/api/all`)  //Replace with your real API URL
    .then(res => res.json())
    .then(data => {
      setUsers(data.users);
      setLoading(false);
    })
    .catch(err => {
      console.error("Error fetching users:", err);
      setLoading(false);
    });
}

  const filteredUsers = useMemo(() => {
    const lower = search.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(lower) ||
        u.phone.toLowerCase().includes(lower) ||
        u.email.toLowerCase().includes(lower)
    );
  }, [search, users]);

  const renderUser = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.name} onPress={() => router.push({ pathname: './users_details', params: { id: item.id } })}>{item.name}</Text>
      <Text style={styles.detail}>{item.phone}</Text>
      <Text style={styles.detail}>{item.email}</Text>

      <View style={styles.row}>
        <Text style={styles.role}>{item.role}</Text>
        <Text style={[styles.status, item.status === 'Active' ? styles.active : styles.inactive]}>
        {item.status}
        </Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.actionBtn}
  onPress={() => router.push({ pathname: './users_details', params: { id: item.id } })}>
         <Text style={styles.btnText}>View</Text>
        </TouchableOpacity>
      <TouchableOpacity
        style={styles.editBtn}
        onPress={() => router.push({ pathname: './edit_user', params: { id: item.id } })}
        >
        <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
    <Header/>
    
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, phone, or email"
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
        <Text style={styles.filterText}>All</Text>
      </View>

    {loading ? <Text style={{ color: '#888', textAlign: 'center' }}>Loading...</Text> : (
    <FlatList
    contentContainerStyle={{ paddingBottom: 120 }} 
    data={filteredUsers}
    renderItem={renderUser}
    keyExtractor={(item) => item.id}
    ListEmptyComponent={
    <Text style={styles.noResults}>No matching users found.</Text>
    }
        refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={['#7e57c2']} // Android
                  tintColor="#7e57c2" // iOS
                />
              }
  />
)}
      
    </View>
    <CustomTabBar_admin/>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 19},
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f1f1f',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    marginLeft: 10,
    height: 40,
  },
  filterText: {
    color: '#888',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  name: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  detail: {
    color: '#bbb',
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  role: {
    color: '#aaa',
    fontStyle: 'italic',
  },
  status: {
    color: '#0f0',
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
  },
  activeBtn: {
    flex: 1,
    backgroundColor: '#444',
    padding: 8,
    borderRadius: 6,
    marginRight: 6,
    alignItems: 'center',
  },
  actionBtn: {
    flex: 1,
    backgroundColor: '#a18cd1',
    padding: 8,
    borderRadius: 6,
    marginHorizontal: 6,
    alignItems: 'center',
  },
  editBtn: {
    flex: 1,
    backgroundColor: '#333',
    padding: 8,
    borderRadius: 6,
    marginLeft: 6,
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: '600',
  },
  noResults: {
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  status: {
  fontWeight: 'bold',
  fontSize: 14,
},
active: {
  color: '#00ff00', // green
},
inactive: {
  color: '#ff4d4d', // red
},
});
