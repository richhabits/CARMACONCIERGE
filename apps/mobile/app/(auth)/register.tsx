import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiClient } from '../../services/api';
import { Colors } from '../../constants/Colors';

export default function RegisterScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!formData.email || !formData.password || !formData.firstName || !formData.lastName) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      const response = await apiClient.post('/auth/register', {
        ...formData,
        role: 'CUSTOMER',
      });
      await AsyncStorage.setItem('authToken', response.data.accessToken);
      router.replace('/(tabs)/home');
    } catch (error: any) {
      Alert.alert('Registration Failed', error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
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
      <Text style={styles.title}>Create Account</Text>

      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={formData.firstName}
        onChangeText={(text) => setFormData({ ...formData, firstName: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={formData.lastName}
        onChangeText={(text) => setFormData({ ...formData, lastName: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({ ...formData, email: text })}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={formData.password}
        onChangeText={(text) => setFormData({ ...formData, password: text })}
        secureTextEntry
      />

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign Up</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.link}>Already have an account? Sign in</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.surface,
  },
  stripesContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 6,
    flexDirection: 'row',
    zIndex: 1,
  },
  stripe: {
    height: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
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
    marginBottom: 30,
    color: Colors.brand.black,
    letterSpacing: 1,
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