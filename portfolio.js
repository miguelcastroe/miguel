var hamburger = document.getElementById("hamburger");
var panel = document.getElementById("navPanel");
var overlay = document.getElementById("navOverlay");

function featherLinkedIn() {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>';
}

function featherHome() {
  return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>';
}

(function enhanceNavigation() {
  if (!panel) return;

  var methodNav = panel.querySelector('a[data-en="Method"]');
  if (methodNav) methodNav.setAttribute("href", "/method/");

  var contactNav = panel.querySelector('a[data-en="Contact"]');
  if (contactNav && !panel.querySelector(".nav-whatsapp")) {
    var whatsapp = document.createElement("a");
    whatsapp.className = "nav-whatsapp nav-link";
    whatsapp.href = "https://wa.me/51936646947?text=Hi%20Miguel%2C%20I%20found%20you%20through%20your%20portfolio.";
    whatsapp.target = "_blank";
    whatsapp.rel = "noopener";
    whatsapp.setAttribute("data-en", "Drop me a line");
    whatsapp.setAttribute("data-es", "Escríbeme");
    whatsapp.textContent = "Drop me a line";
    contactNav.insertAdjacentElement("afterend", whatsapp);
  }

  var linkedin = panel.querySelector(".nav-linkedin");
  if (linkedin) linkedin.innerHTML = '<span>LinkedIn</span>' + featherLinkedIn();

  var back = document.querySelector(".portfolio-back");
  if (back) {
    back.innerHTML = featherHome() + '<span data-en="Back to Portfolio" data-es="Volver al Portfolio">Back to Portfolio</span>';
  }

  var style = document.createElement("style");
  style.textContent = [
    ".nav-panel .nav-whatsapp{font-size:11px;font-weight:400;letter-spacing:.06em;color:var(--muted);margin-top:-4px;margin-bottom:18px}",
    ".nav-panel .nav-whatsapp:hover{color:var(--ink)}",
    ".nav-panel .nav-linkedin{display:flex;align-items:center;gap:8px}",
    ".nav-panel .nav-linkedin svg{width:15px;height:15px;flex:0 0 auto;stroke:currentColor}"
  ].join("");
  document.head.appendChild(style);
})();

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
  document.querySelectorAll(".nav-link").forEach(function (link) { link.addEventListener("click", closeNav); });
  document.addEventListener("keydown", function (event) { if (event.key === "Escape") closeNav(); });
}

(function () {
  var work = document.getElementById("work");
  if (!work) return;
  var buttons = work.querySelectorAll("[data-work-view]");
  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      var view = button.getAttribute("data-work-view");
      work.classList.toggle("is-grid", view === "grid");
      buttons.forEach(function (b) {
        var active = b === button;
        b.classList.toggle("active", active);
        b.setAttribute("aria-pressed", active ? "true" : "false");
      });
    });
  });
})();

(function () {
  var collapseBtn = document.getElementById("workCollapseToggle");
  var work = document.getElementById("work");
  if (!collapseBtn || !work) return;
  var collapsed = false;
  collapseBtn.addEventListener("click", function () {
    collapsed = !collapsed;
    work.classList.toggle("is-collapsed", collapsed);
    collapseBtn.textContent = collapsed ? "+" : "−";
    collapseBtn.setAttribute("aria-expanded", collapsed ? "false" : "true");
    collapseBtn.setAttribute("aria-label", collapsed ? "Expand cases" : "Collapse cases");
  });
})();

(function () {
  var nav = document.querySelector(".site-nav");
  function setNavState() { if (nav) nav.classList.toggle("scrolled", window.scrollY > 8); }
  setNavState();
  window.addEventListener("scroll", setNavState, { passive: true });

  var revealItems = document.querySelectorAll(".hero-name, .hero-statement span, .case, .development .section-label, .development-copy, .method .section-label, .method-copy p, .contact .section-label, .contact-copy p, .contact-link, footer span, footer a");
  revealItems.forEach(function (el, index) {
    el.classList.add("reveal");
    el.style.setProperty("--reveal-delay", Math.min(index * 18, 160) + "ms");
  });

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(function (el) { observer.observe(el); });
  } else {
    revealItems.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();

(function () {
  var engBtn = document.getElementById("langEng");
  var espBtn = document.getElementById("langEsp");
  if (!engBtn || !espBtn) return;
  function setLanguage(lang) {
    engBtn.classList.toggle("active", lang === "en");
    espBtn.classList.toggle("active", lang === "es");
    engBtn.setAttribute("aria-pressed", lang === "en" ? "true" : "false");
    espBtn.setAttribute("aria-pressed", lang === "es" ? "true" : "false");
    document.querySelectorAll("[data-en]").forEach(function (el) {
      el.textContent = el.getAttribute("data-" + lang);
    });
    document.documentElement.lang = lang === "en" ? "en" : "es";
  }
  engBtn.addEventListener("click", function () { setLanguage("en"); });
  espBtn.addEventListener("click", function () { setLanguage("es"); });
})();
