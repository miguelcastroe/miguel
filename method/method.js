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
      label.classList.add("method-ai-label");
      var section = label.closest(".case-section");
      if (section) section.classList.add("method-ai-section");
    }
    if (label.textContent.trim() === "A note on the names") label.textContent = "*A note on the names";
  });

  var style = document.createElement("style");
  style.textContent = [
    ".method-page .movement-name{display:flex;flex-direction:column;align-items:flex-start;gap:1px}",
    ".method-page .movement-verb{line-height:1.35}",
    ".method-page .movement-term{line-height:1.35}",
    ".method-page .method-ai-label{font-family:Inter,-apple-system,BlinkMacSystemFont,\"Helvetica Neue\",Helvetica,Arial,sans-serif;font-size:13px;font-weight:500;line-height:1.5;letter-spacing:0}",
    ".method-page .method-ai-section .method-statement{font-family:Inter,-apple-system,BlinkMacSystemFont,\"Helvetica Neue\",Helvetica,Arial,sans-serif;font-weight:500}",
    ".method-page .method-note-section .case-section-copy p{font-size:13px;line-height:1.72}"
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
