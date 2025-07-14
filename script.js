document.addEventListener('DOMContentLoaded', () => {
  // Typed.js Initialization
  const typed = new Typed('#typed-text', {
    strings: ['Kavinda', 'a Web Developer', 'Undergraduate Student'],
    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 1500,
    loop: true,
  });

  // Elements
  const navLinks = document.querySelectorAll('.nav-menu a');
  const sections = document.querySelectorAll('section');
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  // Smooth scrolling + Active link highlighting
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      // If it's a sub-section trigger (Education/Activities/Achievements)
      if (link.hasAttribute('onclick')) {
        navLinks.forEach(l => l.classList.remove('active'));
        document.querySelector('.nav-menu a[href="#about"]').classList.add('active');
        return;
      }

      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      const targetId = link.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      const offset = 70; // Navbar height
      const top = targetSection.offsetTop - offset;

      window.scrollTo({ top, behavior: 'smooth' });

      // Close mobile menu if open
      navMenu.classList.remove('active');
      hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  // Highlight nav item on scroll
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 100;
    let current = '';

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = sec.getAttribute('id');
      }
    });

    // Special handling for About sub-tabs
    if (current === 'about') {
      const activeContent = document.querySelector('.tab-content.active');
      if (activeContent) {
        const tabId = activeContent.id.replace('-content', '');
        const subLink = document.querySelector(`.nav-menu a[onclick="showTab('${tabId}')"]`);
        if (subLink) {
          navLinks.forEach(l => l.classList.remove('active'));
          subLink.classList.add('active');
          return;
        }
      }
    }

    navLinks.forEach(link => {
      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${current}`
      );
    });
  });

  // Tab switching in About section
  const showTab = tabId => {
    tabs.forEach(t => t.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    const btn = document.querySelector(`.tab[data-tab="${tabId}"]`);
    const content = document.getElementById(`${tabId}-content`);
    btn?.classList.add('active');
    content?.classList.add('active');

    // Scroll About into view if needed
    const about = document.getElementById('about');
    const offset = 70;
    const top = about.offsetTop - offset;
    if (window.scrollY < top || window.scrollY > top + about.offsetHeight) {
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  tabs.forEach(tab =>
    tab.addEventListener('click', () => showTab(tab.dataset.tab))
  );

  // Hamburger menu toggle
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.innerHTML = navMenu.classList.contains('active')
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });
});

