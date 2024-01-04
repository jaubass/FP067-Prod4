// Libraries imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getMessaging } from 'firebase/messaging';
import { Platform } from 'react-native';

// Application imports
import { Home } from './app/views/Home';
import { Detail } from './app/views/Detail';
import { Player } from './app/views/Player';
import { app } from './app/config/db'; // Firebase

// Firebase messages
const platformOs = Platform.select({
  ios: 'ios',
  android: 'android',
  default: 'default'
});
console.log({platformOs});

if (platformOs === 'default') {
  console.log("I AM IN WEB");
  // Only works on web
  // https://www.reddit.com/r/reactnative/comments/1460co7/typeerror_cannot_read_property_addeventlistener/
  // https://firebase.google.com/docs/cloud-messaging/js/receive
  const messaging = getMessaging(app);
}





const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Detail" component={Detail}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Player" component={Player}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
