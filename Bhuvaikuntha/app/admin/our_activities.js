import { Ionicons } from '@expo/vector-icons';
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
  const [act, setAct] = useState('');
  const [heading, setHeading] = useState('');
  const [like, setlike] = useState(0);
 

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


const handlePost = async () => {
  if (!image) {
    alert('Please upload an image');
    return;
  }
  if (!act?.trim()) {
    alert('Please enter activity description');
    return;
  }
  if (!heading?.trim()) {
    alert('Please enter heading');
    return;
  }

  const formData = new FormData();
  formData.append('image', {
    uri: image,
    name: 'Activity.jpg',
    type: 'image/jpeg',
  });
  formData.append('activity', act);
  formData.append('heading', heading);
  formData.append('likes', like || 0);

  try {
    const response = await fetch('https://radhavallabha-backend-599500600776.asia-south1.run.app/api/add/activity', { 
      method: 'POST',
      body: formData,
    });

    const text = await response.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch {
      throw new Error('Invalid JSON returned from server');
    }

    if (response.ok) {
      alert('Activity saved');
      setAct('');
      setHeading('');
      setImage(null);
    } else {
      alert(result.message || 'Upload failed');
    }
  } catch (error) {
    console.error(error);
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
          <Ionicons name="arrow-back" size={width * 0.06} color="#fff" onPress={() => router.push('./activities_list')} />
          <Text style={styles.headerText}>Activites</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Activites</Text>

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
            placeholder="Enter a Activity Details"
            placeholderTextColor="#888"
            style={styles.inputBox}
            multiline
            value={act}
            onChangeText={setAct}
          />

          <TextInput
            placeholder="Enter Heading/Title"
            placeholderTextColor="#888"
            style={styles.inputBox}
            value={heading}
            onChangeText={setHeading}
          />

          
          <View style={styles.buttonRow}>
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
