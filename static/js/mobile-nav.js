// Mobile navigation functionality
(function() {
  'use strict';

  function initMobileNav() {
    // Initialize accordion sections
    const toggleButtons = document.querySelectorAll('.mobile-nav-toggle');

    toggleButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionId = this.dataset.section;
        const submenu = document.querySelector(`[data-submenu="${sectionId}"]`);
        const isExpanded = this.getAttribute('aria-expanded') === 'true';

        // Close all other sections
        toggleButtons.forEach(btn => {
          if (btn !== this) {
            btn.setAttribute('aria-expanded', 'false');
            btn.classList.remove('active');
            const otherId = btn.dataset.section;
            const otherSubmenu = document.querySelector(`[data-submenu="${otherId}"]`);
            if (otherSubmenu) {
              otherSubmenu.classList.remove('active');
            }
          }
        });

        // Toggle current section
        if (!isExpanded) {
          this.setAttribute('aria-expanded', 'true');
          this.classList.add('active');
          submenu.classList.add('active');
        } else {
          this.setAttribute('aria-expanded', 'false');
          this.classList.remove('active');
          submenu.classList.remove('active');
        }
      });
    });

    // Auto-expand active section
    const activeToggle = document.querySelector('.mobile-nav-toggle.active');
    if (activeToggle) {
      const sectionId = activeToggle.dataset.section;
      const submenu = document.querySelector(`[data-submenu="${sectionId}"]`);
      if (submenu) {
        activeToggle.setAttribute('aria-expanded', 'true');
        submenu.classList.add('active');
      }
    }

    // Mobile menu toggle
    const menuButton = document.getElementById('mobile-menu-button');
    const mobileNav = document.querySelector('.mobile-nav-menu');
    const body = document.body;

    if (!menuButton || !mobileNav) return;

    menuButton.addEventListener('click', function() {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';

      if (!isOpen) {
        // Open menu
        menuButton.setAttribute('aria-expanded', 'true');
        menuButton.classList.add('active');
        mobileNav.classList.add('active');
        body.classList.add('mobile-menu-open');
      } else {
        // Close menu
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.classList.remove('active');
        mobileNav.classList.remove('active');
        body.classList.remove('mobile-menu-open');
      }
    });

    // Close menu when clicking a link
    const navLinks = mobileNav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.classList.remove('active');
        mobileNav.classList.remove('active');
        body.classList.remove('mobile-menu-open');
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.classList.remove('active');
        mobileNav.classList.remove('active');
        body.classList.remove('mobile-menu-open');
      }
    });
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileNav);
  } else {
    initMobileNav();
  }
})();
