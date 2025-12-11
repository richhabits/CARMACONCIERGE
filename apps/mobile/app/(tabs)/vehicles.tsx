import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { apiClient } from '../../services/api';
import { Vehicle } from '@carmaconcierge/shared';

export default function VehiclesScreen() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const response = await apiClient.get('/vehicles');
      setVehicles(response.data);
    } catch (error: any) {
      Alert.alert('Error', 'Failed to load vehicles');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={vehicles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.vehicleCard}>
            <View style={styles.vehicleInfo}>
              <Text style={styles.vehicleMake}>{item.make} {item.model}</Text>
              <Text style={styles.vehicleYear}>{item.year}</Text>
              <Text style={styles.vehicleReg}>{item.registrationNumber}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.emptyText}>No vehicles yet</Text>
            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="add-circle" size={24} color="#007AFF" />
              <Text style={styles.addButtonText}>Add Vehicle</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vehicleCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleMake: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  vehicleYear: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  vehicleReg: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  addButtonText: {
    marginLeft: 8,
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
});