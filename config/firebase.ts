//config/firebase.tsx
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';

export const initializeFirebase = async () => {
  try {
    console.log('Apps before init:', firebase.apps);
    const firebaseConfig = {
      apiKey: "AIzaSyB5PAcGIcaOrYMD7j44EkAHcVxzs6WZSd0",
      authDomain: "vitalinker-01.firebaseapp.com",
      databaseURL: "https://vitalinker-01.firebaseio.com",
      projectId: "vitalinker-01",
      storageBucket: "vitalinker-01.appspot.com",
      messagingSenderId: "1042213474660",
      appId: "1:1042213474660:web:a07ccce474b912608bea71",
      measurementId: "G-WKZ9E9GMRW"
    };

    if (!firebase.apps.length) {
      await firebase.initializeApp(firebaseConfig);
      console.log('Firebase initialized successfully');
    } else {
      console.log('Firebase already initialized.');
    }
    console.log('Apps after init:', firebase.apps);
  } catch (error) {
    console.error('Failed to initialize Firebase:', error);
    throw error; // Rethrow the error so it can be caught and handled upstream
  }
};

export const setupFirebaseMessaging = async () => {
  try {
    // Get the FCM token for this device
    const token = await messaging().getToken();
    console.log('Firebase messaging token:', token);

    // Listen to whether the token changes
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      console.log('FCM Message Data:', remoteMessage.data);
      
      // If it's a data message, you can display a custom notification here using notifee
    });

    const unsubscribeOnNotificationOpenedApp = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Notification caused app to open from background state:', remoteMessage);
    });

    // Check whether the app was opened by a notification
    const initialNotification = await messaging().getInitialNotification();
    if (initialNotification) {
      console.log('App was opened by a notification:', initialNotification);
    }
    
    // Clean up functions
    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpenedApp();
    };
  } catch (error) {
    console.error('Failed to setup Firebase messaging:', error);
    throw error; 
  }
};
