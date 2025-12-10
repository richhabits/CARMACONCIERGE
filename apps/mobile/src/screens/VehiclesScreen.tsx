import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { vehiclesAPI } from '../services/api';
import { Vehicle } from '@carmaconcierge/shared';

export default function VehiclesScreen() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVehicles();
  }, []);

  const loadVehicles = async () => {
    try {
      const response = await vehiclesAPI.getVehicles();
      setVehicles(response.data.data);
    } catch (error) {
      console.error('Failed to load vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderVehicle = ({ item }: { item: Vehicle }) => (
    <TouchableOpacity style={styles.vehicleCard}>
      <Text style={styles.vehicleTitle}>
        {item.year} {item.make} {item.model}
      </Text>
      <Text style={styles.vehicleReg}>{item.registration}</Text>
      {item.mileage && <Text style={styles.vehicleInfo}>Mileage: {item.mileage}</Text>}
      {item.color && <Text style={styles.vehicleInfo}>Color: {item.color}</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Vehicles</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add Vehicle</Text>
        </TouchableOpacity>
      </View>
      
      {loading ? (
        <Text style={styles.emptyText}>Loading...</Text>
      ) : vehicles.length === 0 ? (
        <Text style={styles.emptyText}>No vehicles yet. Add your first vehicle!</Text>
      ) : (
        <FlatList
          data={vehicles}
          renderItem={renderVehicle}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  list: {
    padding: 20,
  },
  vehicleCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
  },
  vehicleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  vehicleReg: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 10,
  },
  vehicleInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  },
});
