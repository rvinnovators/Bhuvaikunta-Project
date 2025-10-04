import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Modal,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
import useAuthGuard from '../../hooks/useAuthGuard';
import Header from './admin_header';
import CustomTabBar_admin from './admin_tab';

const { width } = Dimensions.get('window');

const initialTabs = [];



export default function GalleryManagementScreen() {
  useAuthGuard();
  const router = useRouter();
  const [tabs, setTabs] = useState(initialTabs);
  const [activeTab, setActiveTab] = useState(initialTabs[0]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTab, setNewTab] = useState('');
  const [images,setImage] =useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
  setRefreshing(true);
   await Promise.all([fetchTabs(), fetchDarshan()]);
  setRefreshing(false);
};

 const filteredImages = images.filter(
  (img) => img.category?.toLowerCase() === activeTab?.toLowerCase()
);



useEffect(() => {
  if (activeTab) {
    fetchDarshan();
  }
}, [activeTab]);

const fetchDarshan = async() => {
  try {
    const response = await fetch(`https://radhavallabha-backend-599500600776.asia-south1.run.app/api/get/darshans`);
    const data = await response.json();
    setImage(data);
  } catch (error) {
    console.error('Error fetching darshan images:', error);
  }
};
 
 const fetchTabs = async () => {
  try {
    const response = await fetch('https://radhavallabha-backend-599500600776.asia-south1.run.app/api/get/tabs');
    const data = await response.json();

    const tabNames = data.map(tab => tab.name);
    setTabs(tabNames);

     if (tabNames.length > 0) {
        setActiveTab(tabNames[0]);
        
      }

  } catch (error) {
    console.error('Error fetching tabs:', error);
  }
};
  useEffect(() => {
    fetchTabs();
   
  }, [])

  const handleAddTab = async () => {
  if (!newTab.trim()) {
    alert('Please enter a tab name');
    return;
  }

  try {
    const response = await fetch('https://radhavallabha-backend-599500600776.asia-south1.run.app/api/live/darshan/tabs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: newTab.trim() }),
    });

    if (response.ok) {
      const result = await response.json(); // Get the created tab with ID

      alert('Tab added!');

      // Add the new tab with ID to the list
      setTabs([...tabs, result.name]);  //nsures you're storing full object like { id, name }

      // Reset form & close modal
      setNewTab('');
      setModalVisible(false);
    } else {
      const errorData = await response.json();
      alert(`Failed to add tab: ${errorData.error || 'Unknown error'}`);
    }
  } catch (error) {
    
    alert('Network error. Please try again.');
  }
};

const handleDelete = async (id) => {
  setImage(prevImages => prevImages.filter(item => item._id !== id));
  try {
    const response = await fetch(`https://radhavallabha-backend-599500600776.asia-south1.run.app/api/delete/darshan/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Item deleted');
       fetchDarshan();
      
    } else {
      alert('Failed to delete');
    }
  } catch (error) {
    console.error('Delete error:', error);
    alert('Error deleting item');
  }
};

const deleteTabById = async (name) => {
  try {
    const response = await fetch(`https://radhavallabha-backend-599500600776.asia-south1.run.app/api/delete/tab/${name}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      alert('Item deleted');
      fetchTabs();
    } else {
      alert('Failed to delete');
    }
  } catch (error) {
    console.error('Delete error:', error);
    alert('Error deleting item');
  }
};

const handleDeleteTab = (name) => {

 
  Alert.alert(
    "Confirm Delete",
    "Are you sure you want to delete this tab?",
    [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          // Call the async function here without awaiting
          deleteTabById(name);
        }
      }
    ]
  );
};



  return (
    <>
      <Header />
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Darshan Gallery</Text>

        {/* Tabs */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
            {tabs.map((tab, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.tabButton, activeTab === tab && styles.activeTab]}
                onPress={() => setActiveTab(tab)}
                activeOpacity={0.7}
              >
                <Text style={styles.tabText}>{tab}</Text>
                <TouchableOpacity onPress={() => handleDeleteTab(tab)} style={styles.iconButton}>
                  <Icon name="trash-outline" size={20} color="#ccc" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addTabButton}>
              <Icon name="add" size={20} color="white" />
            </TouchableOpacity>
          </ScrollView>



        {/* Images */}
        <ScrollView contentContainerStyle={styles.scrollContainer}     refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={['#7e57c2']} // Android spinner color
                  tintColor="#7e57c2" // iOS spinner color
                />
              }> 
          {filteredImages.length > 0 ? (
            filteredImages.map((item) => (
              <View key={item.id} style={styles.card}>
                <View style={styles.imageRow}>
                  <Image source={{ uri: item.imageUrl }} style={styles.image} />
                  <View style={styles.details}>
                    <Text style={styles.label} numberOfLines={1} ellipsizeMode="tail">
                      Category: <Text style={styles.bold}>{item.category}</Text>
                    </Text>
                     <Text style={styles.label}>
                    {item.date?._seconds
                      ? new Date(item.date._seconds * 1000).toLocaleDateString()
                      : '-'}
                  </Text>
                  </View>
                </View>
                <View style={styles.iconRow}>
                  <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Icon name="trash-outline" size={20} color="#ccc" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>No images found for this category.</Text>
          )}
        </ScrollView>

        {/* FAB */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => router.push({ pathname: './upload_darshan', params: { tab:tabs } })}
        >
          <Icon name="add-circle-outline" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Add Tab Modal */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Add New Tab</Text>
              <TextInput
                style={styles.input}
                placeholder="Tab Name"
                value={newTab}
                onChangeText={setNewTab}
              />
              <TouchableOpacity style={styles.saveButton} onPress={handleAddTab}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <CustomTabBar_admin />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f20',
    paddingHorizontal: RFValue(16),
    paddingTop: RFValue(20),
  },
  title: {
    fontSize: RFValue(22),
    fontWeight: 'bold',
    color: 'white',
    marginBottom: RFValue(10),
  },
  tabContainer: {
    marginBottom: RFValue(10),
    paddingVertical: RFValue(20),
  },
 tabButton: {
  backgroundColor: '#7e57c2',
  borderRadius: 20,
  paddingHorizontal: 20,
  height: RFValue(38), // Set a fixed height
  justifyContent: 'center', // Center text vertically
  alignItems: 'center', // Center text horizontally
  marginRight: 12,
  position: 'relative',
  flexDirection: 'row',
  alignItems: 'center',
},
  activeTab: {
    backgroundColor: '#6a6aff',
  },
tabText: {
  color: 'white',
  fontSize: RFValue(12),
  textAlign: 'center',
  textAlign: 'left',
  flex: 1,   
},
iconButton: {

 
  padding: 10,
},


  addTabButton: {
    backgroundColor: '#7e57c2',
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContainer: {
    paddingBottom: RFValue(180),
  },
  card: {
    backgroundColor: '#1c1c2b',
    borderRadius: RFValue(12),
    padding: RFValue(12),
    marginBottom: RFValue(16),
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
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: RFValue(16),
    marginTop: RFValue(10),
  },
  noDataText: {
    color: '#aaa',
    textAlign: 'center',
    marginTop: RFValue(20),
    fontSize: RFValue(14),
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 150,
    backgroundColor: '#e91e63',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    zIndex: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontWeight: 'bold',
    fontSize: RFValue(14),
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#6a6aff',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  saveText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
