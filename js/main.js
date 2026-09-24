document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');

  const syncHeader = () => header.classList.toggle('scrolled', window.scrollY > 24);
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));

  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }), { threshold: .14 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...nav.querySelectorAll('a')];
  const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) navLinks.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
  }), { rootMargin: '-35% 0px -55%' });
  sections.forEach(section => sectionObserver.observe(section));

  document.querySelector('#quote-form').addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = `Hola, soy ${data.get('nombre')}${data.get('empresa') ? ` de ${data.get('empresa')}` : ''}.%0A%0ATeléfono: ${data.get('telefono')}%0ACorreo: ${data.get('correo')}%0A%0A${data.get('mensaje')}`;
    window.open(`https://wa.me/526679955569?text=${encodeURI(message)}`, '_blank', 'noopener');
  });
  document.querySelector('#year').textContent = new Date().getFullYear();
});
