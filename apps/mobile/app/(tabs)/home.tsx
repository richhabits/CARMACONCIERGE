import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* GO FASTER Racing Stripes */}
      <View style={styles.stripesContainer}>
        <View style={[styles.stripe, { backgroundColor: Colors.brand.black, width: '40%' }]} />
        <View style={[styles.stripe, { backgroundColor: Colors.brand.red, width: '20%' }]} />
        <View style={[styles.stripe, { backgroundColor: Colors.brand.blue, width: '20%' }]} />
        <View style={[styles.stripe, { backgroundColor: Colors.brand.black, width: '20%' }]} />
      </View>
      
      <View style={styles.header}>
        <View style={styles.ukFlagContainer}>
          <Text style={styles.ukFlag}>🇬🇧</Text>
        </View>
        <Text style={styles.title}>Welcome to CARMACONCIERGE</Text>
        <Text style={styles.subtitle}>UK's Premier Vehicle Management</Text>
      </View>

      <View style={styles.cards}>
        <TouchableOpacity
          style={[styles.card, { borderLeftColor: Colors.brand.blue, borderLeftWidth: 4 }]}
          onPress={() => router.push('/(tabs)/vehicles')}
        >
          <Ionicons name="car" size={40} color={Colors.brand.blue} />
          <Text style={styles.cardTitle}>Vehicles</Text>
          <Text style={styles.cardText}>Manage your vehicles</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { borderLeftColor: Colors.brand.red, borderLeftWidth: 4 }]}
          onPress={() => router.push('/(tabs)/jobs')}
        >
          <Ionicons name="construct" size={40} color={Colors.brand.red} />
          <Text style={styles.cardTitle}>Jobs</Text>
          <Text style={styles.cardText}>View your jobs</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, { borderLeftColor: Colors.brand.black, borderLeftWidth: 4 }]}>
          <Ionicons name="chatbubbles" size={40} color={Colors.brand.black} />
          <Text style={styles.cardTitle}>Messages</Text>
          <Text style={styles.cardText}>Chat with suppliers</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, { borderLeftColor: Colors.brand.red, borderLeftWidth: 4 }]}>
          <Ionicons name="card" size={40} color={Colors.brand.red} />
          <Text style={styles.cardTitle}>Payments</Text>
          <Text style={styles.cardText}>Payment history</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  stripesContainer: {
    height: 6,
    flexDirection: 'row',
    marginBottom: 0,
  },
  stripe: {
    height: '100%',
  },
  header: {
    padding: 20,
    backgroundColor: Colors.surface,
    marginBottom: 20,
    alignItems: 'center',
  },
  ukFlagContainer: {
    marginBottom: 10,
  },
  ukFlag: {
    fontSize: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    color: Colors.brand.black,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.brand.blue,
    fontWeight: '600',
  },
  cards: {
    padding: 15,
    gap: 15,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: Colors.brand.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    color: Colors.brand.black,
  },
  cardText: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginLeft: 15,
    marginTop: 5,
  },
});