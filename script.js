const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// --- GA4 Click Tracking ---
function track(event_name, params) {
  if (typeof gtag === 'function') gtag('event', event_name, params);
}

// Nav links
document.querySelectorAll('nav .nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    track('nav_click', { link_text: a.textContent.trim() });
  });
});

// Hero CTA buttons
document.querySelectorAll('.hero-cta .btn').forEach(btn => {
  btn.addEventListener('click', () => {
    track('hero_cta_click', { button_text: btn.textContent.trim() });
  });
});

// Project cards
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('click', (e) => {
    const name = card.querySelector('.project-name')?.textContent.trim();
    const target = e.target.closest('a');
    track('project_click', {
      project_name: name,
      link_url: target?.href || card.href || '(no link)'
    });
  });
});

// "View all repos" button
const allReposBtn = document.querySelector('a[href="https://github.com/goksungurel"]');
if (allReposBtn && allReposBtn.textContent.includes('repositories')) {
  allReposBtn.addEventListener('click', () => {
    track('github_all_repos_click', {});
  });
}

// Contact links
document.querySelectorAll('.contact-links .contact-link').forEach(a => {
  a.addEventListener('click', () => {
    track('contact_click', { link_text: a.textContent.trim(), link_url: a.href });
  });
});
