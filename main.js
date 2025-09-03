// main.js - scroll spy and initial highlight
document.addEventListener('DOMContentLoaded', () => {
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navLinks = Array.from(document.querySelectorAll('.nav-links a'));

  const updateActive = () => {
    // find the section nearest to top quarter of viewport
    let currentId = sections[0]?.id || '';
    for (const section of sections) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.35) {
        currentId = section.id;
      }
    }
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
  };

  // run on load and on scroll
  updateActive();
  window.addEventListener('scroll', updateActive, { passive: true });

  // optional: smooth-scroll offset (for browsers that jump)
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // default smooth behavior via CSS; ensure visible below fixed nav
      // allow default; but close any mobile nav here if added later
    });
  });
});
