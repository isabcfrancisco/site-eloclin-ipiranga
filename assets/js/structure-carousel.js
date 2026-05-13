window.Eloclin = window.Eloclin || {};

window.Eloclin.initStructureCarousel = function initStructureCarousel() {
  const carousel = document.querySelector('.estrutura-carousel');
  const track = document.getElementById('estrutura-gallery');
  if (!carousel || !track) return;

  const previous = carousel.querySelector('.estrutura-arrow-prev');
  const next = carousel.querySelector('.estrutura-arrow-next');

  const scrollBySlide = (direction) => {
    const slide = track.querySelector('.estrutura-item');
    const distance = slide ? slide.getBoundingClientRect().width + 14 : track.clientWidth * 0.86;
    track.scrollBy({ left: direction * distance, behavior: 'smooth' });
  };

  previous?.addEventListener('click', () => scrollBySlide(-1));
  next?.addEventListener('click', () => scrollBySlide(1));
};
