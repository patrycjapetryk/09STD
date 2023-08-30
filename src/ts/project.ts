const projectPagesNames: string[] = [
  'public-relations-and-events',
  'influencers',
  'graphic-design',
  'social-media',
];

let projectDataUrl: string;
const params = new URLSearchParams(location.search);

if (!params.get('id')) {
  params.set('id', '1');
  window.history.replaceState({}, '', `${location.pathname}?${params}`);
}

const projectId: string = params.get('id');

for (const pageName of projectPagesNames) {
  if (location.href.includes(pageName)) {
    projectDataUrl = `../../data/${pageName}.json`;
    break;
  }
}

fetch(projectDataUrl)
  .then((res) => res.json())
  .then((res) => {
    const data = res.projects;

    let currentProject = data[Number(projectId) - 1];

    if (!currentProject) {
      params.set('id', `${data.length}`);
      window.history.replaceState({}, '', `${location.pathname}?${params}`);
      currentProject = data[Number(data.length - 1)];
    }

    const { title, description, photos } = currentProject;

    const header = document.querySelector('.page-header--js a');
    const paragraph = document.querySelector('.project__paragraph--js');
    const project = document.querySelector('.project__container--js');

    header.innerHTML = title;
    paragraph.innerHTML = description;

    for (const photo of photos) {
      const { image, size } = photo;
      let template: string;

      if (image.includes('mp4')) {
        template = `
        <div class="project__item ${
          size === 'large' || 'project__item--vertical'
        }">
          <video muted loop playsinline autoplay class="gallery__video project__video--js">
            <source src="${image}" type="video/mp4" />
          </video>
        </div>
        `;
      } else {
        template = `
        <div class="project__item ${
          size === 'large' || 'project__item--vertical'
        }">
          <img class="project__image" src="${image}" alt=""/>
        </div>
        `;
      }

      project.innerHTML += template;
    }

    const projectVideos = document.querySelectorAll<HTMLVideoElement>(
      '.project__video--js',
    );

    for (const video of projectVideos) {
      video.load();
      setTimeout(() => {
        video.play();
      }, 1000);
    }
  })
  .catch((err) => console.log(err));
