(() => {
  "use strict";

  // global object
  const AC = {};

  // offcanvas navbar
  AC.offcanvasNavbar = () => {
    const toggler = document.querySelector("#navbarSideCollapse");
    const offcanvasNavbar = document.querySelector(".offcanvas-collapse");

    toggler.addEventListener("click", () => {
      offcanvasNavbar.classList.toggle("open");

      AC.rebootBodyStyles();
    });
  };

  // reboot body styles
  AC.rebootBodyStyles = () => {
    const offcanvasNavbar = document.querySelector(".offcanvas-collapse");
    const screenWidth = window.innerWidth;

    if (offcanvasNavbar.classList.contains("open") && screenWidth < 992) {
      return document.body.classList.add("overflow-y-hidden");
    }

    document.body.classList.remove("overflow-y-hidden");
  };

  // scrolled header
  AC.scrolledHeader = () => {
    const header = document.getElementById("header-main"),
      headerHeight = header.clientHeight,
      scorlledPosition = window.scrollY,
      classes = "header-scrolled shadow".split(" ");

    if (scorlledPosition > headerHeight) {
      header.classList.add(...classes);
      return;
    }

    header.classList.remove(...classes);
  };

  // initialize slider
  AC.initSlider = (selector, options = {}) => {
    const container = document.querySelector(selector);

    if (!container) return;

    const slider = new Splide(container, options);

    slider.mount();
  };

  // construct all the sliders
  AC.constructSliders = () => {
    AC.initSlider("#banner-carousel", {
      type: "loop",
      speed: 750,
      focus: "center",
      gap: "1.125rem",
      padding: "1rem",
      arrows: false,
      pagination: true,
      easing: "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
      autoplay: true,
      updateOnMove: true,
      mediaQuery: "min",
      breakpoints: {
        576: {
          gap: "1rem",
          arrows: true,
          padding: "10%",
        },
        768: {
          gap: "1.5rem",
          padding: "15%",
        },
        992: {
          gap: "1.875rem",
          padding: "20%",
        },
      },
    });
    AC.initSlider("#featured-post-carousel", {
      type: "loop",
      speed: 750,
      pagination: true,
      easing: "cubic-bezier(0.455, 0.03, 0.515, 0.955)",
      autoplay: true,
      arrows: false,
    });
  };

  // initialize nice select 2
  AC.initNiceSelect2 = (selector = ".ac-select", options = {}) => {
    const selectElem = document.querySelector(selector);

    if (!selectElem) return;

    const niceSelect = NiceSelect.bind(selectElem, options);

    return niceSelect;
  };

  // construct nice select 2
  AC.niceSelectElements = () => {
    AC.initNiceSelect2(".ac-select");
  };

  // video modal
  AC.videoModal = () => {
    const modals = Array.from(document.getElementsByClassName("media-modal"));

    modals.forEach((modal) => {
      const mediaEl = modal.querySelector("iframe");
      const mediaSrc = mediaEl.dataset.src || mediaEl.getAttribute("data-src");

      modal.addEventListener("show.bs.modal", (event) => {
        mediaEl.src = mediaSrc;
      });

      modal.addEventListener("hide.bs.modal", (event) => {
        mediaEl.src = "";
      });
    });
  };

  // load more posts
  AC.loadMorePosts = () => {
    const loadBtn = document.getElementById("load-more-post-btn");

    loadBtn.addEventListener("click", function () {
      const posts =
        this.closest(".blog-posts").querySelectorAll(".loadable-post");

      // hide load more button
      this.remove();

      // show rest of the posts
      posts.forEach((post) => {
        post.classList.remove("loadable-post");
      });
    });
  };

  // window on load
  window.addEventListener("DOMContentLoaded", () => {
    AC.offcanvasNavbar();
    AC.scrolledHeader();
    AC.rebootBodyStyles();
    AC.niceSelectElements();
    AC.constructSliders();
    AC.videoModal();
    AC.loadMorePosts();
  });

  // window on scroll
  window.addEventListener("scroll", () => {
    AC.scrolledHeader();
  });

  // window on resize
  window.addEventListener("resize", () => {
    AC.rebootBodyStyles();
  });
})();
