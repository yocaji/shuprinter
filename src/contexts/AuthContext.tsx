import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { useEffect, useState } from 'react';
import { createContext, useContext } from 'react';
import { ReactNode } from 'react';
import type { User } from 'firebase/auth';

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<{
  currentUser: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
} | null>(null);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_SENDER_ID,
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => setCurrentUser(user));
  }, []);

  const login = async () => {
    const result = await signInWithPopup(auth, provider);
    setCurrentUser(result.user);
  };

  const logout = async () => {
    await signOut(auth);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser: currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const AuthContextConsumer = () => {
  return useContext(AuthContext);
};
