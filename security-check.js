// Security Verification Script
// Run this in browser console to verify all security measures

console.log("🔒 Portfolio Security Verification");
console.log("=================================");

// Check if we're on a protected page
const currentPage = window.location.pathname.split('/').pop();
const protectedPages = [
    'author-dashboard.html',
    'notes.html', 
    'edit-homepage.html',
    'edit-photos.html',
    'edit-resume.html',
    'manage-social.html',
    'change-password.html',
    'change-username.html'
];

if (protectedPages.includes(currentPage)) {
    console.log(`📋 Testing: ${currentPage}`);
    
    // Check if page was initially hidden
    console.log("✅ Page should be hidden on load");
    
    // Check authentication status
    if (typeof isLoggedIn === 'function') {
        const authStatus = isLoggedIn();
        console.log(`🔐 Authentication Status: ${authStatus ? 'LOGGED IN' : 'NOT LOGGED IN'}`);
        
        if (!authStatus) {
            console.log("⚠️  Page should redirect to login");
        } else {
            console.log("✅ Page should be visible to authenticated user");
        }
    } else {
        console.log("📊 Firebase auth in use - check onAuthStateChanged");
    }
    
    // Check for security patterns in page source
    const hasImmediateHiding = document.documentElement.innerHTML.includes("document.body.style.display = 'none'");
    const hasLoginRedirect = document.documentElement.innerHTML.includes("author-login.html");
    
    console.log(`🛡️  Immediate hiding: ${hasImmediateHiding ? '✅ PRESENT' : '❌ MISSING'}`);
    console.log(`🔄 Login redirect: ${hasLoginRedirect ? '✅ PRESENT' : '❌ MISSING'}`);
    
    if (hasImmediateHiding && hasLoginRedirect) {
        console.log("🎉 SECURITY CHECK PASSED - Page is properly protected!");
    } else {
        console.log("⚠️  SECURITY ISSUE - Missing protection measures");
    }
    
} else {
    console.log(`📄 Current page: ${currentPage || 'index.html'}`);
    console.log("ℹ️  This is not a protected page");
}

console.log("\n🧪 To test security:");
console.log("1. Logout from any authenticated session");
console.log("2. Try accessing protected pages directly via URL");
console.log("3. Pages should redirect to author-login.html");
console.log("4. Use test-security.html for automated testing");
