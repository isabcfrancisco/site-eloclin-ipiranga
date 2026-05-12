window.Eloclin = window.Eloclin || {};

window.Eloclin.initAccordion = function initAccordion() {
  const items = document.querySelectorAll('.acc-item');
  if (!items.length) return;

  items.forEach((item, index) => {
    const button = item.querySelector('.acc-head');
    const panel = item.querySelector('.acc-body');
    if (!button || !panel) return;

    const buttonId = button.id || `especialidade-btn-${index + 1}`;
    const panelId = panel.id || `especialidade-panel-${index + 1}`;
    button.id = buttonId;
    button.setAttribute('aria-controls', panelId);
    panel.id = panelId;
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-labelledby', buttonId);

    button.addEventListener('click', () => {
      const isOpen = button.getAttribute('aria-expanded') === 'true';

      items.forEach(other => {
        const otherButton = other.querySelector('.acc-head');
        const otherPanel = other.querySelector('.acc-body');
        other.classList.remove('acc-open');
        otherButton?.setAttribute('aria-expanded', 'false');
        if (otherPanel) otherPanel.hidden = true;
      });

      if (!isOpen) {
        item.classList.add('acc-open');
        button.setAttribute('aria-expanded', 'true');
        panel.hidden = false;
      }
    });
  });
};
