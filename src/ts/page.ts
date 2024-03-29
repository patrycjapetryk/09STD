import { lazyVideoLoader, lazyImageLoader, pagesNames } from './helpers';

let pageSlug: string;
let pageDataUrl: string;

for (const pageName of pagesNames) {
  if (window.location.href.includes(pageName)) {
    pageSlug = pageName;
    pageDataUrl = `../data/${pageSlug}.json`;
    break;
  }
}

fetch(pageDataUrl)
  .then((res) => res.json())
  .then((res) => {
    const data = res;
    const { description, projects } = data;
    const paragraph = document.querySelector('.gallery__paragraph--js');
    const gallery = document.querySelector('.gallery__container--js');

    paragraph.innerHTML = description;

    let projectIndex = 0;

    for (const project of projects) {
      projectIndex++;
      const { image, title, poster } = project;
      let template: string;
      if (image.includes('mp4')) {
        template = `
      <a class="gallery__item" href="/${pageSlug}/project?id=${projectIndex}">
        <video muted loop playsinline poster="${
          poster ? poster : ''
        }" class="gallery__video lazy-video">
          <source data-src="${image}" type="video/mp4" />
        </video>
        <h3 class="gallery__name">${title}</h3>
      </a>
      `;
      } else {
        template = `
      <a class="gallery__item" href="/${pageSlug}/project?id=${projectIndex}">
        <img class="gallery__image lazy-image" src="" data-src="${image}" alt="${title}"/>
        <h3 class="gallery__name">${title}</h3>
      </a>
      `;
      }

      gallery.innerHTML += template;
    }

    const pageImages =
      document.querySelectorAll<HTMLImageElement>('.lazy-image');
    lazyImageLoader(pageImages);

    const pageVideos =
      document.querySelectorAll<HTMLVideoElement>('.lazy-video');
    lazyVideoLoader(pageVideos);
  })
  .catch((err) => console.log(err));
