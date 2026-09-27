/**
 * HERMES CLI - Main Client Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
      const expanded = navMenu.classList.contains('show');
      mobileToggle.setAttribute('aria-expanded', expanded);
    });
  }

  // Copy to Clipboard buttons
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const text = btn.getAttribute('data-copy');
      if (!text) return;
      try {
        await navigator.clipboard.writeText(text);
        const originalContent = btn.innerHTML;
        btn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span style="color:#10b981;">Copied!</span>
        `;
        setTimeout(() => {
          btn.innerHTML = originalContent;
        }, 2000);
      } catch (err) {
        console.error('Failed to copy', err);
      }
    });
  });

  // Terminal Tab Switching
  const terminalTabs = document.querySelectorAll('.terminal-tab-btn');
  const terminalPanels = document.querySelectorAll('.terminal-panel');

  if (terminalTabs.length > 0 && terminalPanels.length > 0) {
    terminalTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('data-tab');

        terminalTabs.forEach(t => t.classList.remove('active'));
        terminalPanels.forEach(p => {
          p.classList.remove('active');
          p.style.display = 'none';
        });

        tab.classList.add('active');
        const activePanel = document.getElementById(targetId);
        if (activePanel) {
          activePanel.classList.add('active');
          activePanel.style.display = 'block';
        }
      });
    });
  }
});
