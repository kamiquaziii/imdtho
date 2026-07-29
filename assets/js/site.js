/* ==========================================================================
   imdtho · shared shell (nav + footer)
   Single source of truth for the site header and footer. Each page includes
   <header id="site-header"></header> and <footer id="site-footer"></footer>;
   this script fills them and wires the mobile menu + active-page state.
   Kept in vanilla JS to match the existing static stack (no build step).
   ========================================================================== */
(function () {
  "use strict";

  // The step-down mark, inline so it inherits currentColor and needs no request.
  var MARK = '<svg class="nav__mark" viewBox="0 0 44 44" aria-hidden="true" focusable="false">' +
    '<rect x="0" y="0" width="16" height="14" fill="currentColor"></rect>' +
    '<rect x="14" y="15" width="16" height="14" fill="currentColor"></rect>' +
    '<rect x="28" y="30" width="16" height="14" fill="currentColor"></rect>' +
    "</svg>";

  var LINKS = [
    { href: "index.html", label: "Home" },
    { href: "team.html", label: "Our Team" }
  ];

  // Which page are we on? Normalise "/", "", "index.html" → index.html
  function currentFile() {
    var path = window.location.pathname.split("/").pop();
    return !path ? "index.html" : path;
  }

  function wordmark() {
    return '<span class="imdtho-wordmark" aria-hidden="true">imdtho</span>';
  }

  function renderHeader() {
    var host = document.getElementById("site-header");
    if (!host) return;
    var here = currentFile();

    var items = LINKS.map(function (l) {
      var active = l.href === here ? ' aria-current="page"' : "";
      return '<li><a class="nav__link" href="' + l.href + '"' + active + ">" + l.label + "</a></li>";
    }).join("");

    host.className = "site-header";
    host.innerHTML =
      '<div class="container">' +
        '<nav class="nav" aria-label="Primary">' +
          '<a class="nav__brand" href="index.html" aria-label="imdtho home">' +
            MARK + wordmark() +
          "</a>" +
          '<button class="nav__toggle" type="button" aria-expanded="false" aria-controls="primary-nav">' +
            '<span class="visually-hidden">Menu</span>' +
            '<svg data-icon="menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>' +
            '<svg data-icon="close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true" style="display:none"><path d="M5 5l14 14M19 5L5 19"/></svg>' +
          "</button>" +
          '<ul class="nav__links" id="primary-nav">' +
            items +
            '<li><a class="btn nav__cta" href="contact.html"' + (here === "contact.html" ? ' aria-current="page"' : "") + ">Get in touch" +
              '<svg class="icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="square" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>' +
            "</a></li>" +
          "</ul>" +
        "</nav>" +
      "</div>";

    wireToggle(host);
  }

  function wireToggle(host) {
    var toggle = host.querySelector(".nav__toggle");
    var links = host.querySelector(".nav__links");
    var iconMenu = host.querySelector('[data-icon="menu"]');
    var iconClose = host.querySelector('[data-icon="close"]');
    if (!toggle || !links) return;

    function setOpen(open) {
      links.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      iconMenu.style.display = open ? "none" : "";
      iconClose.style.display = open ? "" : "none";
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Close on nav link tap (mobile) and on Escape.
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
    // Reset when resizing up to desktop.
    window.addEventListener("resize", function () {
      if (window.innerWidth > 820) setOpen(false);
    });
  }

  function renderFooter() {
    var host = document.getElementById("site-footer");
    if (!host) return;
    var year = document.documentElement.getAttribute("data-year") || "2026";

    host.className = "site-footer";
    host.innerHTML =
      '<div class="container">' +
        '<div class="footer__top">' +
          '<div class="footer__brand">' +
            '<a class="nav__brand" href="index.html" aria-label="imdtho home">' + MARK + wordmark() + "</a>" +
            "<p>Two operators looking to buy an established company and run it for the long haul. Always down.</p>" +
          "</div>" +
          '<div class="footer__nav">' +
            '<div class="footer__col">' +
              "<h4>Site</h4>" +
              '<a href="index.html">Home</a>' +
              '<a href="team.html">Our Team</a>' +
              '<a href="contact.html">Contact</a>' +
            "</div>" +
            '<div class="footer__col">' +
              "<h4>Connect</h4>" +
              '<a href="mailto:hello@imdtho.com">hello@imdtho.com</a>' +
              '<a href="https://www.linkedin.com/in/patelshivam845" target="_blank" rel="noopener">Shivam on LinkedIn</a>' +
              '<a href="https://www.linkedin.com/in/zuhayerquazi" target="_blank" rel="noopener">Zuhayer on LinkedIn</a>' +
            "</div>" +
          "</div>" +
        "</div>" +
        '<div class="footer__bottom">' +
          "<span>&copy; " + year + " imdtho. All rights reserved.</span>" +
          "<span>Built with a bias toward action.</span>" +
        "</div>" +
      "</div>";
  }

  function init() {
    renderHeader();
    renderFooter();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
