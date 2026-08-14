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
  var nav = document.querySelector(".site-nav");
  function setNavState() { if (nav) nav.classList.toggle("scrolled", window.scrollY > 8); }
  setNavState();
  window.addEventListener("scroll", setNavState, { passive: true });
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
      var value = el.getAttribute("data-" + lang);
      if (value) el.textContent = value;
    });
    document.documentElement.lang = lang === "en" ? "en" : "es";
  }

  engBtn.addEventListener("click", function () { setLanguage("en"); });
  espBtn.addEventListener("click", function () { setLanguage("es"); });
})();

(function () {
  var intro = document.querySelector(".case-intro");
  if (intro) intro.textContent = "Miguel Castro’s creative practice for developing big ideas.";

  var description = "Method is Miguel Castro’s creative practice for developing big ideas through signal, perspective, idea and evidence.";
  var socialDescription = "A creative practice for developing big ideas through signal, perspective, idea and evidence.";

  var meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", description);
  var og = document.querySelector('meta[property="og:description"]');
  if (og) og.setAttribute("content", socialDescription);
  var twitter = document.querySelector('meta[name="twitter:description"]');
  if (twitter) twitter.setAttribute("content", socialDescription);

  var jsonLd = document.querySelector('script[type="application/ld+json"]');
  if (jsonLd) {
    try {
      var data = JSON.parse(jsonLd.textContent);
      data.description = description;
      if (data.mainEntity) data.mainEntity.description = "Miguel Castro’s creative practice for developing big ideas.";
      jsonLd.textContent = JSON.stringify(data);
    } catch (e) {}
  }

  var labels = Array.prototype.slice.call(document.querySelectorAll(".case-section-label"));
  labels.forEach(function (label) {
    if (label.textContent.trim() === "AI inside Method") {
      var section = label.closest(".case-section");
      if (section) section.classList.add("method-ai-section");
    }
  });

  var style = document.createElement("style");
  style.textContent = [
    ".method-page .movement-name{display:flex;flex-direction:column;align-items:flex-start;gap:1px}",
    ".method-page .movement-verb{line-height:1.35}",
    ".method-page .movement-term{line-height:1.35}",
    ".method-page .method-ai-section .method-statement{font-family:Inter,-apple-system,BlinkMacSystemFont,\"Helvetica Neue\",Helvetica,Arial,sans-serif;font-weight:500}"
  ].join("");
  document.head.appendChild(style);
})();

(function () {
  var movements = Array.prototype.slice.call(document.querySelectorAll(".movement-item"));
  movements.forEach(function (item) {
    var summary = item.querySelector("summary");
    if (!summary) return;
    summary.addEventListener("click", function (event) {
      event.preventDefault();
      var shouldOpen = !item.hasAttribute("open");
      movements.forEach(function (other) { other.removeAttribute("open"); });
      if (shouldOpen) item.setAttribute("open", "");
    });
  });
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
    items.forEach(function (element) { observer.observe(element); });
  } else {
    items.forEach(function (element) { element.classList.add("is-visible"); });
  }
})();
