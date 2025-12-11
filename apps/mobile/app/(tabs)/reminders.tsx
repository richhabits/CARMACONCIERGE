import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { apiClient } from '../../services/api';
import { NativeFeatures } from '../../services/native-features';
import { Colors } from '../../constants/Colors';

interface Reminder {
  id: string;
  type: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
  vehicle?: {
    make: string;
    model: string;
    registrationNumber: string;
  };
}

export default function RemindersScreen() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReminders();
  }, []);

  const loadReminders = async () => {
    try {
      const response = await apiClient.get('/reminders');
      setReminders(response.data);
    } catch (error) {
      console.error('Failed to load reminders:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCalendar = async (reminder: Reminder) => {
    const startDate = new Date(reminder.dueDate);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour

    const result = await NativeFeatures.addToCalendar(
      reminder.title,
      startDate,
      endDate,
      reminder.description,
    );

    if (result.success) {
      await NativeFeatures.triggerHaptic('success');
      Alert.alert('Success', 'Added to your calendar');
    } else {
      Alert.alert('Error', result.error || 'Failed to add to calendar');
    }
  };

  const markComplete = async (reminderId: string) {
    try {
      await apiClient.patch(`/reminders/${reminderId}/status`, { status: 'COMPLETED' });
      await NativeFeatures.triggerHaptic('success');
      await loadReminders();
    } catch (error) {
      Alert.alert('Error', 'Failed to mark as complete');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'URGENT':
        return Colors.brand.red;
      case 'HIGH':
        return '#FF9500';
      case 'MEDIUM':
        return Colors.brand.blue;
      default:
        return Colors.text.secondary;
    }
  };

  const getReminderIcon = (type: string) => {
    switch (type) {
      case 'MOT':
        return 'speedometer';
      case 'SERVICE':
        return 'construct';
      case 'INSURANCE':
        return 'shield-checkmark';
      case 'TAX':
        return 'receipt';
      default:
        return 'alarm';
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.brand.blue} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reminderCard}>
            <View style={styles.reminderHeader}>
              <View style={styles.reminderTypeContainer}>
                <Ionicons
                  name={getReminderIcon(item.type) as any}
                  size={24}
                  color={getPriorityColor(item.priority)}
                />
                <View style={styles.reminderInfo}>
                  <Text style={styles.reminderTitle}>{item.title}</Text>
                  {item.vehicle && (
                    <Text style={styles.vehicleInfo}>
                      {item.vehicle.make} {item.vehicle.model} ({item.vehicle.registrationNumber})
                    </Text>
                  )}
                </View>
              </View>
              <View
                style={[styles.priorityBadge, { backgroundColor: getPriorityColor(item.priority) }]}
              >
                <Text style={styles.priorityText}>{item.priority}</Text>
              </View>
            </View>

            <Text style={styles.reminderDescription}>{item.description}</Text>
            <Text style={styles.dueDate}>
              Due: {new Date(item.dueDate).toLocaleDateString('en-GB', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })}
            </Text>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => addToCalendar(item)}
              >
                <Ionicons name="calendar" size={16} color={Colors.brand.blue} />
                <Text style={styles.actionText}>Add to Calendar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.completeButton]}
                onPress={() => markComplete(item.id)}
              >
                <Ionicons name="checkmark-circle" size={16} color={Colors.brand.red} />
                <Text style={[styles.actionText, { color: Colors.brand.red }]}>Mark Complete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.center}>
            <Ionicons name="checkmark-done-circle" size={64} color={Colors.brand.blue} />
            <Text style={styles.emptyText}>No active reminders</Text>
            <Text style={styles.emptySubtext}>You're all caught up!</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  reminderCard: {
    backgroundColor: Colors.surface,
    marginHorizontal: 15,
    marginVertical: 8,
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.brand.blue,
  },
  reminderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  reminderTypeContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  reminderInfo: {
    marginLeft: 12,
    flex: 1,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.brand.black,
    marginBottom: 4,
  },
  vehicleInfo: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  reminderDescription: {
    fontSize: 14,
    color: Colors.text.primary,
    marginBottom: 8,
  },
  dueDate: {
    fontSize: 12,
    color: Colors.brand.blue,
    fontWeight: '600',
    marginBottom: 12,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.brand.blue,
    backgroundColor: Colors.surface,
  },
  completeButton: {
    borderColor: Colors.brand.red,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.brand.blue,
    marginLeft: 6,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.brand.black,
    marginTop: 20,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: 8,
  },
});
