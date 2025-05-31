/**
 * Sidebar functionality for the portfolio website.
 * This file contains common functions for handling sidebar toggle
 * on mobile devices and ensures consistent behavior across all pages.
 */

// Toggle sidebar visibility
function toggleSidebar() {
  console.log('Global toggleSidebar called');
  const sidebar = document.querySelector('.sidebar');
  
  // Find the appropriate container based on what's available in the page
  const container = document.querySelector('.notes-container') || 
                    document.querySelector('.edit-container') || 
                    document.querySelector('.social-container') || 
                    document.querySelector('.dashboard-container') || 
                    document.querySelector('main');
  
  if (sidebar) {
    sidebar.classList.toggle('active');
    console.log('Sidebar active:', sidebar.classList.contains('active'));
  }
  
  if (container) {
    container.classList.toggle('sidebar-active');
    console.log('Container sidebar-active:', container.classList.contains('sidebar-active'));
  }
}

// Close the sidebar
function closeSidebar() {
  console.log('Global closeSidebar called');
  const sidebar = document.querySelector('.sidebar');
  
  // Find the appropriate container based on what's available in the page
  const container = document.querySelector('.notes-container') || 
                    document.querySelector('.edit-container') || 
                    document.querySelector('.social-container') || 
                    document.querySelector('.dashboard-container') || 
                    document.querySelector('main');
  
  if (sidebar) {
    sidebar.classList.remove('active');
  }
  
  if (container) {
    container.classList.remove('sidebar-active');
  }
}

// Check screen width and update sidebar state
function checkScreenWidth() {
  const sidebar = document.querySelector('.sidebar');
  
  // Find the appropriate container based on what's available in the page
  const container = document.querySelector('.notes-container') || 
                   document.querySelector('.edit-container') || 
                   document.querySelector('.social-container') || 
                   document.querySelector('.dashboard-container') || 
                   document.querySelector('main');
  
  if (window.innerWidth <= 768) {
    if (sidebar) sidebar.classList.remove('active');
    if (container) container.classList.remove('sidebar-active');
  } else {
    if (sidebar) sidebar.classList.remove('active'); // Remove active class on large screens
  }
}

// Attach event listeners when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize screen check
  checkScreenWidth();
  
  // Add event listeners for window resize
  window.addEventListener('resize', checkScreenWidth);
  
  // Make sure functions are globally available
  window.toggleSidebar = toggleSidebar;
  window.closeSidebar = closeSidebar;
});
