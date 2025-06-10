// Legacy auth.js - now works alongside Firebase
// This maintains compatibility with existing localStorage-based auth for fallback

// Import Firebase auth functions if available
let firebaseAuth = null;
try {
  // Try to import Firebase functions
  import('./firebase-auth.js').then(module => {
    firebaseAuth = module;
  });
} catch (e) {
  console.log('Firebase auth not available, using localStorage fallback');
}

// Initialize authentication system
function initAuth() {
  // If first visit, set isLoggedIn to false
  if (localStorage.getItem('isLoggedIn') === null) {
    localStorage.setItem('isLoggedIn', 'false');
  }
  
  // Initialize default demo user if none exists (fallback only)
  if (!localStorage.getItem('users')) {
    const users = [
      {
        username: "demo",
        password: "demo123",
        email: "demo@example.com"
      }
    ];
    localStorage.setItem('users', JSON.stringify(users));
    console.warn('🚨 Using demo credentials for fallback authentication');
  }
}

// Check if user is logged in (Firebase first, then localStorage fallback)
function isLoggedIn() {
  if (firebaseAuth && firebaseAuth.isFirebaseAuthenticated()) {
    return true;
  }
  return localStorage.getItem('isLoggedIn') === 'true';
}

// Get current logged in user
function getCurrentUser() {
  if (firebaseAuth && firebaseAuth.getCurrentFirebaseUser()) {
    return firebaseAuth.getCurrentFirebaseUser().email;
  }
  return localStorage.getItem('loggedInUser');
}

// Logout function (Firebase first, then localStorage)
async function logout() {
  try {
    // Import and use the comprehensive logout function
    const { performLogout } = await import('./logout.js');
    return performLogout();
  } catch (error) {
    console.error('Error importing logout module:', error);
    
    // Fallback logout if import fails
    if (firebaseAuth) {
      await firebaseAuth.firebaseSignOut();
    }
    
    // Clear ALL localStorage data immediately
    const keysToRemove = [
      'isLoggedIn',
      'loggedInUser', 
      'username',
      'userEmail',
      'lastLoginTime'
    ];
    
    keysToRemove.forEach(key => {
      localStorage.removeItem(key);
    });
    
    localStorage.setItem('isLoggedIn', 'false');
    
    // Force redirect
    window.location.replace('author-login.html');
  }
}

// Protect page - redirect if not logged in
function protectPage() {
  if (!isLoggedIn()) {
    window.location.href = 'author-login.html';
  }
}

// Legacy functions for localStorage fallback
function addUser(username, password, email) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  
  if (users.some(user => user.username === username)) {
    return false;
  }
  
  users.push({ username, password, email });
  localStorage.setItem('users', JSON.stringify(users));
  return true;
}

function changePassword(username, newPassword) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const updatedUsers = users.map(user => {
    if (user.username === username) {
      return { ...user, password: newPassword };
    }
    return user;
  });
  localStorage.setItem('users', JSON.stringify(updatedUsers));
}

function changeUsername(oldUsername, newUsername) {
  const users = JSON.parse(localStorage.getItem('users')) || [];
  
  if (users.some(user => user.username === newUsername)) {
    return false;
  }
  
  const updatedUsers = users.map(user => {
    if (user.username === oldUsername) {
      return { ...user, username: newUsername };
    }
    return user;
  });
  
  localStorage.setItem('users', JSON.stringify(updatedUsers));
  
  if (localStorage.getItem('loggedInUser') === oldUsername) {
    localStorage.setItem('loggedInUser', newUsername);
  }
  
  return true;
}

// Run initialization
initAuth();
