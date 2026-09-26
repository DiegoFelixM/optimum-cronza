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
    const getValue = field => String(data.get(field) || '').trim();
    const company = getValue('empresa');
    const message = [
      'Hola, me gustaría solicitar una cotización de seguridad privada.',
      '',
      `Nombre: ${getValue('nombre')}`,
      ...(company ? [`Empresa: ${company}`] : []),
      `Teléfono: ${getValue('telefono')}`,
      `Correo: ${getValue('correo')}`,
      '',
      'Mensaje:',
      getValue('mensaje')
    ].join('\n');
    const whatsappUrl = `https://wa.me/526679955569?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  });
  document.querySelector('#year').textContent = new Date().getFullYear();
});
