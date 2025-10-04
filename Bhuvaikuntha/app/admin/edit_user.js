import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import useAuthGuard from '../../hooks/useAuthGuard';
import Header from './admin_header';
import CustomTabBar_admin from './admin_tab';


const { width } = Dimensions.get('window');

const EditUserScreen = () => {
    useAuthGuard()
const { id } = useLocalSearchParams();
  const [name, setName] = useState('Radhika Sharma');
  const [phone, setPhone] = useState('+91-98123-45678');
  const [devotionalLevel, setDevotionalLevel] = useState('Regular');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('Active');
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
  if (id) {
    fetch(`https://radhavallabha-backend-599500600776.asia-south1.run.app/api/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setName(data.user.name || '');
          setPhone(data.user.phone || '');
          setDevotionalLevel(data.user.devotionalLevel || 'Regular');
          setRole(data.user.role || 'user');
          setStatus(data.user.status);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading user:', err);
        setLoading(false);
      });
  }
}, [id]);


  const handleSave = async () => {
  try {
    const response = await fetch(`https://radhavallabha-backend-599500600776.asia-south1.run.app/api/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id, 
        name,
        phone,
        devotionalLevel,
        role,
        status,
      }),
    });

    const data = await response.json();

    if (data.success) {
      alert('User updated successfully');
    } else {
      alert('Update failed: ' + (data.error || 'Unknown error'));
    }
  } catch (error) {
    console.error('Save error:', error);
    alert('Failed to save user');
  }
};


 

  return (
    <>
    <Header/>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Edit User</Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />

      <Text style={styles.label}>Devotional Level</Text>
      <View style={styles.pickerBox}>
        <Picker
          selectedValue={devotionalLevel}
          onValueChange={(itemValue) => setDevotionalLevel(itemValue)}
        >
          <Picker.Item label="Regular" value="Regular" />
          <Picker.Item label="Beginner" value="Beginner" />
          <Picker.Item label="Advanced" value="Advanced" />
        </Picker>
      </View>

      <Text style={styles.label}>Role</Text>
      <View style={styles.pickerBox}>
        <Picker selectedValue={role} onValueChange={(val) => setRole(val)}>
          <Picker.Item label="User" value="user" />
          <Picker.Item label="Admin" value="admin" />
          <Picker.Item label="Sub_Admin" value="sub_admin" />

        </Picker>
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.label}>Active</Text>
        <Switch
       value={status === 'Active'}
        onValueChange={(value) => setStatus(value ? 'Active' : 'Inactive')} 
        thumbColor={status === 'Active' ? '#fff' : '#ccc'}
        trackColor={{ false: '#666', true: '#7B61FF' }}
        />
      </View>

      <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
        <LinearGradient
          colors={['#605fa7', '#ffb1f2']}
          style={styles.gradient}
        >
          <Text style={styles.saveText}>Save Changes</Text>
        </LinearGradient>
      </TouchableOpacity>
    </ScrollView>
    <CustomTabBar_admin/>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: width * 0.06,
    backgroundColor: '#0D0D0D',
    minHeight: '100%',
  },
  heading: {
    fontSize: RFValue(22),
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  label: {
    color: '#ccc',
    marginTop: 15,
    marginBottom: 5,
    fontSize: RFValue(14),
  },
  input: {
    backgroundColor: '#1F1F1F',
    padding: 12,
    borderRadius: 10,
    color: '#fff',
  },
  pickerBox: {
    backgroundColor: '#1F1F1F',
    borderRadius: 10,
    overflow: 'hidden',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  interestButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#1F1F1F',
    marginRight: 10,
    marginBottom: 10,
  },
  interestSelected: {
    backgroundColor: '#7B61FF',
  },
  interestText: {
    color: '#ccc',
  },
  interestTextSelected: {
    color: '#fff',
    fontWeight: 'bold',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
saveButton: {
  marginTop: 20,
  borderRadius: 10,
  overflow: 'hidden',
  width: '60%',         // Optional: adjust button width
  alignSelf: 'center',  // Center the button
},

gradient: {
  paddingVertical: 10,  // Reduced height
  alignItems: 'center',
},

saveText: {
  color: '#fff',
  fontSize: RFValue(14), // Smaller text size
  fontWeight: '600',
},

});

export default EditUserScreen;
