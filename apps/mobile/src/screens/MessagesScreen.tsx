import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { messagesAPI } from '../services/api';
import { Message } from '@carmaconcierge/shared';
import { useAuth } from '../context/AuthContext';

export default function MessagesScreen() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const response = await messagesAPI.getMessages();
      setMessages(response.data.data);
    } catch (error) {
      console.error('Failed to load messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isReceived = item.receiverId === user?.id;
    
    return (
      <TouchableOpacity style={styles.messageCard}>
        <View style={styles.messageHeader}>
          <Text style={styles.messageSender}>
            {isReceived ? 'From' : 'To'}: {isReceived ? item.senderId : item.receiverId}
          </Text>
          {!item.read && isReceived && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>New</Text>
            </View>
          )}
        </View>
        <Text style={styles.messageContent} numberOfLines={2}>
          {item.content}
        </Text>
        <Text style={styles.messageDate}>
          {new Date(item.createdAt).toLocaleString()}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
      </View>
      
      {loading ? (
        <Text style={styles.emptyText}>Loading...</Text>
      ) : messages.length === 0 ? (
        <Text style={styles.emptyText}>No messages yet.</Text>
      ) : (
        <FlatList
          data={messages}
          renderItem={renderMessage}
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
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  list: {
    padding: 20,
  },
  messageCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  messageSender: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  unreadBadge: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  unreadText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  messageContent: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  messageDate: {
    fontSize: 12,
    color: '#8E8E93',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#666',
  },
});
