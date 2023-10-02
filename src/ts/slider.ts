import { lazyVideoLoader } from './helpers';

fetch('../data/homepage.json')
  .then((res) => res.json())
  .then((res) => {
    const data = res.projects;
    const slider: HTMLElement = document.querySelector('.home-page--js');
    let changeImagesOnTimeoutTimer: ReturnType<typeof setTimeout>;
    let countImages = 0;

    const loadContent = () => {
      for (const slide of data) {
        const { image, description, poster } = slide;
        let template: string;

        if (image.includes('mp4')) {
          template = `
        <figure class="figure figure--js">
          <video muted loop playsinline  poster="${
            poster ? poster : ''
          }" class="home-page__video lazy-video">
            <source data-src="${image}" type="video/mp4" />
          </video>
          <figcaption class="home-page__description">${description}</figcaption>
        </figure>
        `;
        } else {
          template = `
        <figure class="figure figure--js">
          <img class="home-page__image" src=${image} alt="${description}"/>
          <figcaption class="home-page__description">${description}</figcaption>
        </figure>
        `;
        }

        slider.innerHTML += template;
      }

      const homepageVideos =
        document.querySelectorAll<HTMLVideoElement>('.lazy-video');
      lazyVideoLoader(homepageVideos);
    };

    const changeImagesOnMousemove = (event: MouseEvent) => {
      const figures = document.querySelectorAll<HTMLElement>('.figure--js');
      const figuresLength = figures.length;
      const cursorX = event.clientX;
      const partWidth = slider.getBoundingClientRect().width / figuresLength;
      const sliderLeft = slider.getBoundingClientRect().left;

      for (let i = 0; i < figuresLength; i++) {
        const partMinimum = partWidth * i + sliderLeft;
        const partMaximum = partWidth * (i + 1) + sliderLeft;
        const figure = figures[i];

        if (cursorX >= partMinimum && cursorX < partMaximum) {
          figure.style.opacity = '1';
        } else {
          figure.style.opacity = '0';
        }
      }
    };

    const changeImagesOnTimeout = () => {
      const figures = document.querySelectorAll<HTMLElement>('.figure--js');
      const figuresLength = figures.length;

      for (let i = 0; i < figuresLength; i++) {
        const image = figures[i];

        if (i == countImages) {
          image.style.opacity = '1';
        } else {
          image.style.opacity = '0';
        }
      }
      if (countImages < figuresLength - 1) {
        countImages++;
      } else {
        countImages = 0;
      }

      changeImagesOnTimeoutTimer = setTimeout(changeImagesOnTimeout, 1000);
    };

    const mediaQuery = () => {
      const queryWidth = window.matchMedia('(min-width: 1024px)');

      clearTimeout(changeImagesOnTimeoutTimer);
      if (queryWidth.matches) {
        slider.addEventListener('mousemove', changeImagesOnMousemove);
      } else {
        slider.removeEventListener('mousemove', changeImagesOnMousemove);
        changeImagesOnTimeout();
      }
    };

    loadContent();
    mediaQuery();
    window.addEventListener('resize', mediaQuery);
  })
  .catch((err) => console.log(err));
