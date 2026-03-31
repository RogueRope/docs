(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)");

  if (prefersReducedMotion.matches || !supportsHover.matches) {
    return;
  }

  const setupCard = (card) => {
    const video = card.querySelector("[data-hover-video]");
    if (!video) {
      return;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const reset = () => {
      card.dataset.videoActive = "false";
      video.pause();
      try {
        video.currentTime = 0;
      } catch (_error) {
      }
    };

    const play = () => {
      card.dataset.videoActive = "true";
      video.load();

      try {
        video.currentTime = 0;
      } catch (_error) {
      }

      const playback = video.play();
      if (playback && typeof playback.catch === "function") {
        playback.catch(() => {
          card.dataset.videoActive = "false";
        });
      }
    };

    card.addEventListener("pointerenter", play);
    card.addEventListener("pointerleave", reset);
    card.addEventListener("dragstart", reset);
  };

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-hover-video-card='true']").forEach(setupCard);
  });
})();
