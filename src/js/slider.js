const slider = document.querySelector('.home-page--js');
const images = document.querySelectorAll('.home-page__image--js');
const imagesLength = images.length;
const galleryDescriptions = document.querySelectorAll(
  '.home-page__description--js',
);
const queryWidth = window.matchMedia('(min-width: 1024px)');
let countImages = 0;

const changeImagesOnMousemove = (event) => {
  const cursorX = event.clientX;
  const partWidth = slider.getBoundingClientRect().width / imagesLength;
  const sliderLeft = slider.getBoundingClientRect().left;

  for (let i = 0; i < imagesLength; i++) {
    const partMinimum = partWidth * i + sliderLeft;
    const partMaximum = partWidth * (i + 1) + sliderLeft;

    if (cursorX >= partMinimum && cursorX < partMaximum) {
      images[i].style.opacity = 1;
      galleryDescriptions[i].style.opacity = 1;
    } else {
      images[i].style.opacity = 0;
      galleryDescriptions[i].style.opacity = 0;
    }
  }
};

const changeImagesOnMousemoveEvent = (event) => {
  changeImagesOnMousemove(event);
};

const mediaQuery = () => {
  if (queryWidth.matches) {
    slider.addEventListener('mousemove', changeImagesOnMousemoveEvent);
  } else {
    slider.removeEventListener('mousemove', changeImagesOnMousemoveEvent);
  }
};
window.addEventListener('load', mediaQuery);
window.addEventListener('resize', mediaQuery);
