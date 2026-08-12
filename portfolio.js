var hamburger = document.getElementById("hamburger");
  var panel = document.getElementById("navPanel");
  var overlay = document.getElementById("navOverlay");

  function closeNav() {
    hamburger.classList.remove("open");
    panel.classList.remove("open");
    overlay.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    panel.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

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
  document.querySelectorAll(".nav-link").forEach(function (l) { l.addEventListener("click", closeNav); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeNav(); });

  /* Internal pages use the left nav position as a quiet way back home. */
  (function () {
    if (!document.querySelector(".case-page")) return;
    var homeControl = document.querySelector(".nav-ticker");
    if (!homeControl) return;
    homeControl.setAttribute("href", "/");
    homeControl.setAttribute("aria-label", "Back to home");
    homeControl.classList.add("nav-home");
  })();

  /* On the portfolio home, Method in the menu points to the Method section first. */
  (function () {
    if (!document.getElementById("method")) return;
    var methodNav = document.querySelector('.nav-panel a[href="/method/"]');
    if (methodNav) methodNav.setAttribute("href", "#method");
  })();

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
