/**
 * HERMES CLI - Docs & TOC Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // Active TOC link highlighting based on scroll position
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60% 0px',
    threshold: 0
  };

  const headings = document.querySelectorAll('.docs-content h2, .docs-content h3');
  const tocLinks = document.querySelectorAll('.toc-list a');

  if (headings.length > 0 && tocLinks.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) {
            tocLinks.forEach(link => {
              if (link.getAttribute('href') === `#${id}`) {
                link.style.color = 'var(--accent-emerald)';
                link.style.fontWeight = '600';
              } else {
                link.style.color = 'var(--text-muted)';
                link.style.fontWeight = 'normal';
              }
            });
          }
        }
      });
    }, observerOptions);

    headings.forEach(heading => observer.observe(heading));
  }

  // Sidebar toggle for mobile if present
  const sidebarToggle = document.querySelector('.docs-sidebar-toggle');
  const sidebar = document.querySelector('.docs-sidebar');
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('show');
    });
  }
});
