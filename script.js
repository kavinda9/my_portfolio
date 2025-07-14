document.addEventListener('DOMContentLoaded', function() {
  // Typed.js initialization
  var typed = new Typed("#typed-text", {
    strings: ["Kavinda", "a Web Developer", "Undergraduate Student"],
    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 1500,
    loop: true
  });

  // Get all navigation links and sections
  const navLinks = document.querySelectorAll('.nav-menu a');
  const sections = document.querySelectorAll('section');

  // Smooth scrolling and active state for navigation
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Special handling for Education/Activities/Achievements links
      if (this.hasAttribute('onclick')) {
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        // Add active to the About link since these are sub-sections
        document.querySelector('.nav-menu a[href="#about"]').classList.add('active');
        return;
      }
      
      e.preventDefault();
      
      // Update active nav link
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');

      // Scroll to section
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      const offset = 70; // Height of your fixed navbar
      const targetPosition = targetSection.offsetTop - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });

  // Tab functionality for About section
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
      showTab(this.getAttribute('data-tab'));
    });
  });

  // Highlight current section in nav while scrolling
  window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY + 100; // Adding offset
    
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });
    
    // Special case for About sub-sections
    if (currentSectionId === 'about') {
      const activeTabContent = document.querySelector('.tab-content.active');
      if (activeTabContent) {
        const activeTabId = activeTabContent.id.replace('-content', '');
        if (activeTabId === 'education-tab') {
          document.querySelector('.nav-menu a[onclick="showTab(\'education-tab\')"]').classList.add('active');
          return;
        }
        // Add similar checks for other sub-sections if needed
      }
    }
    
    // Update active nav link
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
});

// Improved showTab function
function showTab(tabId) {
  // Remove active class from all tabs and contents
  document.querySelectorAll('.tab').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));

  // Activate the selected tab and content
  const tabButton = document.querySelector(`.tab[data-tab="${tabId}"]`);
  const tabContent = document.getElementById(`${tabId}-content`);
  
  if (tabButton) tabButton.classList.add('active');
  if (tabContent) tabContent.classList.add('active');
  
  // Scroll to about section if not visible
  const aboutSection = document.getElementById('about');
  const offset = 70; // Navbar height
  const aboutPosition = aboutSection.offsetTop - offset;
  
  if (window.scrollY < aboutPosition || window.scrollY > aboutPosition + aboutSection.offsetHeight) {
    window.scrollTo({
      top: aboutPosition,
      behavior: 'smooth'
    });
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // ... your existing Typed.js and other code ...
  
  // Hamburger Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  hamburger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    hamburger.innerHTML = navMenu.classList.contains('active') ? 
      '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
  });
  
  // Close menu when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
      hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });
  
  // ... rest of your existing JavaScript ...
});

