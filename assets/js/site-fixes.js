(() => {
  const syncMobileSidebarA11y = () => {
    const menu = document.querySelector(".hextra-hamburger-menu");
    const sidebarContainer = document.querySelector(".hextra-sidebar-container");

    if (!menu || !sidebarContainer) {
      return;
    }

    const mobileQuery = window.matchMedia("(max-width: 767px)");

    const sync = () => {
      const isOpen = menu.getAttribute("aria-expanded") === "true";

      sidebarContainer.removeAttribute("aria-hidden");

      if (mobileQuery.matches) {
        sidebarContainer.inert = !isOpen;
      } else {
        sidebarContainer.inert = false;
      }
    };

    sync();
    menu.addEventListener("click", () => window.requestAnimationFrame(sync));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        window.requestAnimationFrame(sync);
      }
    });
    mobileQuery.addEventListener("change", sync);
    new MutationObserver(sync).observe(menu, {
      attributes: true,
      attributeFilter: ["aria-expanded"]
    });
    new MutationObserver(sync).observe(sidebarContainer, {
      attributes: true,
      attributeFilter: ["aria-hidden"]
    });
  };

  window.addEventListener("load", syncMobileSidebarA11y);
})();
