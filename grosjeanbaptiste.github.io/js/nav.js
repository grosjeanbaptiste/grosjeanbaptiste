document.addEventListener('DOMContentLoaded', () => {
  // Menu mobile toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle mobile menu — CSS handles the transform/opacity transition on
  // #nav-menu, we only flip the .active class + ARIA state here.
  menuToggle.addEventListener('click', function () {
    const isExpanded = navMenu.classList.toggle('active');
    this.setAttribute('aria-expanded', isExpanded);
  });

  // Close menu when clicking on a nav link (mobile only).
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // Highlight active section in navigation
  const sections = document.querySelectorAll('section[id]');

  function highlightActiveSection() {
    let current = '';

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = `#${section.getAttribute('id')}`;
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === current) {
        link.classList.add('active');
      }
    });
  }

  // Run on scroll and on load
  window.addEventListener('scroll', highlightActiveSection);
  highlightActiveSection();

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth',
        });
      }
    });
  });
});
