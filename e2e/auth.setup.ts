import playwrightFirebasePlugin from '@nearform/playwright-firebase';
import { Page, test as base } from '@playwright/test';
import { ServiceAccount } from 'firebase-admin';
import { FirebaseOptions } from 'firebase/app';

const serviceAccount: ServiceAccount = {
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  privateKey: process.env.VITE_FIREBASE_SA_PRIVATE_KEY,
  clientEmail: process.env.VITE_FIREBASE_SA_CLIENT_EMAIL,
};
const uid: string = process.env.VITE_FIREBASE_USER_ID;
const options: FirebaseOptions = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID,
};

export const test = playwrightFirebasePlugin(
  serviceAccount,
  options,
  uid,
  base,
);

export interface Auth {
  login(page: Page): Promise<void>;
  logout(page: Page): Promise<void>;
}
