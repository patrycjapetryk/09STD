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
  for (const video of videos) {
    video.load();
    setTimeout(() => {
      video.play();
    }, time);
  }
}
