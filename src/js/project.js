const params = new URLSearchParams(location.search);

if (!params.get('id')) {
  params.set('id', 1);
  window.history.replaceState({}, '', `${location.pathname}?${params}`);
}

const projectId = params.get('id');
const pageUrl = window.location.href;
const pagesNames = [
  'public-relations-and-events',
  'influencers',
  'graphic-design',
  'social-media',
];

let dataUrl = '';

for (let pageName of pagesNames) {
  if (pageUrl.includes(pageName)) {
    dataUrl = `../data/${pageName}.json`;
    break;
  }
}

fetch(dataUrl)
  .then((res) => res.json())
  .then((res) => {
    const data = res.projects;
    const { title, description, photos } = data[projectId - 1];
    const header = document.querySelector('.page-header--js a');
    const paragraph = document.querySelector('.project__paragraph--js');
    const project = document.querySelector('.project__container--js');

    header.innerHTML = title;
    paragraph.innerHTML = description;

    for (const photo of photos) {
      const { image, size } = photo;
      const template = `
      <div class="project__item ${
        size === 'large' || 'project__item--vertical'
      }">
        <img class="project__image" src="${image}" alt=""/>
      </div>
      `;

      project.innerHTML += template;
    }
  })
  .catch((err) => console.log(err));
