import { FirebaseApp, initializeApp, getApps } from 'firebase/app';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

let firebaseApp: FirebaseApp | undefined;

if (!getApps().length) {
  firebaseApp = initializeApp(firebaseConfig);
}

export default firebaseApp;
