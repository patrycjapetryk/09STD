const pageUrl = window.location.href;
const pagesNames = [
  'public-relations-and-events',
  'influencers',
  'graphic-design',
  'social-media',
];

let pageSlug = '';
let dataUrl = '';

for (let pageName of pagesNames) {
  if (pageUrl.includes(pageName)) {
    pageSlug = pageName;
    dataUrl = `../data/${pageSlug}.json`;
    break;
  }
}

fetch(dataUrl)
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
      const template = `
      <a class="gallery__item" href="/${pageSlug}/project?id=${projectIndex}">
        <img class="gallery__image" src="${image}" alt=""/>
        <h3 class="gallery__name">${title}</h3>
      </a>
      `;

      gallery.innerHTML += template;
    }
  })
  .catch((err) => console.log(err));
