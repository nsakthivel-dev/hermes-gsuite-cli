/**
 * HERMES CLI Website Configuration
 * 
 * Update this configuration file with your verified production domain
 * (the exact domain you verify in Google Search Console for OAuth verification),
 * your public GitHub repository, and contact email.
 */
window.HERMES_CONFIG = {
  // Production domain
  domain: 'https://hermes-gsuite-cli.vercel.app',
  
  // Application details matching Google Cloud OAuth Consent Screen
  appName: 'HERMES GSuite CLI',
  appTagline: 'A Unified, AI-Powered Command-Line Interface for Google Workspace',
  appVersion: '0.1.0',
  
  // Public repository & Support channels
  githubUrl: 'https://github.com/nsakthivel-dev/hermes-gsuite-cli',
  pypiUrl: 'https://pypi.org/project/hermes-cli/',
  
  // Contact & Security Reporting
  supportEmail: 'sakthicud07@gmail.com',
  securityEmail: 'sakthicud07@gmail.com',
  
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
