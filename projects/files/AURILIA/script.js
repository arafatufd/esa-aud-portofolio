/* ==========================================================================
   Aurelia — Premium Skincare Landing Page
   Fictional brand · self-initiated portfolio project
   ========================================================================== */

(function () {
  "use strict";

  var DESKTOP_QUERY = window.matchMedia("(min-width: 900px)");

  /* 1. Mobile navigation
     ====================================================================== */
  var toggle = document.querySelector(".nav__toggle");
  var menu = document.querySelector(".nav__menu");

  function setMenu(open) {
    if (!toggle || !menu) return;
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  function isMenuOpen() {
    return !!menu && menu.classList.contains("is-open");
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      setMenu(!isMenuOpen());
    });

    // Close after choosing a link or button inside the menu
    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false);
    });

    // Close on Escape and return focus to the toggle
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isMenuOpen()) {
        setMenu(false);
        toggle.focus();
      }
    });

    // Close when clicking outside the header
    document.addEventListener("click", function (event) {
      if (isMenuOpen() && !event.target.closest(".site-header")) setMenu(false);
    });

    // Reset state when the layout switches to desktop
    var onBreakpointChange = function (event) {
      if (event.matches) setMenu(false);
    };
    if (DESKTOP_QUERY.addEventListener) {
      DESKTOP_QUERY.addEventListener("change", onBreakpointChange);
    } else {
      DESKTOP_QUERY.addListener(onBreakpointChange); // older Safari
    }
  }

  /* 2. Demo feedback message (toast)
     ====================================================================== */
  var toast = document.createElement("div");
  toast.className = "toast";
  toast.setAttribute("role", "status");
  toast.setAttribute("aria-live", "polite");
  document.body.appendChild(toast);

  var toastTimer = null;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 3600);
  }

  /* 3. Product buttons (demo behavior, no real purchase)
     ====================================================================== */
  document.querySelectorAll(".product-card__cta").forEach(function (button) {
    button.addEventListener("click", function () {
      var name = button.getAttribute("data-product") || "This product";
      showToast(name + " is a fictional demo product. No purchase is possible on this site.");
    });
  });

  /* 4. Social placeholder links
     ====================================================================== */
  document.querySelectorAll("[data-placeholder]").forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      var network = link.getAttribute("data-placeholder");
      showToast("The " + network + " link is a placeholder. No real account exists.");
    });
  });
})();
