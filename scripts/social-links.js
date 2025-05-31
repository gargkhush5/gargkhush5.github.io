/**
 * Social Links Management
 * This script handles loading and saving social media links across the website
 */

// Default social links (used if no links are stored in localStorage)
const DEFAULT_SOCIAL_LINKS = {
  whatsapp: "https://wa.me/918696056626",
  facebook: "https://facebook.com/khushgarg2910",
  instagram: "https://instagram.com/khushgarg.in",
  twitter: "https://x.com/gargkhush5",
  linkedin: "https://linkedin.com/in/gargkhush5",
  github: "https://github.com/gargkhush5"
};

/**
 * Loads social links from localStorage or returns defaults
 * @returns {Object} Social links object
 */
function getSocialLinks() {
  const storedLinks = localStorage.getItem('socialLinks');
  return storedLinks ? JSON.parse(storedLinks) : DEFAULT_SOCIAL_LINKS;
}

/**
 * Saves social links to localStorage
 * @param {Object} links - Object containing social media links
 */
function saveSocialLinks(links) {
  localStorage.setItem('socialLinks', JSON.stringify(links));
}

/**
 * Updates the social links in the DOM on the social.html page
 */
function updateSocialLinksDisplay() {
  // Only run on the social.html page
  if (!document.querySelector('.social-buttons')) return;
  
  const links = getSocialLinks();
  
  // Update each link in the DOM
  const socialButtons = document.querySelectorAll('.social-buttons a');
  socialButtons.forEach(button => {
    if (button.classList.contains('whatsapp')) {
      button.href = links.whatsapp;
    } else if (button.classList.contains('facebook')) {
      button.href = links.facebook;
    } else if (button.classList.contains('instagram')) {
      button.href = links.instagram;
    } else if (button.classList.contains('twitter')) {
      button.href = links.twitter;
    } else if (button.classList.contains('linkedin')) {
      button.href = links.linkedin;
    } else if (button.classList.contains('github')) {
      button.href = links.github;
    }
  });
}

/**
 * Loads saved social links on the manage-social.html page
 */
function loadSocialLinksForm() {
  // Only run on the manage-social.html page
  if (!document.getElementById('whatsapp')) return;
  
  const links = getSocialLinks();
  
  // Update form inputs with saved values
  document.getElementById('whatsapp').value = links.whatsapp || '';
  document.getElementById('facebook').value = links.facebook || '';
  document.getElementById('instagram').value = links.instagram || '';
  document.getElementById('twitter').value = links.twitter || '';
  document.getElementById('linkedin').value = links.linkedin || '';
  document.getElementById('github').value = links.github || '';
}

/**
 * Saves social links from the manage-social.html form
 */
function saveSocialLinksFromForm() {
  // Only run on the manage-social.html page
  if (!document.getElementById('whatsapp')) return;
  
  const links = {
    whatsapp: document.getElementById('whatsapp').value,
    facebook: document.getElementById('facebook').value,
    instagram: document.getElementById('instagram').value,
    twitter: document.getElementById('twitter').value,
    linkedin: document.getElementById('linkedin').value,
    github: document.getElementById('github').value
  };
  
  // Save to localStorage
  saveSocialLinks(links);
  
  // Show success message
  const successMessage = document.getElementById('successMessage');
  if (successMessage) {
    successMessage.style.display = 'block';
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 3000);
  }
}

// Run on page load
document.addEventListener('DOMContentLoaded', function() {
  // Update social links display (social.html)
  updateSocialLinksDisplay();
  
  // Load form inputs (manage-social.html)
  loadSocialLinksForm();
});
