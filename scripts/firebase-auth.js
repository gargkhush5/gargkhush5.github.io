/**
 * Firebase Auth Helpers
 * Provides authentication utilities and password reset functionality.
 */

import { initializeApp, getApps, getApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import {
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB82Pe71bNVmQFhThlZa_YWsrB7QwEAQaE",
  authDomain: "khush-portfolio-23e8e.firebaseapp.com",
  projectId: "khush-portfolio-23e8e",
  storageBucket: "khush-portfolio-23e8e.firebasestorage.app",
  messagingSenderId: "114583728382",
  appId: "1:114583728382:web:ccc2c215f028b29d2275af"
};

// Initialize Firebase (avoid duplicate apps)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);

/**
 * Send password reset email
 * @param {string} email
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function firebasePasswordReset(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    const code = error?.code || error?.message || 'unknown-error';
    console.error('❌ Password reset error:', error);
    return { success: false, error: code };
  }
}

/**
 * Sign in with email/password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{success: boolean, user?: object, error?: string}>}
 */
export async function firebaseSignIn(email, password) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: result.user };
  } catch (error) {
    const code = error?.code || error?.message || 'unknown-error';
    console.error('❌ Sign-in error:', error);
    return { success: false, error: code };
  }
}

/**
 * Sign out the current user
 * @returns {Promise<boolean>}
 */
export async function firebaseSignOut() {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    console.error('❌ Sign-out error:', error);
    return false;
  }
}

/**
 * Get current Firebase user
 * @returns {object|null}
 */
export function getCurrentFirebaseUser() {
  return auth.currentUser;
}

/**
 * Check if a Firebase user is authenticated
 * @returns {boolean}
 */
export function isFirebaseAuthenticated() {
  return !!auth.currentUser;
}

/**
 * Subscribe to auth changes (optional helper)
 * @param {(user: object|null) => void} callback
 * @returns {Function}
 */
export function onFirebaseAuthStateChanged(callback) {
  return onAuthStateChanged(auth, callback);
}
