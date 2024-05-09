import { useState, useEffect } from 'react';
import {
  User,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';

import firebaseApp from '.';

export interface CurrentUser {
  uid: string;
  email: string | null;
}

const formatAuthUser = (user: User) => ({
  uid: user.uid,
  email: user.email,
});

const useFirebaseAuth = () => {
  const [authUser, setAuthUser] = useState<CurrentUser | null>(null);
  const [loading, setLoading] = useState(true);

  const authStateChanged = async (authState: User | null) => {
    if (!authState) {
      setAuthUser(null);
      sessionStorage.removeItem('token');
      setLoading(false);
      return;
    }

    setLoading(true);
    var formattedUser = formatAuthUser(authState);
    setAuthUser(formattedUser);
    sessionStorage.setItem('token', await authState.getIdToken());
    setLoading(false);
  };

  const signUp = async (email: string, password: string) => {
    const auth = getAuth(firebaseApp);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = async (email: string, password: string) => {
    const auth = getAuth(firebaseApp);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signOut = async () => {
    const auth = getAuth(firebaseApp);
    await firebaseSignOut(auth);
    setAuthUser(null);
    sessionStorage.removeItem('token');
    setLoading(false);
  };

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = auth.onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    loading,
    signUp,
    signIn,
    signOut,
  };
};

export default useFirebaseAuth;
