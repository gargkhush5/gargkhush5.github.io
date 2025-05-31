# Personal Portfolio Website

A modern, responsive portfolio website with admin features for content management.

## 🌟 Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Contact Form**: Integrated with Formspree for message handling
- **Social Media Integration**: Customizable social links
- **Admin Dashboard**: Content management interface
- **Notes System**: Personal note-taking functionality
- **Photo Gallery**: Organized photo display

## 🔧 Technologies Used

- HTML5, CSS3, JavaScript
- Local Storage for demo data
- Formspree for contact form handling
- Responsive design principles

## 🚨 Security Notice

**This is a demonstration project with client-side authentication only.**

### Important Security Considerations:

- **Demo Credentials**: Default login is `demo/demo123`
- **Local Storage**: All data is stored in browser localStorage
- **No Server Authentication**: This is a client-side only demo
- **Not Production Ready**: Do not use for sensitive data

### For Production Use:

1. Implement proper server-side authentication
2. Use secure password hashing (bcrypt, etc.)
3. Implement HTTPS and secure session management
4. Use environment variables for sensitive configuration
5. Implement proper database storage instead of localStorage

## 🚀 Getting Started

1. Clone the repository
2. Open `index.html` in a web browser
3. Use demo credentials: `demo/demo123` for admin access

## 📁 Project Structure

```
├── index.html              # Main homepage
├── photos/                 # Photo gallery images
├── icons/                  # Social media and UI icons
├── scripts/
│   ├── auth.js            # Authentication system
│   ├── auth-ui.js         # UI authentication handling
│   └── social-links.js    # Social media management
├── styles.css             # Main stylesheet
└── [other HTML pages]     # Various site pages
```

## 🔒 Data Security

Before deploying or sharing:

1. Run `clear-data.js` in browser console to clear sensitive data
2. Change default credentials in `auth.js`
3. Review all localStorage data
4. Consider implementing proper backend authentication

## 📝 License

This project is for demonstration purposes. Feel free to use as a template for your own portfolio.

---

**⚠️ Remember: This is a demo system. Never use for production without proper security implementation!**
