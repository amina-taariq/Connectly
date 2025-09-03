// firebaseConfig.ts
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

// Export Firebase services for React Native
export const db = firestore();
export { auth, storage };

// For compatibility with existing code
export default {
  auth: () => auth(),
  firestore: () => firestore(),
  storage: () => storage(),
};
