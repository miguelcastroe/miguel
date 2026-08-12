var hamburger = document.getElementById("hamburger");
var panel = document.getElementById("navPanel");
var overlay = document.getElementById("navOverlay");

function closeNav() {
  if (!hamburger || !panel || !overlay) return;
  hamburger.classList.remove("open");
  panel.classList.remove("open");
  overlay.classList.remove("open");
  hamburger.setAttribute("aria-expanded", "false");
  panel.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

if (hamburger && panel && overlay) {
  hamburger.addEventListener("click", function () {
    var opening = !panel.classList.contains("open");
    hamburger.classList.toggle("open", opening);
    panel.classList.toggle("open", opening);
    overlay.classList.toggle("open", opening);
    hamburger.setAttribute("aria-expanded", opening ? "true" : "false");
    panel.setAttribute("aria-hidden", opening ? "false" : "true");
    document.body.style.overflow = opening ? "hidden" : "";
  });

  overlay.addEventListener("click", closeNav);
  document.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeNav();
  });
}

(function () {
  var nav = document.querySelector(".site-nav");
  function setNavState() {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 8);
  }
  setNavState();
  window.addEventListener("scroll", setNavState, { passive: true });
})();

(function () {
  var items = document.querySelectorAll(".method-reveal");
  items.forEach(function (element, index) {
    element.classList.add("reveal");
    element.style.setProperty("--reveal-delay", Math.min(index * 16, 140) + "ms");
  });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    items.forEach(function (element) {
      observer.observe(element);
    });
  } else {
    items.forEach(function (element) {
      element.classList.add("is-visible");
    });
  }
})();
