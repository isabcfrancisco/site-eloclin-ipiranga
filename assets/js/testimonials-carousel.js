window.Eloclin = window.Eloclin || {};

window.Eloclin.initTestimonialsCarousel = function initTestimonialsCarousel() {
  const carousel = document.querySelector('.depo-carousel');
  const track = document.getElementById('depo-gallery');
  if (!carousel || !track) return;

  const previous = carousel.querySelector('.depo-arrow-prev');
  const next = carousel.querySelector('.depo-arrow-next');

  const scrollByCard = (direction) => {
    const card = track.querySelector('.depo-card');
    const distance = card ? card.getBoundingClientRect().width + 14 : track.clientWidth * 0.88;
    track.scrollBy({ left: direction * distance, behavior: 'smooth' });
  };

  previous?.addEventListener('click', () => scrollByCard(-1));
  next?.addEventListener('click', () => scrollByCard(1));
};
