export const pagesNames: string[] = [
  'public-relations-and-events',
  'influencers',
  'graphic-design',
  'social-media',
];

export function videoLoader(
  videos: NodeListOf<HTMLVideoElement>,
  time: number,
) {
  // let index = 0;
  for (const video of videos) {
    // video.load();
    setTimeout(() => {
      video.play();
    }, time);
    // index++;
    // console.log(`${index} | ${video} | ${time}`);
    // console.log(`${index} :)`);
  }
}
