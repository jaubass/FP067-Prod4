// Libraries imports
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getMessaging, onMessage, getToken } from 'firebase/messaging';
import { Alert, Platform } from 'react-native';

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
console.log({ platformOs });

if (platformOs === 'default') {
  console.log("I AM IN WEB");
  // Only works on web
  // https://www.reddit.com/r/reactnative/comments/1460co7/typeerror_cannot_read_property_addeventlistener/
  // https://firebase.google.com/docs/cloud-messaging/js/receive
  const messaging = getMessaging(app);

  getToken(messaging,
    { vapidKey: 'BLq2CCrnuwb1a7IhnicM1gNGu0d3XzFdwYQjim_afaAVNky1' })
    .then((currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // ...
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });

  // try {
  // const token = await getToken(messaging,
  //   {vapidKey: "BEJsAudqcR5WG9bofwMi17KdSLJjMn9XK-LKNqgPhP2bsJBKG2SLJdXphvyU9cQjktVWzX-KVsNDgCfxN4_7gps"});
  // console.log({token});
  // } catch (er) {
  //   console.info(er);
  // }

  onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    alert("Message received", JSON.stringify(payload));
  });
  // vapid: BLq2CCrnuwb1a7IhnicM1gNGu0d3XzFdwYQjim_afaAVNky1
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
