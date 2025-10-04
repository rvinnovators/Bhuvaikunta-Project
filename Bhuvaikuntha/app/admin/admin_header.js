import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';

import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const Header = () => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [menuVisible, setMenuVisible] = useState(false);
  const [userId, setUserId] = useState(null); // track login status
  const [role,setRole]=useState('')

  
  useEffect(() => {
    const getUser = async () => {
      const storedUser = await AsyncStorage.getItem('userData');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setRole(parsedUser.role || '');
      }
    };
    getUser();
  }, []);

  const animation = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
    Animated.timing(animation, {
      toValue: menuVisible ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleOption = (path) => {
    setMenuVisible(false);
    router.push(path);
  };

  // Check login status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      setUserId(storedUserId);
    };
    checkAuth();
  }, []);

  const topDotTranslate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 6],
  });

  const bottomDotTranslate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -6],
  });

  const middleOpacity = animation.interpolate({
    inputRange: [0, 4],
    outputRange: [4, 0],
  });

  return (
    <View style={{ backgroundColor: '#000', borderBottomRightRadius: 100, borderBottomLeftRadius: 50 }}>
      <LinearGradient
        colors={['#000000', '#2d1d33']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradient, { paddingTop: insets.top }]}
      >
        <View style={styles.container}>
        
                   <Image
                     source={require('../../assets/images/iskcon-logo.png')}
                     style={styles.logo}
                   />
                
          <View style={styles.rightActions}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="sunny" size={28} color="#fff" />
            </TouchableOpacity>

            {userId && (
              <>
             

                <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
                  {/* Top Line */}
                  <View style={styles.row}>
                    <Animated.View style={[styles.dot, { transform: [{ translateX: topDotTranslate }] }]} />
                    <View style={styles.line} />
                  </View>
                  {/* Middle Line */}
                  <Animated.View style={[styles.line, { marginVertical: 4, opacity: middleOpacity }]} />
                  {/* Bottom Line */}
                  <View style={styles.row}>
                    <View style={styles.line} />
                    <Animated.View style={[styles.dot, { transform: [{ translateX: bottomDotTranslate }] }]} />
                  </View>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>

        {/* Dropdown menu */}
        {userId && menuVisible && (
          <View style={styles.dropdownMenu}>
            <TouchableOpacity style={styles.dropdownItem} onPress={() => handleOption('/admin/admin_profile')}>
              <Ionicons name="person-circle-outline" size={18} color="#000" style={styles.dropdownIcon} />
              <Text style={styles.dropdownText}>Profile</Text>
            </TouchableOpacity>
            
                    {/* {role === 'super_admin' && (
              <TouchableOpacity style={styles.dropdownItem} onPress={() => handleOption('../upcoming_festival/festival')}>
                <Ionicons name="wallet-outline" size={18} color="#000" style={styles.dropdownIcon} />
                <Text style={styles.dropdownText}>Donation</Text>
              </TouchableOpacity>
            )} */}

              {/* {role === 'sub_admin' && ( */}
          <TouchableOpacity style={styles.dropdownItem} onPress={() => handleOption('/admin/scanCoupon')}>
            <Ionicons name="wallet-outline" size={18} color="#000" style={styles.dropdownIcon} />
            <Text style={styles.dropdownText}>Scan QR</Text>
          </TouchableOpacity>
        {/* )} */}

          {/* {role === 'admin' && (
        <TouchableOpacity style={styles.dropdownItem} onPress={() => handleOption('../upcoming_festival/festival')}>
          <Ionicons name="wallet-outline" size={18} color="#000" style={styles.dropdownIcon} />
          <Text style={styles.dropdownText}>Daily Darshan</Text>
        </TouchableOpacity>
      )} */}
            {/* <TouchableOpacity style={styles.dropdownItem} onPress={() => handleOption('../history')}>
              <Ionicons name="camera-outline" size={18} color="#000" style={styles.dropdownIcon} />
              <Text style={styles.dropdownText}>Live Darshan</Text>
            </TouchableOpacity> */}
          </View>
        )}
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    width: width * 0.25,
    height: width * 0.15,
    resizeMode: 'contain',
  },
  rightActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginHorizontal: 4,
    padding: 6,
  },
  couponButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  couponIcon: {
    width: 20,
    height: 24,
    marginRight: 4,
  },
  couponText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 12,
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 95,
    right: 5,
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    zIndex: 100,
  },
  dropdownText: {
    paddingVertical: 6,
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
  },
  dropdownIcon: {
    marginRight: 7,
  },
  menuButton: {
    marginLeft: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    height: 4,
    backgroundColor: 'white',
    width: 24,
    borderRadius: 2,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'white',
    marginHorizontal: 4,
  },
});

export default Header;
