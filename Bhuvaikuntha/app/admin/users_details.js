
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import useAuthGuard from '../../hooks/useAuthGuard';
import Header from './admin_header';
import CustomTabBar_admin from './admin_tab';


const { width } = Dimensions.get('window');

const UserEngagementScreen = () => {
    useAuthGuard()
    const { id } = useLocalSearchParams();
      const [name, setName] = useState('');
      const [phone, setPhone] = useState('');
      const [email, setEmail] = useState('');
      const [dob, setDob] = useState('');
      const [role, setRole] = useState('');
      const [siguped, setSignuped] = useState('');

      const [status, setStatus] = useState('Active');
 
    
        useEffect(() => {
        if (id) {
          fetch(`https://radhavallabha-backend-599500600776.asia-south1.run.app/api/${id}`)
            .then(res => res.json())
            .then(data => {
              if (data.user) {
                setName(data.user.name || '');
                setPhone(data.user.phone || '');
                setRole(data.user.role || 'user');
                setDob(data.user.dob);
                setStatus(data.user.status);
                setEmail(data.user.email);
                setSignuped(data.user.createdAt)
              }
              
            })
            .catch(err => {
              console.error('Error loading user:', err);
             
            });
        }
      }, [id]);

  return (
    <>
    <Header/>
    <ScrollView style={styles.container}>
      {/* User Info */}
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.phone}>{phone}</Text>
     
          <Text style={styles.email}>{email}</Text>
               <Text style={styles.phone}>DOB : {dob}</Text>
          <Text style={styles.phone}>Signup : {new Date(siguped).toLocaleString()}</Text>
          <Text style={styles.role}>{role}</Text>
        </View>
        <View style={styles.activeBadge}>
          <Text style={styles.activeText}>● {status}</Text>
          
        </View>
      </View>

      {/* Engagement Summary */}
      <Text style={styles.sectionTitle}>Engagement Summary</Text>
      <View style={styles.summaryContainer}>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Videos Watched</Text>
          <Text style={styles.summaryValue}>5 of 12</Text>
        </View>
        <View style={styles.summaryBox}>
          <Text style={styles.summaryLabel}>Quizzes Taken</Text>
          <Text style={styles.summaryValue}>3 attempts</Text>

        </View>
        <View style={[styles.summaryBox, { width: '100%' }]}>
          <Text style={styles.summaryLabel}>Prasad Coupons Used</Text>
          <Text style={styles.summaryValue}>2</Text>
        </View>
      </View>

      {/* Activity Feed */}
      <Text style={styles.sectionTitle}>Detailed Activity Feed</Text>
      <View style={styles.activityBox}>
        <Text style={styles.activityDate}>July 3, 2025</Text>
        <Text style={styles.activityItem}>• Watched: ‘Gita Chapter 2.13’</Text>
        <Text style={styles.activityItem}>• Quiz Attempted: 80%</Text>
      </View>
      <View style={styles.activityBox}>
        <Text style={styles.activityDate}>June 30, 2025</Text>
        <Text style={styles.activityItem}>• Prasad Collected (Janmashtami)</Text>
      </View>
    </ScrollView>
    <CustomTabBar_admin/>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#111',
    padding: 16,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 24,
    alignItems: 'center',
  },
  name: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  phone: {
    color: '#ccc',
    marginTop: 4,
  },
  email: {
    color: '#ccc',
  },
    role: {
    color: 'red',
  },
  activeBadge: {
    backgroundColor: '#1c1c1c',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  activeText: {
    color: '#00c851',
    fontWeight: 'bold',
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  summaryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 16,
  },
  summaryBox: {
    backgroundColor: '#1d1d1d',
    padding: 12,
    borderRadius: 10,
    width: width / 2 - 24,
  },
  summaryLabel: {
    color: '#bbb',
    fontSize: 14,
  },
  summaryValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 4,
  },
  activityBox: {
    backgroundColor: '#1d1d1d',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  activityDate: {
    color: '#ccc',
    marginBottom: 4,
    fontWeight: '600',
  },
  activityItem: {
    color: '#fff',
    marginLeft: 8,
    marginBottom: 2,
  },
});

export default UserEngagementScreen;
