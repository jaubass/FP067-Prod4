// Libraries imports
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

// Application imports
import { Home } from './app/views/Home';
import { Detail } from './app/views/Detail';
import { Player } from './app/views/Player';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  const registerForPushNotificationsAsync = async () => {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (status !== 'granted') {
      const { status: askStatus } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (askStatus !== 'granted') {
        console.log('Permiso para notificaciones push denegado');
        return;
      }
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Expo Push Token:', token);

    // Aquí puedes enviar el token a tu servidor o utilizarlo según tus necesidades.
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Detail" component={Detail} options={{ headerShown: false }} />
        <Stack.Screen name="Player" component={Player} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
