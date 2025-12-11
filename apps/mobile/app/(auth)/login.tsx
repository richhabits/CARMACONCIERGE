import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient } from '../../services/api';
import { Colors } from '../../constants/Colors';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      await AsyncStorage.setItem('authToken', response.data.accessToken);
      router.replace('/(tabs)/home');
    } catch (error: any) {
      Alert.alert('Login Failed', error.response?.data?.message || 'Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* GO FASTER Racing Stripes */}
      <View style={styles.stripesContainer}>
        <View style={[styles.stripe, { backgroundColor: Colors.brand.black, width: '40%' }]} />
        <View style={[styles.stripe, { backgroundColor: Colors.brand.red, width: '20%' }]} />
        <View style={[styles.stripe, { backgroundColor: Colors.brand.blue, width: '20%' }]} />
        <View style={[styles.stripe, { backgroundColor: Colors.brand.black, width: '20%' }]} />
      </View>
      
      <View style={styles.logoContainer}>
        <Text style={styles.ukBadge}>🇬🇧 UK</Text>
      </View>
      <Text style={styles.title}>CARMACONCIERGE</Text>
      <Text style={styles.subtitle}>Sign in to your account</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign In</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
        <Text style={styles.link}>Don't have an account? Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: Colors.surface,
  },
  stripesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 6,
    flexDirection: 'row',
    marginBottom: 20,
  },
  stripe: {
    height: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  ukBadge: {
    fontSize: 24,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: Colors.brand.black,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: Colors.text.secondary,
  },
  input: {
    borderWidth: 2,
    borderColor: Colors.brand.blue,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: Colors.surface,
  },
  button: {
    backgroundColor: Colors.brand.black,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 2,
    borderColor: Colors.brand.red,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  link: {
    textAlign: 'center',
    marginTop: 20,
    color: Colors.brand.blue,
    fontSize: 14,
    fontWeight: '600',
  },
});