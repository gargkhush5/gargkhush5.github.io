/**
 * Firebase Firestore Integration
 * Handles photo metadata storage (names/captions) in Firestore Database
 */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getFirestore, doc, setDoc, getDoc, collection } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB82Pe71bNVmQFhThlZa_YWsrB7QwEAQaE",
  authDomain: "khush-portfolio-23e8e.firebaseapp.com",
  projectId: "khush-portfolio-23e8e",
  storageBucket: "khush-portfolio-23e8e.firebasestorage.app",
  messagingSenderId: "114583728382",
  appId: "1:114583728382:web:ccc2c215f028b29d2275af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

/**
 * Save photo metadata to Firestore
 * @param {Array} photosMetadata - Array of photo objects with filename and caption
 * @returns {Promise<boolean>} - Success status
 */
export async function savePhotosMetadata(photosMetadata) {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.warn('⚠️ User not authenticated, saving to localStorage only');
      localStorage.setItem('photosMetadata', JSON.stringify(photosMetadata));
      return true;
    }

    console.log('💾 Saving photo metadata to Firestore...');
    
    // Save to Firestore
    const photosRef = doc(db, 'users', user.uid, 'photos', 'metadata');
    await setDoc(photosRef, {
      photos: photosMetadata,
      lastUpdated: new Date().toISOString()
    });
    
    // Also cache in localStorage for offline access
    localStorage.setItem('photosMetadata', JSON.stringify(photosMetadata));
    
    console.log('✅ Photo metadata saved successfully');
    return true;
    
  } catch (error) {
    console.error('❌ Error saving photo metadata:', error);
    // Fallback to localStorage
    localStorage.setItem('photosMetadata', JSON.stringify(photosMetadata));
    throw error;
  }
}

/**
 * Get photo metadata from Firestore
 * @returns {Promise<Array>} - Array of photo metadata
 */
export async function getPhotosMetadata() {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.warn('⚠️ User not authenticated, loading from localStorage');
      const cached = localStorage.getItem('photosMetadata');
      return cached ? JSON.parse(cached) : [];
    }

    console.log('📥 Loading photo metadata from Firestore...');
    
    const photosRef = doc(db, 'users', user.uid, 'photos', 'metadata');
    const docSnap = await getDoc(photosRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      const metadata = data.photos || [];
      
      // Cache in localStorage
      localStorage.setItem('photosMetadata', JSON.stringify(metadata));
      
      console.log('✅ Photo metadata loaded from Firestore:', metadata.length, 'photos');
      return metadata;
    } else {
      console.log('ℹ️ No photo metadata found in Firestore, checking localStorage');
      const cached = localStorage.getItem('photosMetadata');
      return cached ? JSON.parse(cached) : [];
    }
    
  } catch (error) {
    console.error('❌ Error loading photo metadata:', error);
    // Fallback to localStorage
    const cached = localStorage.getItem('photosMetadata');
    return cached ? JSON.parse(cached) : [];
  }
}

/**
 * Save gallery settings to Firestore
 * @param {Object} settings - Gallery title and description
 * @returns {Promise<boolean>} - Success status
 */
export async function saveGallerySettings(settings) {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.warn('⚠️ User not authenticated, saving to localStorage only');
      localStorage.setItem('gallerySettings', JSON.stringify(settings));
      return true;
    }

    console.log('💾 Saving gallery settings to Firestore...');
    
    const settingsRef = doc(db, 'users', user.uid, 'gallerySettings', 'config');
    await setDoc(settingsRef, {
      ...settings,
      lastUpdated: new Date().toISOString()
    });
    
    // Also cache in localStorage
    localStorage.setItem('gallerySettings', JSON.stringify(settings));
    
    console.log('✅ Gallery settings saved successfully');
    return true;
    
  } catch (error) {
    console.error('❌ Error saving gallery settings:', error);
    localStorage.setItem('gallerySettings', JSON.stringify(settings));
    throw error;
  }
}

/**
 * Get gallery settings from Firestore
 * @returns {Promise<Object|null>} - Gallery settings or null
 */
export async function getGallerySettings() {
  try {
    const user = auth.currentUser;
    if (!user) {
      const cached = localStorage.getItem('gallerySettings');
      return cached ? JSON.parse(cached) : null;
    }

    const settingsRef = doc(db, 'users', user.uid, 'gallerySettings', 'config');
    const docSnap = await getDoc(settingsRef);
    
    if (docSnap.exists()) {
      const settings = docSnap.data();
      localStorage.setItem('gallerySettings', JSON.stringify(settings));
      return settings;
    } else {
      const cached = localStorage.getItem('gallerySettings');
      return cached ? JSON.parse(cached) : null;
    }
    
  } catch (error) {
    console.error('❌ Error loading gallery settings:', error);
    const cached = localStorage.getItem('gallerySettings');
    return cached ? JSON.parse(cached) : null;
  }
}

// Make functions available globally for non-module scripts
window.firebaseDatabase = {
  savePhotosMetadata,
  getPhotosMetadata,
  saveGallerySettings,
  getGallerySettings
};

console.log('🔥 Firebase Firestore integration loaded');
