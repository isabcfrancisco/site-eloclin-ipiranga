window.Eloclin = window.Eloclin || {};

function setupMobileColumns(items) {
  const accordion = document.getElementById('especialidades-accordion');
  if (!accordion || accordion.querySelector('.acc-mobile-col')) return;

  const columns = [document.createElement('div'), document.createElement('div')];
  columns.forEach(column => {
    column.className = 'acc-mobile-col';
  });

  items.forEach((item, index) => {
    columns[index % 2].appendChild(item);
  });

  accordion.replaceChildren(...columns);
}

window.Eloclin.initAccordion = function initAccordion() {
  const items = Array.from(document.querySelectorAll('.acc-item'));
  if (!items.length) return;

  setupMobileColumns(items);

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
