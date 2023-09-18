fetch('../data/homepage.json')
  .then((res) => res.json())
  .then((res) => {
    const data = res.projects;
    const slider: HTMLElement = document.querySelector('.home-page--js');
    let changeImagesOnTimeoutTimer: ReturnType<typeof setTimeout>;
    let countImages = 0;

    const loadContent = () => {
      for (const slide of data) {
        const { image, description } = slide;
        let template: string;

        if (image.includes('mp4')) {
          template = `
        <video muted loop playsinline autoplay class="home-page__video home-page__image--js">
          <source src="${image}" type="video/mp4" />
        </video>
        <h3 class="home-page__description home-page__description--js">${description}</h3>
        `;
        } else {
          template = `
        <img class="home-page__image home-page__image--js" src=${image} alt=""/>
        <h3 class="home-page__description home-page__description--js">${description}</h3>
        `;
        }

        slider.innerHTML += template;
      }

      const homepageVideos =
        document.querySelectorAll<HTMLVideoElement>('video');

      for (const video of homepageVideos) {
        // video.load();
        setTimeout(() => {
          if (video.paused) video.play();
        }, 1000);
      }
    };

    const changeImagesOnMousemove = (event: MouseEvent) => {
      const images = document.querySelectorAll<HTMLElement>(
        '.home-page__image--js',
      );
      const galleryDescriptions = document.querySelectorAll<HTMLElement>(
        '.home-page__description--js',
      );
      const imagesLength = images.length;
      const cursorX = event.clientX;
      const partWidth = slider.getBoundingClientRect().width / imagesLength;
      const sliderLeft = slider.getBoundingClientRect().left;

      for (let i = 0; i < imagesLength; i++) {
        const partMinimum = partWidth * i + sliderLeft;
        const partMaximum = partWidth * (i + 1) + sliderLeft;
        const image = images[i];
        const galleryDescription = galleryDescriptions[i];

        if (cursorX >= partMinimum && cursorX < partMaximum) {
          image.style.opacity = '1';
          galleryDescription.style.opacity = '1';
        } else {
          image.style.opacity = '0';
          galleryDescription.style.opacity = '0';
        }
      }
    };

    const changeImagesOnTimeout = () => {
      const images = document.querySelectorAll<HTMLElement>(
        '.home-page__image--js',
      );
      const imagesLength = images.length;

      for (let i = 0; i < imagesLength; i++) {
        const image = images[i];

        if (i == countImages) {
          image.style.opacity = '1';
        } else {
          image.style.opacity = '0';
        }
      }
      if (countImages < imagesLength - 1) {
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
