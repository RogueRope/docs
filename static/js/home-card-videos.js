(() => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const supportsHover = window.matchMedia("(hover: hover) and (pointer: fine)");
  const isReducedMotion = () => prefersReducedMotion.matches;
  const isDesktopHover = () => supportsHover.matches;

  const resetVideo = (card, video) => {
    card.dataset.videoActive = "false";
    video.pause();
    video.loop = false;
    try {
      video.currentTime = 0;
    } catch (_error) {
    }
  };

  const playVideo = (card, video, { loop = false } = {}) => {
    card.dataset.videoActive = "true";
    video.loop = loop;
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

  const setupCard = (card) => {
    const video = card.querySelector("[data-hover-video]");
    if (!video) {
      return null;
    }

    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const api = {
      card,
      video,
      playDesktopHover() {
        playVideo(card, video, { loop: false });
      },
      playMobileAutoplay() {
        playVideo(card, video, { loop: true });
      },
      reset() {
        resetVideo(card, video);
      }
    };

    if (isDesktopHover()) {
      card.addEventListener("pointerenter", api.playDesktopHover);
      card.addEventListener("pointerleave", api.reset);
      card.addEventListener("dragstart", api.reset);
    }

    return api;
  };

  const setupMobileAutoplay = (entries) => {
    let activeEntry = null;
    let ticking = false;

    const visibleRatio = (rect) => {
      const visibleHeight = Math.max(
        0,
        Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
      );
      return visibleHeight / Math.max(rect.height, 1);
    };

    const pickCenterCard = () => {
      ticking = false;

      if (isDesktopHover() || isReducedMotion()) {
        if (activeEntry) {
          activeEntry.reset();
          activeEntry = null;
        }
        return;
      }

      const viewportCenter = window.innerHeight / 2;
      const maxDistance = window.innerHeight * 0.36;
      let bestEntry = null;
      let bestDistance = Number.POSITIVE_INFINITY;

      entries.forEach((entry) => {
        const rect = entry.card.getBoundingClientRect();
        const ratio = visibleRatio(rect);
        if (ratio < 0.35) {
          if (activeEntry === entry) {
            entry.reset();
            activeEntry = null;
          }
          return;
        }

        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - viewportCenter);

        if (distance < bestDistance && distance <= maxDistance) {
          bestDistance = distance;
          bestEntry = entry;
        }
      });

      if (bestEntry === activeEntry) {
        return;
      }

      if (activeEntry) {
        activeEntry.reset();
      }

      activeEntry = bestEntry;

      if (activeEntry) {
        activeEntry.playMobileAutoplay();
      }
    };

    const schedule = () => {
      if (ticking) {
        return;
      }
      ticking = true;
      window.requestAnimationFrame(pickCenterCard);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    supportsHover.addEventListener("change", schedule);
    prefersReducedMotion.addEventListener("change", schedule);
    schedule();
  };

  document.addEventListener("DOMContentLoaded", () => {
    const entries = Array.from(document.querySelectorAll("[data-hover-video-card='true']"))
      .map(setupCard)
      .filter(Boolean);

    if (!entries.length || isReducedMotion()) {
      return;
    }

    if (!isDesktopHover()) {
      setupMobileAutoplay(entries);
    }
  });
})();
