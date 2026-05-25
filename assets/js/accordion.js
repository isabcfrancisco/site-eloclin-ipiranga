window.Eloclin = window.Eloclin || {};

window.Eloclin.initAccordion = function initAccordion() {
  const accordion = document.querySelector('.accordion');
  const items = Array.from(document.querySelectorAll('.acc-item'));
  if (!items.length) return;

  const getColumnCount = () => {
    if (window.matchMedia('(max-width: 580px)').matches) return 1;
    if (window.matchMedia('(max-width: 900px)').matches) return 2;
    return 3;
  };

  const arrangeColumns = () => {
    if (!accordion) return;

    const columns = getColumnCount();
    const currentColumns = Number(accordion.dataset.columns || 0);
    if (currentColumns === columns) return;

    accordion.dataset.columns = String(columns);
    accordion.replaceChildren();

    const columnElements = Array.from({ length: columns }, () => {
      const column = document.createElement('div');
      column.className = 'acc-col';
      accordion.appendChild(column);
      return column;
    });

    items.forEach((item, index) => {
      columnElements[index % columns].appendChild(item);
    });
  };

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

  arrangeColumns();
  window.addEventListener('resize', arrangeColumns);
};
