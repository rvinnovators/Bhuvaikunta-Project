import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
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
  const [category, setCategory] = useState('book distribution');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [caption, setCaption] = useState('');


  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const formatDate = (d) => d.toLocaleDateString('en-GB');

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

  try {
    const response = await fetch('https://radhavallabha-backend-599500600776.asia-south1.run.app/api/add/Gallery', { 
      method: 'POST',
      body: formData, // let fetch set headers automatically
    });

    const text = await response.text();
    let result;

    try {
      result = JSON.parse(text);
    } catch {
      throw new Error('Invalid JSON returned from server');
    }

    if (response.ok) {
      alert('Gallery item saved');
      setImage(null);
      setCaption('');
    } else {
      alert(result.message || 'Upload failed');
    }
  } catch (error) {
    console.log(error);
    alert('Something went wrong: ' + error.message);
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
              size={width * 0.06}
              color="#fff"
              onPress={() => router.push('./gallery_list')}
            />{' '}
            Gallery Management
          </Text>

          {/* Upload Image */}
          <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.uploadedImage} />
            ) : (
              <>
                <Ionicons name="cloud-upload-outline" size={width * 0.08} color="#ccc" />
                <Text style={styles.uploadText}>Upload Image</Text>
              </>
            )}
          </TouchableOpacity>

          {/* Category Picker */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
                dropdownIconColor="#fff"
                style={styles.picker}
              >
                <Picker.Item label="Book Distribution" value="book distribution" />
                <Picker.Item label="Saturday Youth Festival" value="saturday youth festival" />
                <Picker.Item label="Temple Photo" value="temple photo" />
                <Picker.Item label="Bhakti Kirtan" value="bhakti kirtan" />
                <Picker.Item label="Deities" value="deities" />
                <Picker.Item label="Sunday Program" value="sunday program" />
                <Picker.Item label="Mahaprasadam" value="mahaprasadam" />
                <Picker.Item label="IGF Summer Camp" value="igf summer camp" />
                <Picker.Item label="Festival" value="festival" />


              </Picker>
            </View>
          </View>

          {/* Date Picker */}
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

          {/* Caption Input */}
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

          {/* Action Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.uploadBtn} onPress={() => setImage(null)}>
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
    height: height * 0.25,
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
    height: height * 0.12,
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
