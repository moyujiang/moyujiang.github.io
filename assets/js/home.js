(() => {
  const root = document.documentElement;
  const preference = window.matchMedia('(prefers-color-scheme: dark)');
  let savedTheme;
  try { savedTheme = localStorage.getItem('theme'); } catch (_) {}
  let manualTheme = savedTheme === 'dark' || savedTheme === 'light' ? savedTheme : null;
  let button;

  function applyTheme() {
    const theme = manualTheme || (preference.matches ? 'dark' : 'light');
    root.dataset.theme = theme;
    if (button) {
      const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
      button.setAttribute('aria-label', label);
      button.title = label;
    }
  }

  applyTheme();
  preference.addEventListener('change', applyTheme);
  document.addEventListener('DOMContentLoaded', () => {
    button = document.querySelector('.theme-toggle');
    if (!button) return;
    button.hidden = false;
    applyTheme();
    button.addEventListener('click', () => {
      manualTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem('theme', manualTheme); } catch (_) {}
      applyTheme();
    });
  });
})();
