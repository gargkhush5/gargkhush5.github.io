/**
 * Comprehensive logout functionality for the portfolio website.
 * This ensures immediate logout across all authentication methods.
 */

import { getAuth, signOut } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// Get Firebase auth instance
const auth = getAuth();

/**
 * Perform complete logout - clears all authentication data immediately
 */
export async function performLogout() {
  try {
    console.log('🚪 Performing complete logout...');
    
    // 1. Sign out from Firebase first
    try {
      await signOut(auth);
      console.log('✅ Firebase logout successful');
    } catch (firebaseError) {
      console.log('⚠️ Firebase logout error (continuing with localStorage cleanup):', firebaseError);
    }
    
    // 2. Immediately clear ALL localStorage data related to authentication
    const keysToRemove = [
      'isLoggedIn',
      'loggedInUser', 
      'username',
      'userEmail',
      'lastLoginTime',
      // Clear any other session-related data
      'userNotes',
      'homepageData',
      'photosData',
      'gallerySettings',
      'resumeFile'
    ];
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });
    
    // 3. Set explicit logout state
    localStorage.setItem('isLoggedIn', 'false');
    
    console.log('✅ All authentication data cleared');
    
    // 4. Update UI immediately if functions are available
    if (typeof updateSidebarAuth === 'function') {
      updateSidebarAuth();
    }
    if (typeof updateAuthUI === 'function') {
      updateAuthUI();
    }
    
    // 5. Force redirect to home page immediately
    console.log('🔄 Redirecting to home...');
    window.location.replace('index.html');
    
  } catch (error) {
    console.error('❌ Logout error:', error);
    // Even if there's an error, still try to redirect
    window.location.replace('index.html');
  }
}

/**
 * Global logout function for legacy compatibility
 */
export async function logout() {
  return performLogout();
}

// Make functions globally available
window.performLogout = performLogout;
window.logout = logout;
