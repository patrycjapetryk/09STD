export const pagesNames: string[] = [
  'public-relations-and-events',
  'influencers',
  'graphic-design',
  'social-media',
];

export function lazyImageLoader(lazyImages: NodeListOf<HTMLImageElement>) {
  if ('IntersectionObserver' in window) {
    const lazyImageObserver = new IntersectionObserver(function (entries) {
      for (const entry of entries) {
        const image = entry.target as HTMLImageElement;

        if (entry.isIntersecting) {
          image.src = image.dataset.src;
          image.classList.remove('lazy-image');
          lazyImageObserver.unobserve(image);
        }
      }
    });

    lazyImages.forEach(function (lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  }
}

export function lazyVideoLoader(lazyVideos: NodeListOf<HTMLVideoElement>) {
  if ('IntersectionObserver' in window) {
    const lazyVideoObserver = new IntersectionObserver(function (entries) {
      for (const entry of entries) {
        const video = entry.target as HTMLVideoElement;

        if (entry.isIntersecting) {
          const videoSource = video.querySelector('source');
          videoSource.src = videoSource.dataset.src;
          video.load();
          video.play();
          video.classList.remove('lazy-video');
          lazyVideoObserver.unobserve(video);
        }
      }
    });

    lazyVideos.forEach(function (lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }
}
