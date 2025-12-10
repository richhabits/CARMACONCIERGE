import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import type { Vehicle } from '@carmaconcierge/shared';

export default function VehiclesScreen() {
  const vehicles: Vehicle[] = [];

  return (
    <View style={styles.container}>
      {vehicles.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No vehicles registered yet</Text>
          <Text style={styles.emptySubtext}>
            Add your first vehicle to get started
          </Text>
        </View>
      ) : (
        <FlatList
          data={vehicles}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.vehicleCard}>
              <Text style={styles.registration}>{item.registration}</Text>
              <Text style={styles.vehicleInfo}>
                {item.make} {item.model} ({item.year})
              </Text>
            </View>
          )}
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
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
  },
  vehicleCard: {
    backgroundColor: '#fff',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  registration: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  vehicleInfo: {
    fontSize: 14,
    color: '#666',
  },
});
