import { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { apiClient } from '../../services/api';
import { Colors } from '../../constants/Colors';

export default function VehicleLookupScreen() {
  const [registration, setRegistration] = useState('');
  const [loading, setLoading] = useState(false);
  const [vehicleData, setVehicleData] = useState<any>(null);

  const handleLookup = async () => {
    if (!registration.trim()) {
      Alert.alert('Error', 'Please enter a registration number');
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.get(`/vehicles/uk/lookup?registration=${registration.trim()}`);
      setVehicleData(response.data);
      
      if (!response.data || Object.keys(response.data).length === 0) {
        Alert.alert('Not Found', 'Vehicle details not found. Please check the registration number.');
      }
    } catch (error: any) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to lookup vehicle');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>UK Vehicle Lookup</Text>
        <Text style={styles.subtitle}>Enter registration to get vehicle details</Text>
      </View>

      <View style={styles.inputSection}>
        <View style={styles.inputContainer}>
          <Ionicons name="car" size={24} color={Colors.brand.blue} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            value={registration}
            onChangeText={setRegistration}
            placeholder="Enter registration (e.g. AB12 CDE)"
            placeholderTextColor={Colors.text.light}
            autoCapitalize="characters"
            maxLength={10}
          />
        </View>

        <TouchableOpacity
          style={[styles.lookupButton, loading && styles.buttonDisabled]}
          onPress={handleLookup}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="search" size={20} color="#fff" />
              <Text style={styles.buttonText}>Lookup</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      {vehicleData && Object.keys(vehicleData).length > 0 && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Vehicle Details</Text>
          
          {vehicleData.make && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Make:</Text>
              <Text style={styles.detailValue}>{vehicleData.make}</Text>
            </View>
          )}

          {vehicleData.model && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Model:</Text>
              <Text style={styles.detailValue}>{vehicleData.model}</Text>
            </View>
          )}

          {vehicleData.year && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Year:</Text>
              <Text style={styles.detailValue}>{vehicleData.year}</Text>
            </View>
          )}

          {vehicleData.fuelType && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Fuel Type:</Text>
              <Text style={styles.detailValue}>{vehicleData.fuelType}</Text>
            </View>
          )}

          {vehicleData.color && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Color:</Text>
              <Text style={styles.detailValue}>{vehicleData.color}</Text>
            </View>
          )}

          {vehicleData.motStatus && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>MOT Status:</Text>
              <Text style={[styles.detailValue, { color: Colors.brand.red }]}>
                {vehicleData.motStatus}
              </Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              // Navigate to add vehicle with pre-filled data
              Alert.alert('Add Vehicle', 'Would you like to add this vehicle to your account?');
            }}
          >
            <Ionicons name="add-circle" size={20} color={Colors.brand.blue} />
            <Text style={styles.addButtonText}>Add to My Vehicles</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 20,
    backgroundColor: Colors.surface,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.brand.black,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text.secondary,
  },
  inputSection: {
    padding: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.brand.blue,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: Colors.surface,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 15,
    color: Colors.text.primary,
    letterSpacing: 2,
  },
  lookupButton: {
    flexDirection: 'row',
    backgroundColor: Colors.brand.black,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.brand.red,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  resultContainer: {
    margin: 15,
    padding: 20,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.brand.blue,
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.brand.black,
    marginBottom: 15,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.text.light,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.secondary,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.brand.black,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    padding: 15,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.brand.blue,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.brand.blue,
    marginLeft: 8,
  },
});
