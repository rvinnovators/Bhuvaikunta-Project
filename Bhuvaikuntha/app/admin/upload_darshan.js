import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useAuthGuard from '../../hooks/useAuthGuard';
import Header from './admin_header';
import CustomTabBar_admin from './admin_tab';

const { width, height } = Dimensions.get('window');

export default function GalleryManagementScreen() {
  useAuthGuard();
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState('Festival');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [caption, setCaption] = useState('');
  const [isVisible, setIsVisible] = useState(true);
 const [tabOptions, setTabOptions] = useState([]); 
 

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true, 
        quality: 1, // Highest quality
    });
    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const formatDate = (d) => {
    return d.toLocaleDateString('en-GB'); // dd-mm-yyyy
  };

 const fetchTabs = async () => {
  try {
    const response = await fetch('https://radhavallabha-backend-599500600776.asia-south1.run.app/api/get/tabs');
    const data = await response.json();

    

      const tabNames = data.map(tab => tab.name);          // Extract only names
      setTabOptions(tabNames);

      if (tabNames.length > 0) {
        setCategory(tabNames[0].toLowerCase());            // Default selected value
      }
  } catch (error) {
    console.error('Error fetching tabs:', error);
  }
};
  useEffect(() => {
    fetchTabs();
  }, [])

const handleSave = async () => {
  if (!image) {
    alert('Please upload an image');
    return;
  }

  const formData = new FormData();
  formData.append('image', {
    uri: image,
    name: 'gallery.jpg',
    type: 'image/jpeg',
  });
  formData.append('category', category);
  formData.append('date', date.toISOString());
  formData.append('caption', caption);
  formData.append('isVisible', isVisible);

  try {
    const response = await fetch('https://radhavallabha-backend-599500600776.asia-south1.run.app/api/add/darshans', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const text = await response.text();
    

    let result;
    try {
      result = JSON.parse(text);
    } catch (err) {
      throw new Error('Invalid JSON returned from server');
    }

    if (response.ok) {
      alert('Darshan item saved');
      setImage(null);
      setCaption('');
    } else {
      alert(result.message || 'Upload failed');
    }
  } catch (error) {
   
    alert('Something went wrong');
  }
};




return (
  <>
    <Header />
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableOnAndroid
      extraScrollHeight={100}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>
          <Ionicons
            name="arrow-back"
            size={24}
            color="#fff"
            onPress={() => router.push('./darshan_management')}
          />{' '}
          Darshan Gallery
        </Text>

        <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.uploadedImage} />
          ) : (
            <>
              <Ionicons name="cloud-upload-outline" size={32} color="#ccc" />
              <Text style={styles.uploadText}>Upload Image</Text>
            </>
          )}
        </TouchableOpacity>

        {/* Category */}
      <View style={styles.fieldContainer}>
      <Text style={styles.label}>Category</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          dropdownIconColor="#fff"
          style={styles.picker}
        >
          {tabOptions.map((tab, index) => (
            <Picker.Item key={index} label={tab} value={tab.toLowerCase()} />
          ))}
        </Picker>
      </View>
    </View>

        {/* Date */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.inputBox}>
            <Text style={styles.inputText}>{formatDate(date)}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                const currentDate = selectedDate || date;
                setShowDatePicker(false);
                setDate(currentDate);
              }}
            />
          )}
        </View>

        {/* Caption */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Caption</Text>
          <TextInput
            placeholder="Enter caption here..."
            placeholderTextColor="#888"
            style={styles.textArea}
            value={caption}
            onChangeText={setCaption}
            multiline
          />
        </View>

        {/* Buttons */}
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.uploadBtn}
            onPress={() => {
              setImage(null);
              setCaption('');
            }}
          >
            <Text style={styles.uploadBtnText}>Upload Another</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
            <Text style={styles.saveBtnText}>Save & Publish</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
    <CustomTabBar_admin />
  </>
);

}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#140024',
    paddingBottom: height * 0.25, // Increased for keyboard spacing
  },
 innerContainer: {
    flexGrow: 1,
    padding: width * 0.05,
  },
  title: {
    color: '#fff',
    fontSize: width * 0.055,
    fontWeight: 'bold',
    marginBottom: height * 0.02,
  },
  imageBox: {
    height: Math.min(height * 0.25, 250),
    backgroundColor: '#1e1e2f',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.03,
    borderColor: '#333',
    borderWidth: 1,
  },
  uploadedImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  uploadText: {
    color: '#ccc',
    marginTop: height * 0.01,
    fontSize: width * 0.035,
  },
  fieldContainer: {
    marginBottom: height * 0.025,
  },
  label: {
    color: '#fff',
    marginBottom: height * 0.01,
    fontSize: width * 0.04,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    color: '#fff',
    backgroundColor: '#1e1e2f',
  },
  inputBox: {
    backgroundColor: '#1e1e2f',
    borderRadius: 8,
    padding: height * 0.015,
    borderWidth: 1,
    borderColor: '#444',
  },
  inputText: {
    color: '#fff',
    fontSize: width * 0.04,
  },
  textArea: {
    backgroundColor: '#1e1e2f',
    borderRadius: 8,
    height: Math.min(height * 0.12, 140),
    padding: width * 0.03,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#444',
    textAlignVertical: 'top',
    fontSize: width * 0.04,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.03,
  },
  uploadBtn: {
    flex: 1,
    marginRight: width * 0.025,
    paddingVertical: height * 0.018,
    borderRadius: 10,
    backgroundColor: '#111',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  uploadBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: width * 0.04,
  },
  saveBtn: {
    flex: 1,
    paddingVertical: height * 0.018,
    borderRadius: 10,
    backgroundColor: '#d18fff',
    alignItems: 'center',
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
});
