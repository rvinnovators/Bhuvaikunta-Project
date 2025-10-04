import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useAuthGuard from '../../hooks/useAuthGuard';
import Header from './admin_header';
import CustomTabBar_admin from './admin_tab';

const { width ,height} = Dimensions.get('window');

export default function AddVideoScreen() {
    useAuthGuard()

  const [youtubeUrl, setYoutubeUrl] = useState('');
  console.log(youtubeUrl);
  


 
const handlePost = async () => {
  try {
    const response = await fetch('https://radhavallabha-backend-599500600776.asia-south1.run.app/api/upload-youtube-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        youtubeUrl, 
      }),
    });
    const data = await response.json();
    Alert.alert(`Successfully Added`);
  } catch (error) {
    Alert.alert(`Error sending YouTube URL:${error}`);
    
    
  }
};


  return (
    <>
    <Header/>
   
         <KeyboardAwareScrollView
           contentContainerStyle={styles.container}
           enableOnAndroid
           extraScrollHeight={100}
           keyboardShouldPersistTaps="handled"
         >
          <View style={styles.innerContainer}>
        <Text style={styles.title}>Add Playlist</Text>

    


        <Text style={styles.label}>Playlist ID</Text>
        <TextInput
          style={styles.input}
          value={youtubeUrl}
          onChangeText={setYoutubeUrl}
          placeholder="Enter Playlist ID"
          placeholderTextColor="#ccc"
        />
         
      
        <LinearGradient
          colors={['#605fa7', '#ffb1f2']}
          style={styles.postButton}
        >
          <TouchableOpacity onPress={handlePost} style={{ width: '100%' }}>
            <Text style={styles.postText}>Post</Text>
          </TouchableOpacity>
        </LinearGradient>
         </View>
        </KeyboardAwareScrollView>

   

   
    <CustomTabBar_admin/>
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
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  label: {
    color: '#ccc',
    marginTop: 10,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#444',
    padding: 10,
    borderRadius: 8,
    color: '#fff',
  },
  textarea: {
    height: 50,
    textAlignVertical: 'top',
  },
  uploadBox: {
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  uploadText: {
    color: '#aaa',
    marginTop: 6,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    overflow: 'hidden',
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
 postButton: {
  marginTop: 12,            // reduced spacing from 20 to 12
  borderRadius: 8,          // slightly smaller radius
  paddingVertical: 8,       // reduced padding for smaller height
  paddingHorizontal: 16,    // optional: add horizontal padding
  alignItems: 'center',
},
  postText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#55216c',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  }
});
