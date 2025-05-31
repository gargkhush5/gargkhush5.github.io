// auth-ui.js - Script to add authentication UI elements to regular website pages

// Update the sidebar with login/logout UI
function updateSidebarAuth() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;
  
  // Remove existing admin section if it exists
  const existingAdmin = document.querySelector('.sidebar-admin');
  if (existingAdmin) existingAdmin.remove();
  
  // Remove existing login section if it exists
  const existingLogin = document.querySelector('.sidebar-login');
  if (existingLogin) existingLogin.remove();
  
  // Handle dashboard link in sidebar tabs
  const tabsList = document.querySelector('.sidebar .tabs');
  if (tabsList) {
    // Remove existing dashboard link if it exists
    const existingDashboard = tabsList.querySelector('li a[href="author-dashboard.html"]');
    if (existingDashboard) {
      existingDashboard.parentElement.remove();
    }
    
    if (isLoggedIn()) {
      // Add dashboard link to sidebar tabs
      const dashboardLi = document.createElement('li');
      const dashboardLink = document.createElement('a');
      dashboardLink.href = 'author-dashboard.html';
      dashboardLink.textContent = 'Dashboard';
      dashboardLi.appendChild(dashboardLink);
      tabsList.appendChild(dashboardLi);
    }
  }
  
  if (isLoggedIn()) {
    // Create admin section in sidebar
    const adminSection = document.createElement('div');
    adminSection.className = 'sidebar-admin';
    adminSection.style.display = 'block';
    
    const adminInfo = document.createElement('div');
    adminInfo.className = 'sidebar-admin-info';
    adminInfo.innerHTML = `Logged in as: <span>${getCurrentUser()}</span>`;
    
    const logoutBtn = document.createElement('button');
    logoutBtn.className = 'sidebar-logout-btn';
    logoutBtn.textContent = 'Logout';
    logoutBtn.onclick = function() {
      logout();
    };
    
    adminSection.appendChild(adminInfo);
    adminSection.appendChild(logoutBtn);
    // Just append the admin section after everything else
    // This will ensure it's at the end of the sidebar but with margin from bottom
    sidebar.appendChild(adminSection);
  } else {    
    // Create login section in sidebar with button styling
    const loginSection = document.createElement('div');
    loginSection.className = 'sidebar-login';
    
    const loginBtn = document.createElement('button');
    loginBtn.className = 'sidebar-login-btn';
    loginBtn.textContent = 'Author Login';
    loginBtn.onclick = function() {
      window.location.href = 'author-login.html';
    };
    
    loginSection.appendChild(loginBtn);
    // Just append the login section after everything else
    // This will ensure it's at the end of the sidebar but with margin from bottom
    sidebar.appendChild(loginSection);
  }
}

// Add authentication UI to page - dynamically adds dashboard/logout buttons only
// No login button in top-right corner anymore - only in sidebar
function addAuthUI() {
  // Update the sidebar first
  updateSidebarAuth();
  
  // Create auth container if it doesn't exist
  if (!document.getElementById('auth-buttons')) {
    const authDiv = document.createElement('div');
    authDiv.id = 'auth-buttons';
    document.body.appendChild(authDiv);
    
    // No login button - it's only in the sidebar now
      // Create dashboard button
    const dashboardBtn = document.createElement('a');
    dashboardBtn.href = 'author-dashboard.html';
    dashboardBtn.className = 'author-dashboard-btn';
    dashboardBtn.id = 'dashboardBtn';
    dashboardBtn.textContent = 'Dashboard';
    dashboardBtn.style.display = 'none';
    
    // Add button to the container (only dashboard button in top-right)
    authDiv.appendChild(dashboardBtn);
      // Add necessary styles for dashboard button
    const style = document.createElement('style');
    style.textContent = `
      .author-dashboard-btn {
        position: absolute;
        top: 20px;
        right: 20px;
        background: #004f90;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        font-family: inherit;
        font-weight: 500;
        cursor: pointer;
        transition: background 0.2s;
        text-decoration: none;
        z-index: 100;
      }
      .author-dashboard-btn:hover {
        background: #003b6d;
      }
    `;
    document.head.appendChild(style);
  }
    // Update button visibility based on authentication status
  updateAuthUI();
}

// Update the UI based on authentication status
function updateAuthUI() {
  const dashboardBtn = document.getElementById('dashboardBtn');
  
  if (!dashboardBtn) {
    console.log("Dashboard button not found");
    return;
  }
  
  if (isLoggedIn()) {
    console.log("User is logged in, showing dashboard button");
    dashboardBtn.style.display = 'block';
  } else {
    console.log("User is not logged in, hiding dashboard button");
    dashboardBtn.style.display = 'none';
  }
}

// Check for restricted content and handle display based on auth status
function handleRestrictedContent() {
  const restrictedElements = document.querySelectorAll('[data-restricted="true"]');
  
  restrictedElements.forEach(element => {
    if (isLoggedIn()) {
      element.style.display = 'block';
    } else {
      element.style.display = 'none';
    }
  });
}

// Initialize authentication UI
document.addEventListener('DOMContentLoaded', function() {
  // First update the sidebar authentication
  updateSidebarAuth();
  
  // Then add other UI elements and handle restricted content
  addAuthUI();
  handleRestrictedContent();
});
