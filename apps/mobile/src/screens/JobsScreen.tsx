import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { jobsAPI } from '../services/api';
import { Job } from '@carmaconcierge/shared';

export default function JobsScreen() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const response = await jobsAPI.getJobs();
      setJobs(response.data.data);
    } catch (error) {
      console.error('Failed to load jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED': return '#34C759';
      case 'IN_PROGRESS': return '#007AFF';
      case 'SCHEDULED': return '#FF9500';
      case 'PENDING': return '#8E8E93';
      case 'CANCELLED': return '#FF3B30';
      default: return '#8E8E93';
    }
  };

  const renderJob = ({ item }: { item: Job }) => (
    <TouchableOpacity style={styles.jobCard}>
      <View style={styles.jobHeader}>
        <Text style={styles.jobType}>{item.type}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      <Text style={styles.jobDescription}>{item.description}</Text>
      {item.scheduledDate && (
        <Text style={styles.jobDate}>
          Scheduled: {new Date(item.scheduledDate).toLocaleDateString()}
        </Text>
      )}
      {item.cost && <Text style={styles.jobCost}>Cost: £{item.cost.toFixed(2)}</Text>}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Jobs</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ New Job</Text>
        </TouchableOpacity>
      </View>
      
      {loading ? (
        <Text style={styles.emptyText}>Loading...</Text>
      ) : jobs.length === 0 ? (
        <Text style={styles.emptyText}>No jobs yet. Create your first job!</Text>
      ) : (
        <FlatList
          data={jobs}
          renderItem={renderJob}
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
  jobCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  jobType: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  jobDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  jobDate: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 5,
  },
  jobCost: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34C759',
    marginTop: 5,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  },
});
