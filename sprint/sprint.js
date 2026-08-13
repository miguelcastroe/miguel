(function () {
  var checkoutUrl = "https://pay.hotmart.com/L106815370Q?checkoutMode=2";
  var checkoutLinks = document.querySelectorAll(".js-sprint-checkout");

  checkoutLinks.forEach(function (link) {
    link.href = checkoutUrl;
    link.classList.add("hotmart-fb", "hotmart__button-checkout");
  });

  if (!document.querySelector('link[href="https://static.hotmart.com/css/hotmart-fb.min.css"]')) {
    var css = document.createElement("link");
    css.rel = "stylesheet";
    css.type = "text/css";
    css.href = "https://static.hotmart.com/css/hotmart-fb.min.css";
    document.head.appendChild(css);
  }

  if (!document.querySelector('script[src="https://static.hotmart.com/checkout/widget.min.js"]')) {
    var script = document.createElement("script");
    script.src = "https://static.hotmart.com/checkout/widget.min.js";
    script.async = true;
    document.head.appendChild(script);
  }
})();
