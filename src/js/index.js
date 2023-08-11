import '../scss/main.scss';

// console.log('Hello :)');

fetch('../data/homepage.json')
  .then((res) => res.json())
  .then((data) => console.log(data));
