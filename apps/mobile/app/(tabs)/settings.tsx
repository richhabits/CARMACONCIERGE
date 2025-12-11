import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeFeatures } from '../../services/native-features';
import { Colors } from '../../constants/Colors';

export default function SettingsScreen() {
  const [biometricsEnabled, setBiometricsEnabled] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [deviceCapabilities, setDeviceCapabilities] = useState<any>(null);

  useEffect(() => {
    loadDeviceCapabilities();
  }, []);

  const loadDeviceCapabilities = async () => {
    const caps = await NativeFeatures.getDeviceCapabilities();
    setDeviceCapabilities(caps);
  };

  const toggleBiometrics = async (value: boolean) => {
    if (value) {
      const result = await NativeFeatures.authenticateWithBiometrics();
      if (result.success) {
        setBiometricsEnabled(true);
        await NativeFeatures.triggerHaptic('success');
        Alert.alert('Success', 'Biometric authentication enabled');
      } else {
        Alert.alert('Error', result.error || 'Biometric authentication failed');
      }
    } else {
      setBiometricsEnabled(false);
    }
  };

  const testHaptics = async () => {
    await NativeFeatures.triggerHaptic('success');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Customize your experience</Text>
      </View>

      {/* Device Info */}
      {deviceCapabilities && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Device Information</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Platform:</Text>
            <Text style={styles.infoValue}>{deviceCapabilities.platform}</Text>
          </View>
          {deviceCapabilities.isFoldable && (
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Device Type:</Text>
              <Text style={styles.infoValue}>Foldable ({deviceCapabilities.foldState})</Text>
            </View>
          )}
          {deviceCapabilities.supportedBiometrics.length > 0 && (
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Biometrics:</Text>
              <Text style={styles.infoValue}>
                {deviceCapabilities.supportedBiometrics.join(', ')}
              </Text>
            </View>
          )}
        </View>
      )}

      {/* Security Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security</Text>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Biometric Login</Text>
            <Text style={styles.settingDescription}>Use Face ID or fingerprint</Text>
          </View>
          <Switch
            value={biometricsEnabled}
            onValueChange={toggleBiometrics}
            trackColor={{ false: '#ccc', true: Colors.brand.blue }}
            thumbColor={biometricsEnabled ? Colors.brand.red : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Notifications */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={styles.settingLabel}>Push Notifications</Text>
            <Text style={styles.settingDescription}>MOT, service, and quote alerts</Text>
          </View>
          <Switch
            value={pushEnabled}
            onValueChange={setPushEnabled}
            trackColor={{ false: '#ccc', true: Colors.brand.blue }}
            thumbColor={pushEnabled ? Colors.brand.red : '#f4f3f4'}
          />
        </View>
      </View>

      {/* Features */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        
        <TouchableOpacity style={styles.featureRow}>
          <Ionicons name="calendar" size={24} color={Colors.brand.blue} />
          <Text style={styles.featureLabel}>Calendar Integration</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.featureRow} onPress={testHaptics}>
          <Ionicons name="phone-portrait" size={24} color={Colors.brand.blue} />
          <Text style={styles.featureLabel}>Test Haptic Feedback</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.featureRow}>
          <Ionicons name="qr-code" size={24} color={Colors.brand.blue} />
          <Text style={styles.featureLabel}>QR/Barcode Scanner</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.featureRow}>
          <Ionicons name="location" size={24} color={Colors.brand.blue} />
          <Text style={styles.featureLabel}>Location Services</Text>
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
  section: {
    marginBottom: 20,
    backgroundColor: Colors.surface,
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.brand.black,
    marginBottom: 15,
  },
  infoCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.brand.black,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.brand.black,
  },
  settingDescription: {
    fontSize: 12,
    color: Colors.text.secondary,
    marginTop: 2,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  featureLabel: {
    fontSize: 16,
    marginLeft: 15,
    color: Colors.brand.black,
  },
});
