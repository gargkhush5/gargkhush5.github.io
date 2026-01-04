/**
 * Firebase Storage Integration
 * Handles file uploads (resume PDF and photos) to Firebase Storage
 */

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, listAll } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js';
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
const storage = getStorage(app);
const auth = getAuth(app);

/**
 * Upload resume PDF to Firebase Storage
 * @param {File} file - The PDF file to upload
 * @param {Function} progressCallback - Optional callback for upload progress
 * @returns {Promise<Object>} - Object containing download URL and metadata
 */
export async function uploadResume(file, progressCallback = null) {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User must be authenticated to upload files');
    }

    console.log('📤 Uploading resume to Firebase Storage...');
    
    // Create a storage reference
    const resumeRef = ref(storage, `resumes/${user.uid}/resume.pdf`);
    
    // Upload the file
    const snapshot = await uploadBytes(resumeRef, file);
    console.log('✅ Resume uploaded successfully');
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log('🔗 Download URL:', downloadURL);
    
    // Store metadata in localStorage for quick access
    const metadata = {
      name: file.name,
      url: downloadURL,
      size: file.size,
      lastModified: new Date().toISOString(),
      storagePath: snapshot.ref.fullPath
    };
    
    localStorage.setItem('resumeFile', JSON.stringify(metadata));
    
    return {
      success: true,
      url: downloadURL,
      metadata: metadata
    };
    
  } catch (error) {
    console.error('❌ Error uploading resume:', error);
    throw error;
  }
}

/**
 * Get the current resume URL from Firebase Storage
 * @returns {Promise<Object|null>} - Resume metadata or null if not found
 */
export async function getResumeURL() {
  try {
    const user = auth.currentUser;
    if (!user) {
      // Check localStorage for cached data
      const cached = localStorage.getItem('resumeFile');
      return cached ? JSON.parse(cached) : null;
    }
    
    const resumeRef = ref(storage, `resumes/${user.uid}/resume.pdf`);
    const url = await getDownloadURL(resumeRef);
    
    const metadata = {
      name: 'resume.pdf',
      url: url,
      lastModified: new Date().toISOString()
    };
    
    // Cache in localStorage
    localStorage.setItem('resumeFile', JSON.stringify(metadata));
    
    return metadata;
  } catch (error) {
    if (error.code === 'storage/object-not-found') {
      console.log('No resume found in Firebase Storage');
      return null;
    }
    console.error('Error getting resume URL:', error);
    return null;
  }
}

/**
 * Delete resume from Firebase Storage
 * @returns {Promise<boolean>} - Success status
 */
export async function deleteResume() {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User must be authenticated to delete files');
    }
    
    const resumeRef = ref(storage, `resumes/${user.uid}/resume.pdf`);
    await deleteObject(resumeRef);
    
    // Clear localStorage
    localStorage.removeItem('resumeFile');
    
    console.log('✅ Resume deleted successfully');
    return true;
  } catch (error) {
    if (error.code === 'storage/object-not-found') {
      console.log('Resume already deleted or does not exist');
      localStorage.removeItem('resumeFile');
      return true;
    }
    console.error('Error deleting resume:', error);
    throw error;
  }
}

/**
 * Upload a photo to Firebase Storage
 * @param {File} file - The image file to upload
 * @param {string} photoId - Unique identifier for the photo
 * @returns {Promise<Object>} - Object containing download URL and metadata
 */
export async function uploadPhoto(file, photoId) {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User must be authenticated to upload files');
    }
    
    console.log(`📤 Uploading photo ${photoId} to Firebase Storage...`);
    
    // Create a unique filename with timestamp
    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const filename = `photo_${photoId}_${timestamp}.${extension}`;
    
    // Create a storage reference
    const photoRef = ref(storage, `photos/${user.uid}/${filename}`);
    
    // Upload the file
    const snapshot = await uploadBytes(photoRef, file);
    console.log(`✅ Photo ${photoId} uploaded successfully`);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return {
      success: true,
      id: photoId,
      url: downloadURL,
      filename: filename,
      storagePath: snapshot.ref.fullPath,
      uploadedAt: new Date().toISOString()
    };
    
  } catch (error) {
    console.error(`❌ Error uploading photo ${photoId}:`, error);
    throw error;
  }
}

/**
 * Delete a photo from Firebase Storage
 * @param {string} storagePath - The full storage path of the photo
 * @returns {Promise<boolean>} - Success status
 */
export async function deletePhoto(storagePath) {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User must be authenticated to delete files');
    }
    
    const photoRef = ref(storage, storagePath);
    await deleteObject(photoRef);
    
    console.log('✅ Photo deleted successfully');
    return true;
  } catch (error) {
    if (error.code === 'storage/object-not-found') {
      console.log('Photo already deleted or does not exist');
      return true;
    }
    console.error('Error deleting photo:', error);
    throw error;
  }
}

/**
 * Get all photos for the current user
 * @returns {Promise<Array>} - Array of photo metadata
 */
export async function getAllPhotos() {
  try {
    const user = auth.currentUser;
    if (!user) {
      // Return cached photos from localStorage
      const cached = localStorage.getItem('photosData');
      return cached ? JSON.parse(cached) : [];
    }
    
    const photosRef = ref(storage, `photos/${user.uid}`);
    const result = await listAll(photosRef);
    
    const photos = await Promise.all(
      result.items.map(async (itemRef) => {
        const url = await getDownloadURL(itemRef);
        return {
          url: url,
          storagePath: itemRef.fullPath,
          name: itemRef.name
        };
      })
    );
    
    return photos;
  } catch (error) {
    console.error('Error getting photos:', error);
    return [];
  }
}

/**
 * Save photos data to localStorage (for metadata like captions)
 * @param {Array} photosData - Array of photo objects with metadata
 */
export function savePhotosMetadata(photosData) {
  localStorage.setItem('photosData', JSON.stringify(photosData));
}

/**
 * Get photos metadata from localStorage
 * @returns {Array} - Array of photo objects with metadata
 */
export function getPhotosMetadata() {
  const cached = localStorage.getItem('photosData');
  return cached ? JSON.parse(cached) : [];
}

// Make functions available globally for non-module scripts
window.firebaseStorage = {
  uploadResume,
  getResumeURL,
  deleteResume,
  uploadPhoto,
  deletePhoto,
  getAllPhotos,
  savePhotosMetadata,
  getPhotosMetadata
};

console.log('🔥 Firebase Storage integration loaded');
