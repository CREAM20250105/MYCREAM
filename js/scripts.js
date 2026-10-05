'use strict';
const menuButton = document.querySelector('.menu-button');
const nav = document.getElementById('site-nav');
function closeMenu() {
  if (!menuButton || !nav) return;
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'メニューを開く');
}
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const open = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    nav.classList.toggle('is-open', open);
  });
  nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
  document.addEventListener('click', event => { if (!nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); } });
}
const themeButton = document.querySelector('.theme-button');
function setTheme(dark) {
  document.body.classList.toggle('dark-mode', dark);
  if (themeButton) {
    themeButton.setAttribute('aria-pressed', String(dark));
    themeButton.setAttribute('aria-label', dark ? 'ライトモードに切り替える' : 'ダークモードに切り替える');
  }
}
try { setTheme(localStorage.getItem('theme') === 'dark'); } catch (_) { setTheme(false); }
if (themeButton) themeButton.addEventListener('click', () => {
  const dark = !document.body.classList.contains('dark-mode');
  setTheme(dark);
  try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (_) {}
});
const scrollTopButton = document.querySelector('.scroll-top');
if (scrollTopButton) {
  const updateScrollButton = () => { scrollTopButton.hidden = window.scrollY < 500; };
  window.addEventListener('scroll', updateScrollButton, {passive: true});
  updateScrollButton();
  scrollTopButton.addEventListener('click', () => {
    window.scrollTo({top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  });
}
