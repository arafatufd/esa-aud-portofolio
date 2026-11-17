/* ==========================================================================
   ESA | Digital Solutions by Arafat UFD
   File:    assets/js/main.js
   Purpose: Small, dependency-free behaviour shared by every page.
   Depends: assets/js/config.js (must load first). Both scripts are loaded
            with "defer", so the page is already parsed when this runs.

   What it does
     1. Contact links and text: fills every [data-link] and [data-text]
        element from window.ESA_CONFIG (WhatsApp, email, marketplace).
     2. Mobile menu: opens and closes the navbar menu below 1024px.
     3. Current section: highlights the matching navbar link while scrolling
        (homepage only, where the navbar links are #anchors).

   If something is missing (no config, no menu, an old browser), that part is
   skipped and the page keeps working as plain HTML.
   ========================================================================== */

(function () {
  'use strict';

  /* ------------------------------------------------------------------------
     1. CONTACT LINKS AND TEXT
     Markup contract (see index.html):
       <a data-link="whatsapp|email|marketplace" href="#contact">...</a>
       <span data-text="whatsapp|email|marketplace">[PLACEHOLDER ...]</span>
     A channel is only applied when its value in config.js is valid. Otherwise
     the link keeps its fallback href and the placeholder text stays visible.
     ------------------------------------------------------------------------ */
  var NEW_TAB_HINT = ' (membuka tab baru)';

  function clean(value) {
    return String(value == null ? '' : value).trim();
  }

  function buildWhatsApp(config) {
    if (!config) return null;
    var number = clean(config.number).replace(/\D/g, '');
    if (number.length < 8 || number.length > 15) return null;

    var message = clean(config.message);
    var href = 'https://wa.me/' + number;
    if (message) href += '?text=' + encodeURIComponent(message);

    return {
      href: href,
      text: clean(config.display) || '+' + number,
      external: true
    };
  }

  function buildEmail(config) {
    if (!config) return null;
    var address = clean(config.address);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) return null;

    return { href: 'mailto:' + address, text: address, external: false };
  }

  function buildMarketplace(config) {
    if (!config) return null;
    var raw = clean(config.url);
    if (!raw) return null;

    var url;
    try {
      url = new URL(raw);
    } catch (error) {
      return null;
    }
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;

    var shown = (url.host + url.pathname + url.search).replace(/\/$/, '');
    return {
      href: url.href,
      text: clean(config.display) || shown,
      external: true
    };
  }

  function applyContactConfig() {
    var config = window.ESA_CONFIG;
    if (!config) return;

    var channels = {
      whatsapp: buildWhatsApp(config.whatsapp),
      email: buildEmail(config.email),
      marketplace: buildMarketplace(config.marketplace)
    };

    document.querySelectorAll('[data-link]').forEach(function (link) {
      var channel = channels[link.getAttribute('data-link')];
      if (!channel) return;

      link.setAttribute('href', channel.href);

      if (channel.external) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');

        // Tell screen reader users that the link opens a new tab (added once)
        if (!link.querySelector('.new-tab-hint')) {
          var hint = document.createElement('span');
          hint.className = 'visually-hidden new-tab-hint';
          hint.textContent = NEW_TAB_HINT;
          link.appendChild(hint);
        }
      }
    });

    document.querySelectorAll('[data-text]').forEach(function (element) {
      var channel = channels[element.getAttribute('data-text')];
      if (channel) element.textContent = channel.text;
    });
  }


  /* ------------------------------------------------------------------------
     2. MOBILE MENU
     Markup contract (components.css):
       button.navbar__toggle  [aria-expanded, aria-controls, aria-label]
       nav.navbar__menu       (gets / loses .is-open)
       body                   (gets / loses .no-scroll while the menu is open)
     The menu is a normal inline bar from 1024px up, so it is closed and
     reset when the window grows past that width.
     ------------------------------------------------------------------------ */
  var LABEL_OPEN = 'Buka menu';
  var LABEL_CLOSE = 'Tutup menu';

  function initMobileMenu() {
    var toggle = document.querySelector('.navbar__toggle');
    var menu = document.querySelector('.navbar__menu');
    var navbar = document.querySelector('.navbar');
    if (!toggle || !menu || !navbar) return;

    function isOpen() {
      return menu.classList.contains('is-open');
    }

    function setOpen(open) {
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? LABEL_CLOSE : LABEL_OPEN);
      document.body.classList.toggle('no-scroll', open);
    }

    toggle.addEventListener('click', function () {
      setOpen(!isOpen());
    });

    // Choosing a link closes the menu
    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });

    // Escape closes the menu and returns focus to the button
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });

    // Tapping outside the navbar closes the menu
    document.addEventListener('click', function (event) {
      if (isOpen() && !navbar.contains(event.target)) setOpen(false);
    });

    // Growing to desktop width resets everything
    var desktop = window.matchMedia('(min-width: 1024px)');
    var onChange = function (event) {
      if (event.matches) setOpen(false);
    };
    if (desktop.addEventListener) {
      desktop.addEventListener('change', onChange);
    } else if (desktop.addListener) {
      desktop.addListener(onChange); // older Safari
    }
  }


  /* ------------------------------------------------------------------------
     3. CURRENT SECTION IN THE NAVBAR (homepage)
     Only navbar links whose href is a plain #anchor are tracked. On inner
     pages the links point to index.html#..., so nothing happens there.
     The section crossing a line near the middle of the screen is "current".
     The last current link stays highlighted when no section crosses the line
     (for example over the footer).
     ------------------------------------------------------------------------ */
  function initScrollSpy() {
    if (!('IntersectionObserver' in window)) return;

    var linksById = {};
    var sections = [];

    document.querySelectorAll('.navbar__link').forEach(function (link) {
      var href = link.getAttribute('href') || '';
      if (href.charAt(0) !== '#' || href.length < 2) return;

      var id = href.slice(1);
      var section = document.getElementById(id);
      if (!section) return;

      linksById[id] = link;
      sections.push(section);
    });

    if (!sections.length) return;

    function setCurrent(id) {
      Object.keys(linksById).forEach(function (key) {
        var link = linksById[key];
        var current = key === id;
        link.classList.toggle('is-active', current);
        if (current) {
          link.setAttribute('aria-current', 'true');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setCurrent(entry.target.id);
      });
    }, { rootMargin: '-45% 0px -54% 0px', threshold: 0 });

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }


  /* ------------------------------------------------------------------------
     START
     ------------------------------------------------------------------------ */
  function init() {
    applyContactConfig();
    initMobileMenu();
    initScrollSpy();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();