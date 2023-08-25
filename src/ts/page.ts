const pagePagesNames: string[] = [
  'public-relations-and-events',
  'influencers',
  'graphic-design',
  'social-media',
];

let pageSlug: string;
let pageDataUrl: string;

for (const pageName of pagePagesNames) {
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
      const { image, title } = project;
      let template: string;
      if (image.includes('mp4')) {
        template = `
      <a class="gallery__item" href="/${pageSlug}/project?id=${projectIndex}">
        <video muted autoplay loop playsinline class="gallery__video">
          <source src="${image}" type="video/mp4" />
        </video>
        <h3 class="gallery__name">${title}</h3>
      </a>
      `;
      } else {
        template = `
      <a class="gallery__item" href="/${pageSlug}/project?id=${projectIndex}">
        <img class="gallery__image" src="${image}" alt="${title}"/>
        <h3 class="gallery__name">${title}</h3>
      </a>
      `;
      }

      gallery.innerHTML += template;
    }
  })
  .catch((err) => console.log(err));
