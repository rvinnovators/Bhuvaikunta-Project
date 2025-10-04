import {
  Entypo,
  Ionicons
} from '@expo/vector-icons';


import AsyncStorage from '@react-native-async-storage/async-storage';
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



const { width, height } = Dimensions.get('window');

const passwordResetAdmin = () => {
  const router = useRouter();
  const [phoneEditable, setPhoneEditable] = useState(false);
  const [passwordEditable, setPasswordEditable] = useState(false);
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
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
        setPassword(parsedUser.password || '');
        setConPassword(parsedUser.password || '');
        setProfileImage(parsedUser.profileImage || null); 
      } else {
        router.replace('../login/login');
      }
    };
    getUser();
  }, []);


// Update Phone and Password

const updateUserProfile = async () => {
   // Password validation regex
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!passwordRegex.test(password)) {
    alert(
      "Password must be at least 8 characters long and include:\n- Uppercase letter\n- Lowercase letter\n- Number\n- Special character"
    );
    return;
  }

  if (password !== conPassword) {
    alert("Passwords do not match!");
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
            alert("Password updated successfully!");
            const updatedUser = { ...user, phone, password };
            setUser(updatedUser);
        } else {
            alert("Update failed: " + json.message);
        }
        } else {
        const rawText = await res.text(); // Log what server actually sent
        console.error("Server returned non-JSON:", rawText);
        alert("Unexpected server response. Check console.");
        }

  } catch (err) {
    console.error("Password update error:", err);
    alert("Failed to update profile.");
  }
};


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require('../../assets/images/icon.png')} style={styles.logo} />
        <Text style={styles.title}> Sri Gaura Radha{'\n'}Vallabha Temple</Text>

        <View style={styles.profileContainer}>
          <Image
            source={profileImage ? { uri: profileImage } : require('../../assets/images/user.png')}
            style={styles.profilePic}
          />
       
        </View>

        <Text style={styles.name}>{user?.name || 'Loading...'}</Text>
      </View>

      {/* Decorative Flowers */}
      <Image source={require('../../assets/images/deity-bg-lotus.png')} style={styles.flowerTopLeft} />
      <Image source={require('../../assets/images/deity-bg-lotus.png')} style={styles.flowerTopRight} />

        {/* Password */}
        <View style={styles.infoRow}>
          <Text style={styles.label}>Password :</Text>
          <TextInput
            style={styles.input}
            value={password}
            secureTextEntry={!showPassword}
            onChangeText={setPassword}
         
          />
           <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
                 <Entypo
                   name={showPassword ? 'eye' : 'eye-with-line'}
                   size={18}
                   color="#ccc"
                   style={styles.iconRight}
                 />
               </TouchableOpacity>
        
        </View>

      
          <View style={styles.infoRow}>
            <Text style={styles.label}>Confirm Password :</Text>
            <TextInput
              style={styles.input}
              value={conPassword}
              onChangeText={setConPassword}
             secureTextEntry={!showPassword}
            />
             <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
                 <Entypo
                   name={showPassword ? 'eye' : 'eye-with-line'}
                   size={18}
                   color="#ccc"
                   style={styles.iconRight}
                 />
               </TouchableOpacity>
          </View>

        {/* Logout */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TouchableOpacity
          style={[styles.logoutButton, { marginRight: 10 }]}  // add some margin to the right for spacing
          onPress={async () => {
            router.dismissAll();
            router.replace('../login/login');
          }}
        >
          <Ionicons name="log-out-outline" size={18} color="#fff" />
          <Text style={styles.logoutText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={updateUserProfile}
        >
          <Ionicons name="create-outline" size={18} color="#fff" />
          <Text style={styles.logoutText}>Update</Text>
        </TouchableOpacity>
      </View>

      </View>

  );
};

export default passwordResetAdmin;

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
  marginBottom: 10,
  padding: 10,
  paddingRight: 14,
  position: 'relative',
  top: height * 0.06,

  width: '80%',           // reduce width to 90% of parent
  alignSelf: 'center',    // center horizontally
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
    marginTop: 10,
    top:height*0.1
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
   iconRight: {
    marginLeft: 8,
  },
});
