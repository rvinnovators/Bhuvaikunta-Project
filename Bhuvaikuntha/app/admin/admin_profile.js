import {
  Feather,
  Ionicons,
  MaterialIcons
} from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
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




const { width, height } = Dimensions.get('window');

const ProfileScreen = () => {
  useAuthGuard()
  const router = useRouter();
  const [phoneEditable, setPhoneEditable] = useState(false);
  const [passwordEditable, setPasswordEditable] = useState(false);
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');

  useEffect(() => {
    const getUser = async () => {
      const storedUser = await AsyncStorage.getItem('userData');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setPhone(parsedUser.phone || '');
        setEmail(parsedUser.email || '');
        setDob(parsedUser.dob || '');
        setPassword(parsedUser.password || '');
        setConPassword(parsedUser.password || '');
        setProfileImage(parsedUser.profileImage || null); 
      } else {
        router.replace('../login/login');
      }
    };
    getUser();
  }, []);

/// Upload Profile Image
const handlePickImage = async () => {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (permissionResult.granted === false) {
    alert("Permission to access media library is required!");
    return;
  }

  const pickerResult = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,  //this will be changed in future because it is deprecated
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (pickerResult.canceled || !pickerResult.assets || !pickerResult.assets[0]) return;

  const localUri = pickerResult.assets[0].uri;
  const filename = localUri.split("/").pop();
  const match = /\.(\w+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : `image`;

  const formData = new FormData();
  formData.append("profileImage", {
    uri: localUri,
    name: filename,
    type,
  });

  try {
    const userId = await AsyncStorage.getItem('userId');
    const token = await AsyncStorage.getItem("token");
   
    const res = await fetch(`https://radhavallabha-backend-599500600776.asia-south1.run.app/api/upload-profile-image/${userId}`, {
      method: 'POST',
      body: formData,
      headers: {
       
         Authorization: `Bearer ${token}`,
      },
    });

    const json = await res.json();

    if (res.ok) {
      alert("Image uploaded!");
      const updatedUser = { ...user, profileImage: json.imageUrl };
      setUser(updatedUser);
      setProfileImage(json.imageUrl);
      await AsyncStorage.setItem('userData', JSON.stringify(updatedUser));
     
    } else {
      alert("Upload failed: " + json.message);
      console.error("Upload failed:", json);
    }
  } catch (err) {
    console.error("Upload failed:", err);
    alert("Upload failed. Please try again.");
  }
};

// Update Phone and Password

const updateUserProfile = async () => {
  if (passwordEditable && password !== conPassword) {
    alert("Passwords do not match!");
    return;
  }

     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordRegex.test(password)) {
    alert(
      "Password must be at least 8 characters long and include:\n- Uppercase letter\n- Lowercase letter\n- Number\n- Special character"
    );
    return;
  }
    const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phone)) {
    alert("Please enter a valid 10-digit phone number.");
    return;
  }

  try {
    const userId = await AsyncStorage.getItem("userId");
    const token = await AsyncStorage.getItem("token");
    
    const res = await fetch(`https://radhavallabha-backend-599500600776.asia-south1.run.app/api/update-profile/` + userId, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
             Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ phone, password }),
        });

        const contentType = res.headers.get("content-type");

        if (contentType && contentType.includes("application/json")) {
        const json = await res.json();

        if (res.ok) {
            alert("Profile updated successfully!");
            const updatedUser = { ...user, phone, password };//set safeuser in future
            setUser(updatedUser);
            await AsyncStorage.setItem("userData", JSON.stringify(updatedUser));
        } else {
            alert("Update failed: " + json.message);
        }
        } else {
        const rawText = await res.text(); // Log what server actually sent
        console.error("Server returned non-JSON:", rawText);
        alert("Unexpected server response. Check console.");
        }

  } catch (err) {
    console.error("Profile update error:", err);
    alert("Failed to update profile.");
  }
};



  return (
          <KeyboardAwareScrollView
    contentContainerStyle={{ flexGrow: 1, }} // padding for tab bar
    enableOnAndroid
    extraScrollHeight={35}
    keyboardShouldPersistTaps="handled"
  >
  
    <View style={styles.container}>
  
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../../assets/images/iskcon-logo.png')} style={styles.logo} />
        <Text style={styles.title}> Sri Gaura Radha{'\n'}Vallabha Temple</Text>

        <View style={styles.profileContainer}>
          <Image
            source={profileImage ? { uri: profileImage } : require('../../assets/images/user.png')}
            style={styles.profilePic}
          />
          <TouchableOpacity style={styles.editPhotoIcon} onPress={handlePickImage}>
            <Feather name="edit-2" size={16} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.name}>{user?.name || 'Loading...'}</Text>
      </View>

      {/* Decorative Flowers */}
      <Image source={require('../../assets/images/deity-bg-lotus.png')} style={styles.flowerTopLeft} />
      <Image source={require('../../assets/images/deity-bg-lotus.png')} style={styles.flowerTopRight} />

      {/* Info Section */}
      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone Number :</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            editable={phoneEditable}
            keyboardType="phone-pad"
          />
          <TouchableOpacity
                onPress={() => {
                    if (phoneEditable) updateUserProfile();
                    setPhoneEditable(!phoneEditable);
                }}
                >
            <MaterialIcons
              name={phoneEditable ? 'check' : 'edit'}
              size={20}
              color={phoneEditable ? '#4caf50' : '#ccc'}
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Email Id :</Text>
          <Text style={styles.value}>{email}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>DOB :</Text>
          <Text style={styles.value}>{dob}</Text>
        </View>
        {/* Password */}
        <View style={styles.infoRow}>
          <Text style={styles.label}>Password :</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            editable={passwordEditable}
            secureTextEntry
          />
          <TouchableOpacity
                onPress={() => {
                    if (passwordEditable) updateUserProfile();
                    setPasswordEditable(!passwordEditable);
                }}
                >

            <MaterialIcons
              name={passwordEditable ? 'check' : 'edit'}
              size={20}
              color={passwordEditable ? '#4caf50' : '#ccc'}
              style={styles.editIcon}
            />
          </TouchableOpacity>
        </View>

        {passwordEditable && (
          <View style={styles.infoRow}>
            <Text style={styles.label}>Confirm Password :</Text>
            <TextInput
              style={styles.input}
              value={conPassword}
              onChangeText={setConPassword}
              secureTextEntry
            />
          </View>
        )}

        {/* Logout */}
               {/* Logout */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

               <TouchableOpacity
                  style={styles.logoutButton}
                 onPress={() => router.push('/admin/admin_dashboard')}
                >
                  <Ionicons name="arrow-back-outline" size={18} color="#fff" />
                  <Text style={styles.logoutText}>Back</Text>
       </TouchableOpacity>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={async () => {
            await AsyncStorage.removeItem('userId');
            await AsyncStorage.removeItem('userData');
            await AsyncStorage.clear();
            router.dismissAll();
            router.replace('../login/login');
          }}
        >
          <Ionicons name="log-out-outline" size={18} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        
        </View>
      </View>

        
        
    </View>

   </KeyboardAwareScrollView>

   
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
    marginTop: height * 0.01,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  templeName: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 4,
    fontFamily: 'serif',
  },
  profilePic: {
    width: width * 0.28,
    height: width * 0.28,
    borderRadius: width * 0.14,
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileContainer: {
  position: 'relative',
},
editPhotoIcon: {
  position: 'absolute',
  bottom: 0,
  right: 0,
  backgroundColor: '#8e4bff',
  padding: 4,
  borderRadius: 20,
},

  name: {
    color: '#b68eff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 6,
    textShadowColor: '#fff',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 1,
  },
  infoSection: {
    marginTop: 20,
    width: '85%',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    marginBottom: 12,
    padding: 10,
    paddingRight: 14,
    position: 'relative',
  },
  label: {
    color: '#aaa',
    fontWeight: '600',
    width: 100,
    fontSize: 13,
  },
  value: {
    color: '#fff',
    flex: 1,
    fontSize: 13,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 13,
    borderBottomWidth: 1,
    borderColor: '#333',
    paddingVertical: 2,
  },
  editIcon: {
    marginLeft: 6,
  },
  logoutButton: {
    backgroundColor: '#8e4bff',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 30,
    marginTop: height*0.10,
    top:height*0.04
  },
  logoutText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#8e4bff',
    width: '100%',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
    flowerTopLeft: {
    position: 'absolute',
    top:40,
    left: -80,
    width: width * 0.40,
    height: width * 0.40,
    resizeMode: 'contain',
    opacity:0.5
  },
  flowerTopRight: {
    position: 'absolute',
    top: 40,
    right: -80,
    width: width * 0.40,
    height: width * 0.40,
    resizeMode: 'contain',
    opacity:0.5
  },
    logo: {
    width: 100,
    height: 100,
    marginTop: 40,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 30,
    color: 'white',
    marginVertical: 10,
    fontFamily:'BerkshireSwash_400Regular',
  },
});
