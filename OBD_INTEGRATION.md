# OBD-II Diagnostic Integration

## Overview

Full integration with OBD-II (On-Board Diagnostics) systems to pull real-time vehicle diagnostic data and trouble codes directly from the vehicle's ECU.

## Supported Methods

### 1. OBD API Integration
- Connect to third-party OBD data providers
- Automatic API services (Automatic, CarMD)
- No physical adapter required
- Limited to vehicles with connected services

### 2. Bluetooth OBD Adapters
- ELM327 compatible adapters
- Bluetooth Classic or BLE
- Works with most modern vehicles (1996+)
- Real-time data reading

### 3. WiFi OBD Adapters
- ELM327 WiFi adapters
- TCP/IP connection
- Lower latency than Bluetooth
- Works on Android and iOS

## Diagnostic Trouble Codes (DTCs)

### Code Format
- **P0xxx** - Generic Powertrain
- **P1xxx** - Manufacturer-specific Powertrain
- **P2xxx** - Generic Powertrain
- **P3xxx** - Manufacturer-specific Powertrain
- **B0xxx** - Body
- **C0xxx** - Chassis
- **U0xxx** - Network

### Common Codes Supported
- P0300 - Multiple Cylinder Misfire
- P0420 - Catalyst Efficiency
- P0442 - EVAP System Leak
- P0100 - MAF Sensor
- P0200 - Injector Circuit
- And 50+ more...

## Real-Time Data (PIDs)

### Supported Parameters
- **Engine RPM** (PID 0C) - Current engine speed
- **Vehicle Speed** (PID 0D) - Current speed
- **Coolant Temperature** (PID 05) - Engine coolant temp
- **Throttle Position** (PID 11) - Throttle percentage
- **Engine Load** (PID 04) - Engine load percentage
- **Fuel Level** (PID 2F) - Fuel tank level
- **Battery Voltage** (PID 42) - Battery voltage
- **MAF Air Flow** (PID 10) - Mass airflow
- And 20+ more parameters...

## API Endpoints

### Backend
- `GET /api/v1/obd/codes/:vehicleId` - Read DTCs
- `GET /api/v1/obd/realtime/:vehicleId` - Get real-time data
- `POST /api/v1/obd/clear/:vehicleId` - Clear codes
- `GET /api/v1/obd/dtc/:code` - Get DTC description
- `GET /api/v1/obd/pids` - List supported PIDs

### Mobile Integration
- Scan for Bluetooth/WiFi adapters
- Connect to adapter
- Read codes in real-time
- Monitor vehicle parameters
- Clear codes

## Usage Examples

### Read Diagnostic Codes
```typescript
// Via API (recommended for most users)
const codes = await apiClient.get(`/obd/codes/${vehicleId}?adapter=api`);

// Via Bluetooth adapter
const codes = await apiClient.get(`/obd/codes/${vehicleId}?adapter=bluetooth`);

// Via WiFi adapter
const codes = await apiClient.get(`/obd/codes/${vehicleId}?adapter=wifi`);
```

### Get Real-Time Data
```typescript
// Get all parameters
const data = await apiClient.get(`/obd/realtime/${vehicleId}`);

// Get specific parameters
const data = await apiClient.get(
  `/obd/realtime/${vehicleId}?pids=ENGINE_RPM,VEHICLE_SPEED,FUEL_LEVEL`
);
```

### Clear Codes
```typescript
const result = await apiClient.post(`/obd/clear/${vehicleId}`);
```

## Integration with AI Mechanic

OBD codes automatically feed into the AI Mechanic system:
1. Read DTCs from vehicle
2. Cross-reference with vehicle make/model
3. AI analyzes common problems
4. Provides diagnostic report
5. Estimates cost and time

## Supported OBD Adapters

### Recommended
- **ELM327** - Most compatible
- **Veepeak OBDCheck** - Reliable
- **Carista** - Premium features
- **Foseal** - Budget option

### Compatible Protocols
- ISO 9141-2 (Asian vehicles)
- ISO 14230-4 (KWP2000)
- ISO 15765-4 (CAN)
- SAE J1850 (GM, Ford)

## Mobile App Features

1. **Adapter Discovery**
   - Scan for nearby Bluetooth adapters
   - List WiFi adapters
   - Test connection

2. **Real-Time Monitoring**
   - Dashboard with key metrics
   - Graphs for historical data
   - Alerts for abnormal readings

3. **Code Reading**
   - Read all DTCs
   - View detailed descriptions
   - Get AI-powered diagnostics
   - Clear codes with confirmation

4. **Data Logging**
   - Save diagnostic snapshots
   - Track vehicle health over time
   - Export reports

## Data Storage

All OBD readings are stored in the database:
- Timestamp
- Vehicle ID
- DTC codes (if any)
- Real-time parameter values
- Historical trends

## Privacy & Security

- OBD data is encrypted in transit
- Stored securely in database
- Only accessible by vehicle owner
- GDPR compliant

## Future Enhancements

1. **Advanced Diagnostics**
   - Freeze frame data
   - Pending codes
   - Permanent codes
   - Readiness monitors

2. **Proactive Monitoring**
   - Predictive maintenance alerts
   - Component failure prediction
   - Fuel efficiency tracking

3. **Garage Integration**
   - Share OBD data with mechanics
   - Remote diagnostics
   - Pre-service inspection