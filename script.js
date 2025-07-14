document.addEventListener('DOMContentLoaded', function () {

  new Typed("#typed-text", {
    strings: ["Kavinda", "a Web Developer", "Undergraduate Student"],
    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 1500,
    loop: true
  });

  const navLinks = document.querySelectorAll('.nav-menu a');
  const sections = document.querySelectorAll('section');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      if (!this.hasAttribute('href')) return;

      if (this.hasAttribute('onclick')) {
        navLinks.forEach(l => l.classList.remove('active'));
        document.querySelector('.nav-menu a[href="#about"]').classList.add('active');
        return;
      }

      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      const offset = 70;

      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');

      window.scrollTo({
        top: targetSection.offsetTop - offset,
        behavior: 'smooth'
      });

      if (window.innerWidth <= 768) {
        navMenu.classList.remove('active');
      }
    });
  });

  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function () {
      showTab(this.getAttribute('data-tab'));
    });
  });

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 100;
    let currentSectionId = '';

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId === 'about') {
      const activeTabContent = document.querySelector('.tab-content.active');
      if (activeTabContent) {
        const tabId = activeTabContent.id.replace('-content', '');
        document.querySelectorAll('.nav-menu a').forEach(link => link.classList.remove('active'));
        const tabLink = document.querySelector(`.nav-menu a[onclick="showTab('${tabId}')"]`);
        if (tabLink) tabLink.classList.add('active');
        return;
      }
    }

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
});

function showTab(tabId) {
  const tabButtons = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => btn.classList.remove('active'));
  tabContents.forEach(tab => tab.classList.remove('active'));

  const activeBtn = document.querySelector(`.tab[data-tab="${tabId}"]`);
  const activeContent = document.getElementById(`${tabId}-content`);

  if (activeBtn) activeBtn.classList.add('active');
  if (activeContent) activeContent.classList.add('active');

  const aboutSection = document.getElementById('about');
  const offset = 70;
  const position = aboutSection.offsetTop - offset;

  if (window.scrollY < position || window.scrollY > position + aboutSection.offsetHeight) {
    window.scrollTo({
      top: position,
      behavior: 'smooth'
    });
  }
}

