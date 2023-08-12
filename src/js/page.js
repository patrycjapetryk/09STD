fetch('../data/public-relations-and-events.json')
  .then((res) => res.json())
  .then((res) => {
    const data = res;
    const { description, projects } = data;
    const paragraph = document.querySelector('.gallery__paragraph--js');
    const gallery = document.querySelector('.gallery__container--js');

    paragraph.innerHTML = description;

    for (let project of projects) {
      const { image, title } = project;
      const template = `
      <a class="gallery__item" href="/project.html">
        <img class="gallery__image" src="${image}" alt=""/>
        <h3 class="gallery__name">${title}</h3>
      </a>
      `;

      gallery.innerHTML += template;
    }
  })
  .catch((err) => console.log(err));
