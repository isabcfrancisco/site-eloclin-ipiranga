const focusableSelector = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

window.Eloclin = window.Eloclin || {};

window.Eloclin.initLightbox = function initLightbox() {
  const galleryItems = Array.from(document.querySelectorAll('.estrutura-item'));
  const lightbox = document.getElementById('gallery-lightbox');
  if (!galleryItems.length || !lightbox) return;

  const image = document.getElementById('lightbox-image');
  const caption = document.getElementById('lightbox-caption');
  const closeButton = lightbox.querySelector('.lightbox-close');
  const previousButton = lightbox.querySelector('.lightbox-prev');
  const nextButton = lightbox.querySelector('.lightbox-next');

  if (!image || !caption || !closeButton || !previousButton || !nextButton) return;

  let currentIndex = 0;
  let lastFocusedElement = null;

  const showImage = (index) => {
    currentIndex = (index + galleryItems.length) % galleryItems.length;
    const selectedImage = galleryItems[currentIndex].querySelector('img');
    if (!selectedImage) return;

    image.src = selectedImage.currentSrc || selectedImage.src;
    image.alt = selectedImage.alt;
    caption.textContent = selectedImage.alt;
  };

  const open = (index) => {
    lastFocusedElement = document.activeElement;
    showImage(index);
    lightbox.hidden = false;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('lightbox-open');
    closeButton.focus();
  };

  const close = () => {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('lightbox-open');
    lightbox.hidden = true;
    lastFocusedElement?.focus();
  };

  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => open(index));
  });

  closeButton.addEventListener('click', close);
  previousButton.addEventListener('click', () => showImage(currentIndex - 1));
  nextButton.addEventListener('click', () => showImage(currentIndex + 1));

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) close();
  });

  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('active')) return;

    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (event.key === 'ArrowRight') showImage(currentIndex + 1);

    if (event.key === 'Tab') {
      const focusable = Array.from(lightbox.querySelectorAll(focusableSelector));
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
};
