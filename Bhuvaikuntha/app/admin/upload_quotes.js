import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
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

export default function CreatePostScreen() {
  useAuthGuard();
  const router = useRouter();

  const [image, setImage] = useState(null);
  const [quote, setQuote] = useState('');
  const [place, setPlace] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access gallery is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const formatDate = (dateObj) => {
    return dateObj?.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handlePost = async () => {
  if (!image) {
    alert('Please upload an image');
    return;
  }

  const formData = new FormData();
  formData.append('image', {
    uri: image,
    name: 'Quotes.jpg',
    type: 'image/jpeg',
  });
  formData.append('quote', quote);
  formData.append('date', date.toISOString());
  formData.append('place', place);
  

  try {
    const response = await fetch('https://radhavallabha-backend-599500600776.asia-south1.run.app/api/add/quotes', { 
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
      alert('Quote saved');
      setQuote('');
    setImage(null);
    setPlace('');
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
        <View style={styles.header}>
          <Ionicons name="arrow-back" size={width * 0.06} color="#fff" onPress={() => router.push('./quotes_list')} />
          <Text style={styles.headerText}>Create Posts</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Create Post</Text>

          <TouchableOpacity style={styles.scheduleBtn} onPress={pickImage}>
            <Text style={styles.scheduleBtnText}>Pick Image</Text>
          </TouchableOpacity>

          {image && (
            <Image
              source={{ uri: image }}
              style={styles.previewImage}
            />
          )}

          <TextInput
            placeholder="Enter a quotes"
            placeholderTextColor="#888"
            style={styles.inputBox}
            multiline
            value={quote}
            onChangeText={setQuote}
          />

          <TextInput
            placeholder="Enter place..."
            placeholderTextColor="#888"
            style={styles.inputBox}
            value={place}
            onChangeText={setPlace}
          />

          <View style={{ marginBottom: height * 0.02 }}>
            <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.inputBoxDate}>
              <Text style={{ color: '#fff' }}>{formatDate(date)}</Text>
            </TouchableOpacity>

            {showPicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChange}
              />
            )}
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.scheduleBtn}>
              <Text style={styles.scheduleBtnText}>Schedule Post</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.postBtn} onPress={handlePost}>
              <Text style={styles.postBtnText}>Post</Text>
            </TouchableOpacity>
          </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: height * 0.015,
  },
  headerText: {
    fontSize: width * 0.05,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: width * 0.03,
  },
  card: {
    backgroundColor: '#1a0b2e',
    borderRadius: width * 0.04,
    padding: width * 0.04,
    width: '100%',
    marginBottom: height * 0.05,
  },
  cardTitle: {
    fontSize: width * 0.045,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: height * 0.02,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: width * 0.03,
    padding: width * 0.03,
    color: '#fff',
    marginTop: height * 0.015,
  },
  inputBoxDate: {
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: width * 0.03,
    padding: width * 0.035,
    marginTop: height * 0.015,
    alignItems: 'center',
  },
  scheduleBtn: {
    backgroundColor: '#4b0082',
    paddingVertical: height * 0.015,
    borderRadius: width * 0.03,
    marginTop: height * 0.015,
    alignItems: 'center',
    flex: 1,
  },
  scheduleBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
  postBtn: {
    backgroundColor: '#008080',
    paddingVertical: height * 0.015,
    borderRadius: width * 0.03,
    marginTop: height * 0.015,
    marginLeft: width * 0.03,
    alignItems: 'center',
    flex: 1,
  },
  postBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.04,
  },
  buttonRow: {
    flexDirection: 'row',
    marginTop: height * 0.02,
    gap: width * 0.02,
  },
  previewImage: {
    width: '100%',
    height: height * 0.25,
    borderRadius: width * 0.03,
    marginTop: height * 0.015,
  },
});
