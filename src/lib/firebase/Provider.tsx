import { createContext, useContext, PropsWithChildren } from 'react';
import type { UserCredential } from 'firebase/auth';

import useFirebaseAuth, { CurrentUser } from './useFirebaseAuth';

interface AuthUserContext {
  authUser: CurrentUser | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signOut: () => Promise<void>;
}

const AuthUserContext = createContext<AuthUserContext>({
  authUser: null,
  loading: true,
  signUp: async (_email, _password) => ({} as UserCredential),
  signIn: async (_email, _password) => ({} as UserCredential),
  signOut: async () => {},
});

export const AuthUserProvider = ({ children }: PropsWithChildren) => {
  const auth = useFirebaseAuth();

  return <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>;
};

export const useAuth = () => useContext(AuthUserContext);
