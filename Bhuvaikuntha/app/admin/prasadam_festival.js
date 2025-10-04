import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { format } from 'date-fns';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import useAuthGuard from '../../hooks/useAuthGuard';
import Header from './admin_header';
import CustomTabBar_admin from './admin_tab';



const { width, height } = Dimensions.get('window');

const FestivalDetailsScreen = () => {
    useAuthGuard()
  const { festivalId } = useLocalSearchParams();
  const [festivalName, setFestivalName] = useState('');
  const [prasadamStart, setPrasadamStart] = useState(new Date());
  const [prasadamEnd, setPrasadamEnd] = useState(new Date());
  const [qrStart, setQrStart] = useState(new Date());
  const [qrEnd, setQrEnd] = useState(new Date());
  const [festivalDate, setFestivalDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState({ key: '', show: false });
  
  

  const openPicker = (key) => setShowPicker({ key, show: true });

  const onTimeChange = (event, selectedDate) => {
    setShowPicker({ key: '', show: false });
    if (!selectedDate) return;

    switch (showPicker.key) {
      case 'prasadamStart':
        setPrasadamStart(selectedDate);
        break;
      case 'prasadamEnd':
        setPrasadamEnd(selectedDate);
        break;
      case 'qrStart':
        setQrStart(selectedDate);
        break;
      case 'qrEnd':
        setQrEnd(selectedDate);
        break;
      case 'festivalDate':
        setFestivalDate(selectedDate);
        break;
    }
  };

  const formatTime = (date) =>
    format(date, 'hh:mm a');

  const formatDate = (date) =>
    format(date, 'dd MMM yyyy');

  useEffect(() => {
    if (!festivalId) return;

    const fetchCoupons = async () => {
      try {
       
        const response = await axios.get(
          `https://radhavallabha-backend-599500600776.asia-south1.run.app/api/coupons/byFestival/${festivalId}`
        );
      const data = response.data;
        setFestivalName(data.festivalName || '');
        setFestivalDate(new Date(data.festivalDate));
        setPrasadamStart(new Date(data.prasadamStart));
        setPrasadamEnd(new Date(data.prasadamEnd));
        setQrStart(new Date(data.qrStart));
        setQrEnd(new Date(data.qrEnd));
        
      } catch (error) {
        console.error('Failed to fetch coupons:', error.message);
        Alert.alert('Error', 'Could not load coupons');
      } finally {
        
      }
    };

    fetchCoupons();
  }, [festivalId]); 
  
const handleSave = async () => {
  const data = {
    festivalName,
    prasadamStart: prasadamStart.toISOString(),
    prasadamEnd: prasadamEnd.toISOString(),
    qrStart: qrStart.toISOString(),
    qrEnd: qrEnd.toISOString(),
    festivalDate: festivalDate.toISOString().split('T')[0]
  };

  try {
    const response = await fetch(`https://radhavallabha-backend-599500600776.asia-south1.run.app/api/festivals/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const json = await response.json();

    if (response.ok) {
      alert('Festival saved successfully');
      console.log('Festival saved with ID:', json.id);

      // Optional: clear form
      setFestivalName('');
      setPrasadamStart(new Date());
      setPrasadamEnd(new Date());
      setQrStart(new Date());
      setQrEnd(new Date());
      setFestivalDate(new Date());

    } else {
      alert(`Save failed: ${json.message}`);
         console.log('Festival saved with ID:', json.message);
    }
  } catch (error) {
    console.error('Error saving festival:', error);
    alert('Something went wrong while saving the festival.');
  }
};



  return (
    <>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Festival Details</Text>

        {/* Festival Name */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Festival Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter festival name"
            placeholderTextColor="white"
            value={festivalName}
            onChangeText={setFestivalName}
          />
        </View>

        {/* Festival Date */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Festival Date</Text>
          <TouchableOpacity
            onPress={() => openPicker('festivalDate')}
             style={styles.input}
          >
            <Text style={styles.timeText}>{formatDate(festivalDate)}</Text>
          </TouchableOpacity>
        </View>

        {/* Lecture Time */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>PRASADAM TIME</Text>
          <View style={styles.timeRow}>
            <TouchableOpacity
              onPress={() => openPicker('prasadamStart')}
              style={styles.timeBox}
            >
              <Text style={styles.timeText}>{formatTime(prasadamStart)}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => openPicker('prasadamEnd')}
              style={styles.timeBox}
            >
              <Text style={styles.timeText}>{formatTime(prasadamEnd)}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* QR Generation Window */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>QR GENERATION TIME</Text>
          <View style={styles.timeRow}>
            <TouchableOpacity
              onPress={() => openPicker('qrStart')}
              style={styles.timeBox}
            >
              <Text style={styles.timeText}>{formatTime(qrStart)}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => openPicker('qrEnd')}
              style={styles.timeBox}
            >
              <Text style={styles.timeText}>{formatTime(qrEnd)}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>

        {/* Date/Time Picker */}
        {showPicker.show && (
          <DateTimePicker
            value={new Date()}
            mode={showPicker.key === 'festivalDate' ? 'date' : 'time'}
            is24Hour={false}
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={onTimeChange}
          />
        )}
      </ScrollView>
      <CustomTabBar_admin />
    </>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: width * 0.08,
    backgroundColor: '#000',
    paddingBottom: height * 0.3,
  },
  heading: {
    fontSize: width * 0.07,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: height * 0.025,
    alignSelf: 'center',
  },
  section: {
    marginBottom: height * 0.03,
  },
  sectionHeader: {
    fontSize: width * 0.045,
    fontWeight: 'bold',
    color: '#B9F1FF',
    marginBottom: height * 0.012,
    textAlign: 'center',
  },
  label: {
    fontSize: width * 0.04,
    color: '#fff',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#111',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    color: '#fff',
    borderWidth: 2,
    borderColor: '#a47cf3',
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeBox: {
    width: '48%',
    backgroundColor: '#111',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#a47cf3',
  },
  timeText: {
    color: '#fff',
    fontSize: width * 0.04,
  },
saveButton: {
  backgroundColor: '#d18fff',
  paddingVertical: 6,            // smaller height
  paddingHorizontal: 16,         // optional: add horizontal padding
  borderRadius: 8,               // smaller border radius
  marginTop: height * 0.015,     // slightly smaller top margin
  alignItems: 'center',
},
saveButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: width * 0.035,       // reduced font size
},
});

export default FestivalDetailsScreen;
