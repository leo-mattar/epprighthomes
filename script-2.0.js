// --- GSAP
gsap.registerPlugin(ScrollTrigger, Flip, ScrollToPlugin);

gsap.config({
  nullTargetWarn: false,
  trialWarn: false,
});

let mm = gsap.matchMedia();

// --- GLOBAL - RELOAD AT THE TOP
window.addEventListener("beforeunload", function () {
  history.scrollRestoration = "manual";
});

// --- LENIS
window.lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add(time => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

// --- PAPER TIGET SIGNATURE
const pprtgr = [
  "color: #F2F3F3",
  "background: #080808",
  "font-size: 12px",
  "padding-left: 10px",
  "line-height: 2",
  "border-left: 5px solid #ff3c31",
].join(";");
console.info(
  `

%cWebsite by Paper Tiger${" "}
www.papertiger.com${"     "}

`,
  pprtgr
);

// --- SAFARI CHECKER
function safariChecker() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

// --- SPLIT TEXT
let splitText;

function runSplit() {
  splitText = new SplitType("[split-txt]", {
    types: "words, chars",
  });
}

// --- CURRENT YEAR
const currentYear = document.querySelector("[current-year]");
if (currentYear) {
  currentYear.innerHTML = new Date().getFullYear();
}

// --- GLOBAL - PARALLAX WRAP
function parallaxWrap() {
  $("[parallax-wrap]").each(function (index) {
    let tl = gsap.timeline({
      defaults: { ease: "none" },
      scrollTrigger: {
        trigger: $(this),
        scrub: true,
        start: "top bottom",
        end: "bottom top",
      },
    });

    tl.fromTo($(this).find(".c-img"), { yPercent: -7 }, { yPercent: 7 });
  });
}

// --- GLOBAL - PARALLAX IMG
function parallaxImg() {
  let parallaxEl = document.querySelectorAll("[parallax]");

  parallaxEl.forEach(item => {
    let parallaxY = parseFloat(item.getAttribute("data-parallax-y")) || 0;
    let screenWidth = window.innerWidth;

    if (item.getAttribute("parallax") !== "mobile-false" || screenWidth > 991) {
      let tl = gsap.timeline({
        defaults: { ease: "none" },
      });

      tl.to(item, {
        yPercent: parallaxY,
        scrollTrigger: {
          trigger: item,
          scrub: true,
          start: "top bottom",
          end: "bottom top",
        },
      });
    }
  });
}

// --- GLOBAL - LINE ANIMATION
function drawLine() {
  // Draw line
  gsap.set("[draw-line]", {
    autoAlpha: 1,
    scaleX: 0,
    transformOrigin: "top left",
  });

  ScrollTrigger.batch("[draw-line]", {
    once: true,
    onEnter: batch =>
      gsap.to(batch, {
        scaleX: 1,
        delay: 0.1,
        duration: 2.4,
        ease: "power3.out",
        stagger: 0.1,
      }),
  });
}

// --- GLOBAL - VERTICAL LINE ANIMATION
function drawVerticalLine() {
  // Draw line
  gsap.set("[draw-vertical-line]", {
    autoAlpha: 1,
    scaleY: 0,
    transformOrigin: "top top",
  });

  ScrollTrigger.batch("[draw-vertical-line]", {
    once: true,
    onEnter: batch =>
      gsap.to(batch, {
        scaleY: 1,
        delay: 0.2,
        duration: 2.4,
        ease: "power3.out",
        stagger: 0.2,
      }),
  });
}

// --- GLOBAL - FADE
function fade() {
  let fadeElements = document.querySelectorAll("[fade]");
  fadeElements.forEach(element => {
    gsap.set(element, {
      autoAlpha: 0,
      y: element.getAttribute("data-y") || "4em",
    });
  });

  ScrollTrigger.batch("[fade]", {
    once: true,
    onEnter: batch =>
      gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        duration: 1.6,
        ease: "power3.out",
        stagger: 0.1,
      }),
  });
}

// --- GLOBAL - BUTTONS HOVER EFFECT
function buttonHover() {
  $("[data-btn='wrap']").each(function () {
    const clipEl = $(this)
      .find("[data-btn='clip']")
      .attr("aria-hidden", "true");
    const durationSetting = 0.4;
    const easeSetting = "power2.inOut";

    function getPercentTop(el, e) {
      let elTop = el.offset().top - $(window).scrollTop();
      let mouseTop = e.pageY - $(window).scrollTop() - elTop;
      return (mouseTop / el.innerHeight()) * 100;
    }

    function getPercentLeft(el, e) {
      let elLeft = el.offset().left;
      let mouseLeft = e.pageX - elLeft;
      return (mouseLeft / el.innerWidth()) * 100;
    }

    let initialBorderColor = $(this).css("border");

    $(this).on("mouseenter", function (e) {
      let percentTop = getPercentTop($(this), e);
      let percentLeft = getPercentLeft($(this), e);
      gsap.set(clipEl, { display: "flex" });
      gsap.fromTo(
        clipEl,
        { clipPath: `circle(0% at ${percentLeft}% ${percentTop}%)` },
        {
          clipPath: `circle(141.4% at ${percentLeft}% ${percentTop}%)`,
          duration: durationSetting,
          ease: easeSetting,
        }
      );
      // gsap.to($(this), {
      //   border: "1px solid rgba(195, 148, 24, 1)",
      //   duration: durationSetting,
      //   ease: easeSetting,
      // });

      if (
        $(this).attr("btn-style") === "outline-dark" &&
        !$(this).hasClass("schedule")
      ) {
        gsap.to($(this), {
          border: "1px solid rgba(29, 29, 24, 0.3)",
          duration: durationSetting,
          ease: easeSetting,
        });
      } else {
        gsap.to($(this), {
          border: "1px solid rgba(195, 148, 24, 1)",
          duration: durationSetting,
          ease: easeSetting,
        });
      }
    });

    $(this).on("mouseleave", function (e) {
      let percentTop = getPercentTop($(this), e);
      let percentLeft = getPercentLeft($(this), e);
      gsap.to(clipEl, {
        clipPath: `circle(0% at ${percentLeft}% ${percentTop}%)`,
        overwrite: true,
        duration: durationSetting,
        ease: easeSetting,
      });
      gsap.to($(this), {
        border: initialBorderColor,
        duration: durationSetting,
        ease: easeSetting,
      });
    });
  });
}

// // --- GLOBAL - HEADER
function headerScrolled() {
  window.addEventListener("scroll", function () {
    let header = document.querySelector(".c-header");
    if (header) {
      // Check if header exists
      if (window.scrollY >= 100) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
  });
}

// --- MEGAMENU DESKTOP
function megamenuDesktop() {
  let links = document.querySelectorAll(".c-dd-trigger");
  let header = document.querySelector(".c-header");
  let dropdownLinks = document.querySelectorAll(".c-dd-list-link");

  links.forEach(link => {
    let megamenu = link.querySelector(".c-dd-megamenu");
    let tl = gsap.timeline({
      paused: true,
      defaults: { ease: "expo.inOut", duration: 0.8 },
    });

    gsap.set(megamenu, {
      autoAlpha: 1,
      clipPath: "inset(0% 0% 100% 0%)",
    });

    tl.to(megamenu, {
      clipPath: "inset(0% 0% 0% 0%)",
    });

    link.addEventListener("click", function () {
      if (link.classList.contains("is-open")) {
        // If clicked link is already open, close it
        tl.reverse();
        link.classList.remove("is-open");
        header.classList.remove("megamenu-open");
      } else {
        // Close all other open menus
        links.forEach(otherLink => {
          if (otherLink !== link && otherLink.classList.contains("is-open")) {
            otherLink.classList.remove("is-open");
            gsap.to(otherLink.querySelector(".c-dd-megamenu"), {
              clipPath: "inset(0% 0% 100% 0%)",
            });
          }
        });

        // Open the clicked menu
        link.classList.add("is-open");
        header.classList.add("megamenu-open");
        tl.restart();
      }
    });
  });

  // Click outside to close
  document.addEventListener("click", function (event) {
    let isClickInsideMenu = header.contains(event.target);

    if (!isClickInsideMenu) {
      links.forEach(link => {
        if (link.classList.contains("is-open")) {
          let megamenu = link.querySelector(".c-dd-megamenu");
          gsap.to(megamenu, {
            clipPath: "inset(0% 0% 100% 0%)",
          });
          link.classList.remove("is-open");
          header.classList.remove("megamenu-open");
        }
      });
    }
  });

  // Link hover
  dropdownLinks.forEach(link => {
    let icon = link.querySelector(".c-dd-icon");
    let tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power3.inOut", duration: 0.6 },
    });

    gsap.set(icon, { xPercent: -40, scale: 0 });

    tl.to(icon, { autoAlpha: 1, xPercent: 0, scale: 1 });

    link.addEventListener("mouseenter", function () {
      tl.restart();
    });

    link.addEventListener("mouseleave", function () {
      tl.reverse();
    });
  });
}

// --- MEGAMENU MOBILE
function megamenuMobile() {
  let dropdowns = document.querySelectorAll(".c-dd-trigger");
  let active;

  dropdowns.forEach(dropdown => {
    let dropdownContent = dropdown.querySelector(".c-dd-megamenu");
    let dropdownTxt = dropdown.querySelector(".c-dd-txt");

    let tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power4.inOut", duration: 0.6 },
    });

    tl.to(dropdownContent, { height: "auto", autoAlpha: 1 });

    dropdown.tl = tl;

    dropdownTxt.addEventListener("click", function (e) {
      e.stopPropagation();
      if (active) {
        active.tl.reverse();
        if (active === dropdown) {
          active = null;
          return;
        }
      }

      tl.play();
      active = dropdown;
    });
  });
}

//
// function megamenuMobile() {
//   $(".c-dd-trigger").each(function () {
//     let dropdownContent = $(this).find(".c-dd-megamenu");
//     let dropdownTrigger = $(this).find(".c-dd-txt");

//     let tl = gsap.timeline({ paused: true, defaults: { ease: "power4.inOut", duration: 0.6 } });

//     tl.to(dropdownContent, { height: "auto", autoAlpha: 1 });

//     $(this).on("click", function (e) {
//       // e.stopPropagation();
//       console.log($(this));
//       $(".c-dd-trigger.is-open").not($(this)).click();
//       $(this).toggleClass("is-open");
//       if ($(this).hasClass("is-open")) {
//         tl.restart();
//       } else {
//         tl.reverse();
//       }
//     });

//     $(document).mouseup(function (e) {
//       if ($(e.target).closest(".c-dd-trigger").length === 0) {
//         $(".c-dd-trigger.is-open").click();
//       }
//     });

//   });
// }
//

// --- HEADER MOBILE
function headerMobile() {
  let header = document.querySelector(".c-header");
  let headerBtn = document.querySelector(".c-nav-btn");
  let headerNav = document.querySelector(".c-header-nav");
  let menuLine1 = document.querySelectorAll(".c-icon.menu rect")[0];
  let menuLine2 = document.querySelectorAll(".c-icon.menu rect")[1];
  let menuLine3 = document.querySelectorAll(".c-icon.menu rect")[2];

  let tl = gsap.timeline({
    paused: true,
    defaults: { ease: "expo.inOut", duration: 1 },
  });

  gsap.set(menuLine1, { transformOrigin: "center center" });
  gsap.set(menuLine2, { transformOrigin: "center center" });
  gsap.set(menuLine3, { transformOrigin: "center center" });

  tl.to(headerNav, { clipPath: "inset(0% 0% 0% 0%)" });
  tl.to(menuLine1, { rotation: 45, y: 7 }, 0);
  tl.to(menuLine2, { width: 0 }, 0);
  tl.to(menuLine3, { rotation: -45, y: -7 }, 0);

  headerBtn.addEventListener("click", function () {
    header.classList.toggle("is-open");
    if (header.classList.contains("is-open")) {
      lenis.stop();
      tl.restart();
    } else {
      lenis.start();
      tl.reverse();
    }
  });
}

// --- HOME BUILD HOVER
function homeBuildHover() {
  $(".c-build-home.is-1").each(function () {
    let link = $(this).find(".c-label-link");
    let linkText = $(this).find(".c-label-link-txt");
    let label = $(this).find(".c-label");
    let labelText = $(this).find(".t-body-3");

    $(this).on("mouseenter", function () {
      let state = Flip.getState(link, linkText, label, { props: "color" });
      link.addClass("is-active");
      label.addClass("is-active");
      Flip.from(state, {
        duration: 0.4,
        ease: "power2.inOut",
        absolute: true,
        scale: true,
      });
    });

    $(this).on("mouseleave", function () {
      let state = Flip.getState(link, linkText, label, { props: "color" });
      link.removeClass("is-active");
      label.removeClass("is-active");
      Flip.from(state, {
        duration: 0.4,
        ease: "power2.inOut",
        absolute: true,
      });
    });
  });

  // 2
  $(".c-build-home.is-2").each(function () {
    let link = $(this).find(".c-label-link-2");
    let linkText = $(this).find(".c-label-link-txt");
    let label = $(this).find(".c-label-2");
    let labelText = $(this).find(".t-body-3");

    $(this).on("mouseenter", function () {
      let state = Flip.getState(link, linkText, label, { props: "color" });
      link.addClass("is-active");
      label.addClass("is-active");
      Flip.from(state, {
        duration: 0.4,
        ease: "power2.inOut",
        absolute: true,
        scale: true,
      });
    });

    $(this).on("mouseleave", function () {
      let state = Flip.getState(link, linkText, label, { props: "color" });
      link.removeClass("is-active");
      label.removeClass("is-active");
      Flip.from(state, {
        duration: 0.4,
        ease: "power2.inOut",
        absolute: true,
      });
    });
  });
}

// --- REVIEWS SLIDER
if (document.querySelector(".swiper.reviews") !== null) {
  let eventsSlider = new Swiper(".swiper.reviews", {
    slidesPerView: "auto",
    speed: 600,
    grabCursor: true,
    navigation: {
      prevEl: ".swiper-prev.reviews",
      nextEl: ".swiper-next.reviews",
    },
    pagination: {
      el: ".swiper-pagination.reviews",
      clickable: true,
    },
    breakpoints: {
      320: {
        spaceBetween: 16,
      },
      1280: {
        spaceBetween: 24,
      },
    },
  });

  let slideCount = document.querySelectorAll(".swiper-slide.reviews").length;
  let slideCountEl = document.querySelector("[reviews-length]");
  slideCountEl.textContent = slideCount;

  eventsSlider.on("slideChange", function (e) {
    let slideNumber = e.realIndex + 1;
    document.querySelector("[reviews-current-index]").textContent = slideNumber;
  });
}

function reviewsLoad() {
  if ($(".swiper-slide.reviews").length > 0) {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".swiper-slide.reviews",
        start: "center bottom",
        once: true,
      },
    });

    gsap.set(".swiper-slide.reviews", { xPercent: 50, autoAlpha: 0 });

    tl.to(".swiper-slide.reviews", {
      autoAlpha: 1,
      xPercent: 0,
      stagger: 0.2,
      duration: 2,
      ease: "expo.out",
    });
  }
}

// --- PROJECTS SLIDER
function projectsSlider() {
  // Thumb
  let eventsSliderThumb = new Swiper(".swiper.gallery-20-thumb", {
    speed: 400,
    simulateTouch: false,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
  });

  // Main
  if (document.querySelector(".swiper.gallery-20-main") !== null) {
    let eventsSliderMain = new Swiper(".swiper.gallery-20-main", {
      slidesPerView: "auto",
      speed: 400,
      spaceBetween: 24,
      navigation: {
        prevEl: ".swiper-prev.gallery-20-main",
        nextEl: ".swiper-next.gallery-20-main",
      },
      pagination: {
        el: ".swiper-pagination.gallery-20-main",
        clickable: true,
      },
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      thumbs: {
        swiper: eventsSliderThumb,
      },
    });

    let slideCount = document.querySelectorAll(
      ".swiper-slide.gallery-20-main"
    ).length;
    let slideCountEl = document.querySelector("[gallery-20-main-length]");
    slideCountEl.textContent = slideCount;

    eventsSliderMain.on("slideChange", function (e) {
      let slideNumber = e.realIndex + 1;
      document.querySelector("[gallery-20-main-current-index]").textContent =
        slideNumber;
    });
  }
}

// --- SHOWCASE SLIDER
function showcaseSlider() {
  // Thumb
  let showcaseSliderThumb = new Swiper(".swiper.showcase-thumb", {
    slidesPerView: "auto",
    speed: 400,
  });

  // Main
  if (document.querySelector(".swiper.showcase") !== null) {
    let showcaseSliderMain = new Swiper(".swiper.showcase", {
      slidesPerView: 1,
      speed: 400,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      thumbs: {
        swiper: showcaseSliderThumb,
      },
    });
  }
}

// --- SHOWCASE SINGLE
function showcaseSingle() {
  let projectsGrid = document.querySelector(".u-grid.sc-gallery");

  if (projectsGrid) {
    let gallery1Parent = document.querySelector("[gallery-1]");
    let gallery2Parent = document.querySelector("[gallery-2]");
    let gallery3Parent = document.querySelector("[gallery-3]");
    let gallery4Parent = document.querySelector("[gallery-4]");
    let gallery2Items = gallery2Parent.querySelectorAll(".c-sc-gallery-item");
    let gallery3Items = gallery3Parent.querySelectorAll(".c-sc-gallery-item");
    let gallery4Items = gallery4Parent.querySelectorAll(".c-sc-gallery-item");

    gallery2Items.forEach(item => {
      gallery1Parent.appendChild(item);
    });
    gallery2Parent.remove();

    gallery3Items.forEach(item => {
      gallery1Parent.appendChild(item);
    });
    gallery3Parent.remove();

    gallery4Items.forEach(item => {
      gallery1Parent.appendChild(item);
    });
    gallery4Parent.remove();
  }
}

// --- HOMEPAGE - VIMEO MODAL
function vimeoModal() {
  let modalWrap = document.querySelector(".c-modal");
  let videoModal = document.querySelectorAll("[video-component]");
  let videoPreview = document.querySelector(".c-reel.preview");

  videoModal.forEach(video => {
    let pauseButton = document.querySelector(".c-modal-close");
    let iframe = document.querySelector(".player1");
    let player = new Vimeo.Player(iframe);

    video.addEventListener("click", function () {
      modalWrap.classList.add("is-open");
      player.play();
      videoPreview.pause();
      lenis.stop();
    });

    function closeModal() {
      modalWrap.classList.remove("is-open");
      player.pause();
      videoPreview.play();
      lenis.start();
    }

    pauseButton.addEventListener("click", closeModal);

    document.addEventListener("keydown", closeModal);
  });
}

// --- OUR PROCESS ACCORDION
function ourProcessAccordion() {
  let accordions = document.querySelectorAll(".c-accordion");

  let active;

  if (accordions.length > 0) {
    accordions.forEach((accordion, index) => {
      let accordionTrigger = accordion.querySelector(".c-accordion-trigger");
      let accordionContent = accordion.querySelector(".c-accordion-content");
      let accordionNumberCircle = accordion.querySelector(".c-accordion-num");
      let accordionNumber = accordion.querySelector("[accordion-num]");
      let accordionHyperlink = accordion.querySelectorAll("a");

      let previousAccordion = accordions[index - 1];

      accordionNumber.textContent = index + 1;

      let tl = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power3.inOut",
          duration: 0.6,
        },
      });

      tl.to(accordionContent, { height: "auto" });
      tl.to(accordionTrigger, { color: "#53565A" }, 0);
      tl.to(
        accordionNumberCircle,
        {
          backgroundColor: "#E6B638",
          border: "1px solid #E6B638",
          color: "#1D1D18",
        },
        0
      );
      if (index > 0) {
        tl.to(
          previousAccordion.querySelector(".c-line"),
          { backgroundColor: "#53565A" },
          0
        );
      }

      accordion.tl = tl;

      accordion.addEventListener("click", function () {
        if (active) {
          active.tl.reverse();
        }
        if (active === accordion) {
          active = null;
          return;
        }

        tl.play();
        active = accordion;
      });

      // Hyperlink
      accordionHyperlink.forEach(function (link) {
        link.addEventListener("click", function (e) {
          e.stopPropagation();
        });
      });
    });

    let firstAccordion = document.querySelector(".c-accordion");
    firstAccordion.click();
  }
}

// --- AVAILABLE HOMES TABBER
function availableHomesTabber() {
  let listingHomesTotal = $(".c-listing-item.homes").length;
  let listingHomesitesTotal = $(".c-listing-item.homesites").length;
  $("[listing-homes-txt]").text(listingHomesTotal);
  $("[listing-homesites-txt]").text(listingHomesitesTotal);

  $(".c-listing-cat").each(function (index) {
    $(this).on("click", function () {
      $(".c-listing-cat").removeClass("is-active");
      $(".c-listing-wrap-holder").removeClass("is-active");

      $(".c-listing-cat").eq(index).addClass("is-active");
      $(".c-listing-wrap-holder").eq(index).addClass("is-active");
    });
  });
}

// --- AVAILABLE HOMES DROPDOWN
// function availableHomesDropdown() {
//   $(".c-listing-dd").each(function () {
//     let dropdownList = $(this).find(".c-listing-dd-list");
//     let dropdownIcon = $(this).find(".c-icon.listing-dd-arrow");

//     let tl = gsap.timeline({ paused: true, defaults: { ease: "power2.inOut", duration: 0.4 } });

//     tl.to(dropdownList, { autoAlpha: 1 });
//     tl.to(dropdownIcon, { rotation: 180 }, 0);

//     $(this).on("click", function () {
//       $(this).toggleClass("is-open");
//       if ($(this).hasClass("is-open")) {
//         tl.restart();
//       } else {
//         tl.reverse();
//       }
//     });
//   });
// }
function availableHomesDropdown() {
  $(".c-listing-dd").each(function () {
    let dropdownList = $(this).find(".c-listing-dd-list");
    let dropdownIcon = $(this).find(".c-icon.listing-dd-arrow");

    let tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power2.inOut", duration: 0.4 },
    });

    tl.to(dropdownList, { autoAlpha: 1 });
    tl.to(dropdownIcon, { rotation: 180 }, 0);

    $(this).on("click", function (event) {
      event.stopPropagation();
      $(this).toggleClass("is-open");
      if ($(this).hasClass("is-open")) {
        tl.restart();
      } else {
        tl.reverse();
      }
    });

    $(document).on("click", function (event) {
      if (!$(event.target).closest(".c-listing-dd").length) {
        $(".c-listing-dd").removeClass("is-open");
        tl.reverse();
      }
    });
  });
}

// --- FAQ ACCORDION
function faqAccordion() {
  let accordions = document.querySelectorAll(".c-faq-item");

  if (accordions.length > 0) {
    let active;

    accordions.forEach(accordion => {
      let tl = gsap.timeline({
        paused: true,
        defaults: {
          duration: 0.8,
          ease: "power3.inOut",
        },
      });
      let accordionResponse = accordion.querySelector(".c-faq-response");
      let accordionArrow = accordion.querySelector(".c-icon.faq");

      tl.to(accordionResponse, { height: "auto" });
      tl.to(accordionArrow, { rotation: 180 }, 0);

      accordion.tl = tl;

      accordion.addEventListener("click", function () {
        if (active) {
          active.tl.reverse();
        }
        if (active === accordion) {
          active = null;
          return;
        }

        tl.play();
        active = accordion;
      });
    });

    let firstAccordion = document.querySelector(".c-faq-item");
    firstAccordion.click();
  }
}

// --- SIMPLE LOADER
function simpleLoader() {
  let tl = gsap.timeline({
    defaults: { ease: "power2.out", duration: 1.4, delay: 0.1 },
  });

  tl.to(".o-page-wrapper", { autoAlpha: 1 });
  tl.to(".c-header", { autoAlpha: 1 }, 0);
}

let homepage = document.querySelector("[data-page='homepage']");
let subpage = document.querySelector("[data-page='sub-page']");

// --- THE GALLERY ZOOM EFFECT
// function theGallery() {
//   let galleryItems = $(".c-sc-gallery-item");

//   galleryItems.each(function () {

//     let galleryInitalWrap = $(this).find(".c-img-contain.sc-gallery-item");
//     let galleryFlipItem = $(this).find(".c-img.gallery-flip");
//     let galleryStaticItem = $(this).find(".c-img.gallery-static");
//     let modal = $(".c-sc-modal");
//     let modalTarget = $(".c-img-contain.sc-modal");
//     let modalOverlay = $(".c-sc-modal-overlay");
//     let modalCloseBtn = $(".c-sc-modal-close");

//     let tl = gsap.timeline({ paused: true, defaults: { ease: "power3.inOut", duration: 0.6 } });

//     tl.to(modalOverlay, { autoAlpha: 1 });
//     tl.to(modalCloseBtn, { autoAlpha: 1 }, 0);
//     tl.to(galleryStaticItem, { autoAlpha: 0 }, 0);

//     // Open
//     $(this).on("click", function () {
//       let state = Flip.getState(galleryFlipItem);
//       modal.addClass("is-active");
//       lenis.stop();

//       gsap.set(galleryFlipItem, { zIndex: 5 });

//       galleryFlipItem.appendTo(modalTarget);
//       Flip.from(state, {
//         duration: 0.6,
//         ease: "power3.inOut",
//       });
//       tl.restart();
//       gsap.set(".cursor", { opacity: 0 });
//     });

//     // Close
//     modalCloseBtn.on("click", function () {
//       let state = Flip.getState(galleryFlipItem);
//       modal.removeClass("is-active");
//       lenis.start();

//       galleryFlipItem.appendTo(galleryInitalWrap);
//       Flip.from(state, {
//         duration: 0.4,
//         ease: "power3.inOut",
//         onComplete: () => {
//           gsap.set(".cursor", { clearProps: "opacity" });
//           setTimeout(() => {
//             gsap.set(galleryFlipItem, { clearProps: "zIndex" });
//           }, 400);
//         }
//       });
//       tl.reverse();
//     });

//   });
// }

//
//

// function theGallery() {
//   let galleryImages = $(".c-img.gallery-static");
//   let galleryImagesClone = galleryImages.clone().addClass("clone");
//   galleryImagesClone.appendTo(".c-img-contain.sc-modal");

//   let galleryImagesClonedItems = $(".c-img.gallery-static.clone");

//   let modal = $(".c-sc-modal");
//   let modalCloseBtn = $(".c-sc-modal-close");
//   let modalPrevBtn = $(".c-sc-modal-prev");
//   let modalNextBtn = $(".c-sc-modal-next");

//   let currentIndex = -1;

//   let tl = gsap.timeline({ paused: true, defaults: { ease: "power2.inOut", duration: 0.4 } });
//   tl.to(modal, { autoAlpha: 1 });

//   // Update total number of images
//   let totalImages = galleryImagesClonedItems.length;
//   $("[gallery-total]").text(totalImages);

//   // Function to update current index display
//   function updateCurrentIndex() {
//     $("[gallery-current]").text(currentIndex + 1);
//   }

//   galleryImages.each(function (index) {
//     let galleryItem = $(this);

//     // Open modal
//     galleryItem.on("click", function () {
//       currentIndex = index;
//       modal.addClass("is-open");
//       galleryImagesClonedItems.removeClass("is-active");
//       galleryImagesClonedItems.eq(currentIndex).addClass("is-active");
//       tl.restart();
//       lenis.stop();
//       updateCurrentIndex();
//     });
//   });

//   // Close modal
//   modalCloseBtn.on("click", function () {
//     modal.removeClass("is-open");
//     setTimeout(() => {
//       galleryImagesClonedItems.removeClass("is-active");
//     }, 400);
//     tl.reverse();
//     lenis.start();
//   });

//   // Next Slide
//   modalNextBtn.on("click", function () {
//     if (currentIndex < galleryImagesClonedItems.length - 1) {
//       currentIndex++;
//     } else {
//       currentIndex = 0;
//     }
//     galleryImagesClonedItems.removeClass("is-active");
//     galleryImagesClonedItems.eq(currentIndex).addClass("is-active");
//     updateCurrentIndex();
//   });

//   // Previous Slide
//   modalPrevBtn.on("click", function () {
//     if (currentIndex > 0) {
//       currentIndex--;
//     } else {
//       currentIndex = galleryImagesClonedItems.length - 1;
//     }
//     galleryImagesClonedItems.removeClass("is-active");
//     galleryImagesClonedItems.eq(currentIndex).addClass("is-active");
//     updateCurrentIndex();
//   });
// }

function theGallery() {
  let galleryImages = $(".c-img.gallery-static");
  let galleryImagesClone = galleryImages.clone().addClass("clone");
  galleryImagesClone.appendTo(".c-img-contain.sc-modal");

  let galleryImagesClonedItems = $(".c-img.gallery-static.clone");

  let modal = $(".c-sc-modal");
  let modalCloseBtn = $(".c-sc-modal-close");
  let modalPrevBtn = $(".c-sc-modal-prev");
  let modalNextBtn = $(".c-sc-modal-next");

  let currentIndex = -1;

  let tl = gsap.timeline({
    paused: true,
    defaults: { ease: "power2.inOut", duration: 0.4 },
  });
  tl.to(modal, { autoAlpha: 1 });

  // Update total number of images
  let totalImages = galleryImagesClonedItems.length;
  $("[gallery-total]").text(totalImages);

  // Function to update current index display
  function updateCurrentIndex() {
    $("[gallery-current]").text(currentIndex + 1);
  }

  galleryImages.each(function (index) {
    let galleryItem = $(this);

    // Open modal
    galleryItem.on("click", function () {
      currentIndex = index;
      modal.addClass("is-open");
      galleryImagesClonedItems.removeClass("is-active");
      galleryImagesClonedItems.eq(currentIndex).addClass("is-active");
      tl.restart();
      lenis.stop();
      updateCurrentIndex();
      $(document).on("keydown", handleKeydown);
    });
  });

  // Close modal
  modalCloseBtn.on("click", function () {
    modal.removeClass("is-open");
    setTimeout(() => {
      galleryImagesClonedItems.removeClass("is-active");
    }, 400);
    tl.reverse();
    lenis.start();
    $(document).off("keydown", handleKeydown);
  });

  // Next Slide
  function nextSlide() {
    if (currentIndex < galleryImagesClonedItems.length - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    galleryImagesClonedItems.removeClass("is-active");
    galleryImagesClonedItems.eq(currentIndex).addClass("is-active");
    updateCurrentIndex();
  }

  // Previous Slide
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = galleryImagesClonedItems.length - 1;
    }
    galleryImagesClonedItems.removeClass("is-active");
    galleryImagesClonedItems.eq(currentIndex).addClass("is-active");
    updateCurrentIndex();
  }

  modalNextBtn.on("click", nextSlide);
  modalPrevBtn.on("click", prevSlide);

  function handleKeydown(event) {
    if (event.key === "ArrowRight") {
      nextSlide();
    } else if (event.key === "ArrowLeft") {
      prevSlide();
    }
  }
}

// --- SHOWCASE CURSOR
function cursor() {
  let cursorObject = document.querySelector(".cursor");
  let mousePos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let cursorPos = { x: mousePos.x, y: mousePos.y };

  let cursorMoveSpeed = 0.08;

  window.addEventListener("mousemove", e => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
  });

  gsap.ticker.add(() => {
    cursorPos.x += (mousePos.x - cursorPos.x) * cursorMoveSpeed;
    cursorPos.y += (mousePos.y - cursorPos.y) * cursorMoveSpeed;

    gsap.set(cursorObject, { x: cursorPos.x, y: cursorPos.y });
  });

  let showcaseItems = document.querySelectorAll(".c-project-item");
  let galleryItems = document.querySelectorAll(".c-sc-gallery-item");
  let galleryThumbItems = document.querySelectorAll(".c-gallery-20-link");

  showcaseItems.forEach(item => {
    item.addEventListener("mouseenter", function () {
      cursorObject.classList.add("is-active");
    });

    item.addEventListener("mouseleave", function () {
      cursorObject.classList.remove("is-active");
    });
  });

  galleryItems.forEach(item => {
    item.addEventListener("mouseenter", function () {
      cursorObject.classList.add("is-active");
    });

    item.addEventListener("mouseleave", function () {
      cursorObject.classList.remove("is-active");
    });
  });

  galleryThumbItems.forEach(item => {
    item.addEventListener("mouseenter", function () {
      cursorObject.classList.add("is-active");
    });

    item.addEventListener("mouseleave", function () {
      cursorObject.classList.remove("is-active");
    });
  });
}

// --- HOME LOADER
function homeLoader() {
  let heroImgWrap = $(".c-img-contain.hm-hero");
  let heroImg = $(".c-img-contain.hm-hero img");
  let glassDiv = $(".c-hm-hero_rt");
  let heroLine = $(".c-line.hm-hero");
  let chars = $("[split-txt-hero] .char");
  let header = $(".c-header");

  gsap.set(glassDiv, { autoAlpha: 0 });
  gsap.set(heroLine, { scaleX: 0, transformOrigin: "left center" });
  gsap.set(".o-row.hm-hero", { autoAlpha: 1 });

  let tl = gsap.timeline({
    defaults: { ease: "expo.out", duration: 1.6, delay: 0.3 },
  });

  // tl.fromTo(
  //   heroImgWrap, {
  //     clipPath: "inset(50% 50% 50% 50% round 1em)",
  //     rotation: -
  //       15
  //   }, { clipPath: "inset(0% 0% 0% 0% round 0em)", rotation: 0 }
  // );

  // tl.fromTo(heroImg, { rotation: 15, scale: 1.2 }, { rotation: 0, scale: 1 }, 0);

  if (window.matchMedia("(min-width: 992px)").matches) {
    tl.fromTo(
      heroImg,
      { rotation: 15, scale: 1.2 },
      { rotation: 0, scale: 1 },
      0
    );
    tl.fromTo(
      heroImgWrap,
      {
        clipPath: "inset(50% 50% 50% 50% round 1em)",
        rotation: -15,
      },
      { clipPath: "inset(0% 0% 0% 0% round 0em)", rotation: 0 },
      0
    );
  } else {
    gsap.set(heroImg, { rotation: 0 });
    gsap.set(heroImgWrap, { rotation: 0 });

    tl.fromTo(heroImg, { scale: 1.2 }, { scale: 1 }, 0);
    tl.fromTo(
      heroImgWrap,
      { clipPath: "inset(50% 50% 50% 50% round 1em)" },
      { clipPath: "inset(0% 0% 0% 0% round 0em)" },
      0
    );
  }

  mm.add("(min-width: 992px)", () => {
    tl.to(header, { y: 0 }, ">-1");
  });

  if (!safariChecker()) {
    tl.fromTo(
      chars,
      {
        autoAlpha: 0,
        rotationX: -90,
        yPercent: 50,
      },
      {
        autoAlpha: 1,
        rotationX: 0,
        yPercent: 0,
        stagger: { amount: 0.8 },
        duration: 1,
      },
      "<-1"
    );
  }

  tl.to(heroLine, { scaleX: 1, duration: 0.6, ease: "power1.out" }, "<0.2");

  tl.to(glassDiv, { autoAlpha: 1, duration: 0.4, ease: "power1.out" }, ">-0.3");
}

// --- HOME HERO MOBILE MARKUP
function homeHeroMobileMarkup() {
  $(".c-hm-hero_rt").appendTo(".o-row.hm-hero-mobile");
  $(".c-hm-hero_rt").css("position", "relative");
}

// --- RESOURCES SLIDERS
function resourcesSliders() {
  // Documents Slider
  if (document.querySelector(".swiper.resources-docs") !== null) {
    let eventsSlider = new Swiper(".swiper.resources-docs", {
      slidesPerView: "auto",
      speed: 600,
      grabCursor: true,
      navigation: {
        prevEl: ".swiper-prev.resources-docs",
        nextEl: ".swiper-next.resources-docs",
      },
      breakpoints: {
        320: {
          spaceBetween: 16,
        },
        1280: {
          spaceBetween: 24,
        },
      },
    });
  }

  let docsTotalCount = $(".swiper-slide.resources-docs").length;
  $("[resources-docs-total]").text(docsTotalCount);

  // Videos Slider
  if (document.querySelector(".swiper.resources-videos") !== null) {
    let eventsSlider = new Swiper(".swiper.resources-videos", {
      slidesPerView: "auto",
      speed: 600,
      grabCursor: true,
      navigation: {
        prevEl: ".swiper-prev.resources-videos",
        nextEl: ".swiper-next.resources-videos",
      },
      breakpoints: {
        320: {
          spaceBetween: 16,
        },
        1280: {
          spaceBetween: 24,
        },
      },
    });
  }

  let videosTotalCount = $(".swiper-slide.resources-videos").length;
  $("[resources-videos-total]").text(videosTotalCount);
}

// --- RESOURCES NAV
// let resourcesLink = $(".c-txt-link.resources");
// resourcesLink.each(function (index) {
//   $(this).on("click", function () {
//     if (index === 0) {
//       gsap.to(window, { duration: 0.4, scrollTo: "[resources-docs-row]" });
//     } else {
//       gsap.to(window, { duration: 0.4, scrollTo: "[resources-videos-row]" });
//     }
//   });
// });

// resourcesLink.on("click", function (index) {
//   gsap.to(window, { duration: 1, scrollTo: "[resources-docs-row]" });
// });

// --- INIT
function init() {
  showcaseSingle();
  projectsSlider();
  showcaseSlider();
  parallaxImg();
  headerScrolled();
  ourProcessAccordion();
  availableHomesTabber();
  faqAccordion();
  reviewsLoad();
  theGallery();
  runSplit();
  availableHomesDropdown();
  resourcesSliders();
  if (homepage) {
    vimeoModal();
    homeLoader();
  }
  if (subpage) {
    simpleLoader();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  init();

  // --- MATCHMEDIA - DESKTOP
  mm.add("(min-width: 992px)", () => {
    buttonHover();
    megamenuDesktop();
    homeBuildHover();
    cursor();
    fade();
    parallaxWrap();
    drawLine();
    drawVerticalLine();
    if (homepage) {
      // homeLoader();
    }
    return () => {
      //
    };
  });

  // --- MATCHMEDIA - TABLET AND MOBILE
  mm.add("(max-width: 991px)", () => {
    headerMobile();
    megamenuMobile();
    return () => {
      //
    };
  });

  mm.add("(max-width: 767px)", () => {
    if (homepage) {
      homeHeroMobileMarkup();
    }
    return () => {
      $(".c-hm-hero_rt").appendTo(".c-line.hm-hero");
      $(".c-hm-hero_rt").css("position", "absolute");
    };
  });
});
