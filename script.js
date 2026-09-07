const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const yearNode = document.getElementById('year');
const revealItems = document.querySelectorAll('.reveal');
const themeToggle = document.querySelector('.theme-toggle');

if (siteNav && !document.body.classList.contains('home-page')) {
  siteNav.setAttribute('aria-label', 'Primary navigation');
  siteNav.innerHTML = `
    <a href="index.html#about">About</a>
    <div class="nav-item has-menu">
      <a href="index.html#experience" class="nav-label">Academics</a>
      <button class="nav-trigger" aria-expanded="false" aria-controls="academics-menu" aria-label="Open Academics menu"><span class="chevron">▾</span></button>
      <div id="academics-menu" class="dropdown-menu">
        <a href="index.html#experience">Overview</a>
        <a href="high-school-cumberland-valley.html">Cumberland Valley High School</a>
        <a href="course-calculus-1.html">Calculus 1</a>
        <a href="course-academic-analytical-writing.html">Academic and Analytical Writing</a>
        <a href="course-introductory-physics-1.html">Introductory Physics 1</a>
        <a href="course-integrated-engineering-practice.html">Integrated Engineering Practice</a>
      </div>
    </div>
    <div class="nav-item has-menu">
      <a href="index.html#skills" class="nav-label">Skills</a>
      <button class="nav-trigger" aria-expanded="false" aria-controls="skills-menu" aria-label="Open Skills menu"><span class="chevron">▾</span></button>
      <div id="skills-menu" class="dropdown-menu">
        <a href="index.html#skills">Overview</a>
        <a href="skill-cad.html">CAD</a>
        <a href="skill-bim.html">BIM</a>
        <a href="skill-python.html">Python</a>
        <a href="skill-ai.html">AI</a>
      </div>
    </div>
    <div class="nav-item has-menu">
      <a href="index.html#research" class="nav-label">Research</a>
      <button class="nav-trigger" aria-expanded="false" aria-controls="research-menu" aria-label="Open Research menu"><span class="chevron">▾</span></button>
      <div id="research-menu" class="dropdown-menu">
        <a href="index.html#research">Overview</a>
        <a href="research-preparation.html">Research preparation</a>
        <a href="research-mentorship.html">Mentorship</a>
        <a href="research-learning-areas.html">Learning areas</a>
      </div>
    </div>
    <div class="nav-item has-menu">
      <a href="index.html#hobbies" class="nav-label">Hobbies</a>
      <button class="nav-trigger" aria-expanded="false" aria-controls="hobbies-menu" aria-label="Open Hobbies menu"><span class="chevron">▾</span></button>
      <div id="hobbies-menu" class="dropdown-menu">
        <a href="index.html#hobbies">Overview</a>
        <a href="hobbies-interests.html">Full Hobbies &amp; Interests</a>
        <a href="hobbies-camping-hiking.html">Camping &amp; Hiking</a>
        <a href="hobbies-history-philosophy-psychology.html">History, Philosophy &amp; Psychology</a>
      </div>
    </div>
    <a href="index.html#contact">Contact</a>
  `;
}

const navTriggers = document.querySelectorAll('.nav-trigger');

let savedTheme = null;
try {
  savedTheme = localStorage.getItem('portfolio-theme');
} catch (error) {
  savedTheme = null;
}

if (savedTheme === 'dark') {
  document.documentElement.dataset.theme = 'dark';
  document.body.classList.add('dark-mode');
}

if (themeToggle) {
  const updateThemeToggle = () => {
    const isDark = document.documentElement.dataset.theme === 'dark';
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggle.querySelector('.theme-icon').textContent = isDark ? '☀' : '◐';
    themeToggle.querySelector('.theme-label').textContent = isDark ? 'Light' : 'Dark';
  };

  updateThemeToggle();

  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.dataset.theme === 'dark';
    document.documentElement.dataset.theme = isDark ? 'light' : 'dark';
    document.body.classList.toggle('dark-mode', !isDark);
    try {
      localStorage.setItem('portfolio-theme', isDark ? 'light' : 'dark');
    } catch (error) {
    }
    updateThemeToggle();
  });
}

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

navTriggers.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();

    const parent = button.closest('.nav-item');
    const isOpen = parent.classList.contains('open');

    document.querySelectorAll('.nav-item').forEach((item) => {
      item.classList.remove('open');
      const trigger = item.querySelector('.nav-trigger');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      parent.classList.add('open');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.nav-item')) {
    document.querySelectorAll('.nav-item').forEach((item) => {
      item.classList.remove('open');
      const trigger = item.querySelector('.nav-trigger');
      if (trigger) trigger.setAttribute('aria-expanded', 'false');
    });
  }
});

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('open');
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      siteNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => observer.observe(item));
