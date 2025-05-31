// Clear sensitive data from localStorage before GitHub upload
// Run this in browser console: clear-data.js

console.log('🧹 Clearing sensitive data from localStorage...');

// Clear user notes
if (localStorage.getItem('userNotes')) {
  console.log('📝 Clearing user notes...');
  localStorage.removeItem('userNotes');
}

// Clear homepage customization data
if (localStorage.getItem('homepageData')) {
  console.log('🏠 Clearing homepage customization data...');
  localStorage.removeItem('homepageData');
}

if (localStorage.getItem('profilePhotoData')) {
  console.log('📸 Clearing custom profile photo...');
  localStorage.removeItem('profilePhotoData');
}

// Clear user credentials (keep only demo user)
if (localStorage.getItem('users')) {
  console.log('👤 Resetting to demo credentials only...');
  const demoUsers = [
    {
      username: "demo",
      password: "demo123",
      email: "demo@example.com"
    }
  ];
  localStorage.setItem('users', JSON.stringify(demoUsers));
}

// Clear login session
localStorage.removeItem('loggedInUser');
localStorage.setItem('isLoggedIn', 'false');

console.log('✅ Data cleared successfully!');
console.log('🔒 Safe to upload to GitHub now.');
console.log('📋 Demo credentials: demo/demo123');
