/**
 * HERMES CLI Website Configuration
 * 
 * Update this configuration file with your verified production domain
 * (the exact domain you verify in Google Search Console for OAuth verification),
 * your public GitHub repository, and contact email.
 */
window.HERMES_CONFIG = {
  // Production domain verified in Google Search Console (e.g., 'https://hermes-cli.dev' or 'https://hermes.example.com')
  // Replace this placeholder with your verified domain
  domain: window.location.origin.includes('localhost') || window.location.origin.includes('127.0.0.1')
    ? window.location.origin
    : (window.location.origin || 'https://hermes-cli.yourdomain.com'),
  
  // Application details matching Google Cloud OAuth Consent Screen
  appName: 'HERMES GSuite CLI',
  appTagline: 'A Unified, AI-Powered Command-Line Interface for Google Workspace',
  appVersion: '0.1.0',
  
  // Public repository & Support channels
  githubUrl: 'https://github.com/nsakthivel-dev/hermes-gsuite-cli',
  pypiUrl: 'https://pypi.org/project/hermes-cli/',
  
  // Contact & Security Reporting (Placeholder to be configured with owner's real verified address)
  supportEmail: 'support@yourdomain.com',
  securityEmail: 'security@yourdomain.com',
  
  // Release year
  copyrightYear: 2026
};

// Update dynamic placeholders across DOM once loaded
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-config]').forEach(el => {
    const key = el.getAttribute('data-config');
    if (window.HERMES_CONFIG[key]) {
      if (el.tagName === 'A' && (key.endsWith('Email') || key.endsWith('Url') || key === 'domain')) {
        if (key.endsWith('Email')) {
          el.href = 'mailto:' + window.HERMES_CONFIG[key];
        } else {
          el.href = window.HERMES_CONFIG[key];
        }
      }
      el.textContent = window.HERMES_CONFIG[key];
    }
  });
});
