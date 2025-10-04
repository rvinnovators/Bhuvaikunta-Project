import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function useAuthGuard() {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        router.replace('../login/login');
      }
    };
    checkAuth();
  }, []);
}