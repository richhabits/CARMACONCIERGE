import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import VehiclesScreen from './src/screens/VehiclesScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ title: 'CARMACONCIERGE' }}
        />
        <Stack.Screen 
          name="Vehicles" 
          component={VehiclesScreen}
          options={{ title: 'My Vehicles' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
