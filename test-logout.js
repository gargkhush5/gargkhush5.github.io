/**
 * Test script to verify immediate logout functionality
 * Run this in browser console after logging in to test logout behavior
 */

console.log('🧪 Testing logout functionality...');

// Check current authentication state
console.log('Current localStorage state:');
console.log('- isLoggedIn:', localStorage.getItem('isLoggedIn'));
console.log('- loggedInUser:', localStorage.getItem('loggedInUser'));
console.log('- lastLoginTime:', localStorage.getItem('lastLoginTime'));

// Test the logout function
console.log('\n🚪 Testing logout...');

// If performLogout is available, test it
if (typeof window.performLogout === 'function') {
  console.log('✅ performLogout function found');
  
  // This should immediately clear localStorage and redirect
  window.performLogout().then(() => {
    console.log('✅ Logout completed');
  }).catch(error => {
    console.error('❌ Logout error:', error);
  });
  
} else {
  console.log('❌ performLogout function not found');
  console.log('Available logout functions:', typeof window.logout);
}
