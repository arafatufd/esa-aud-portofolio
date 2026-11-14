/* ==========================================================================
   ESA | Digital Solutions by Arafat UFD
   File:    assets/js/config.js
   Purpose: The single place to edit contact details. main.js reads this file
            and fills every contact link and contact text on every page, so
            nothing else needs to change when a detail is updated.

   HOW TO USE
   1. Replace each empty value ("") below with your real detail.
   2. Save the file and upload it again.
   3. Leave a value empty ("") to keep the visible placeholder on the page
      (for example [PLACEHOLDER — WHATSAPP NUMBER]); the matching links then
      stay on "#contact" and open nothing.

   Load order: this file must load before main.js on every page.
     Homepage:     <script src="assets/js/config.js" defer></script>
     Inner pages:  <script src="../assets/js/config.js" defer></script>
   ========================================================================== */

window.ESA_CONFIG = Object.freeze({

  /* ------------------------------------------------------------------------
     WhatsApp
     number:  digits only, with the country code and without "+", spaces,
              dashes, or a leading 0.
              Format: 62xxxxxxxxxxx  (62 is Indonesia's country code)
     display: how the number is shown on the page, for example "+62 xxx-xxxx-xxxx".
              If left empty, main.js shows the number with a "+" in front.
     message: text that is already typed in the chat when someone taps a
              WhatsApp button. Edit freely, or leave empty for no message.
     ------------------------------------------------------------------------ */
  whatsapp: {
    number: "",
    display: "",
    message: "Halo Arafat, saya ingin berdiskusi tentang proyek digital."
  },

  /* ------------------------------------------------------------------------
     Email
     address: the full email address, for example name@example.com
     ------------------------------------------------------------------------ */
  email: {
    address: ""
  },

  /* ------------------------------------------------------------------------
     Freelance marketplace profile
     url:     the full profile address, starting with https://
     display: how the link is shown on the page. If left empty, main.js shows
              the address without "https://".
     ------------------------------------------------------------------------ */
  marketplace: {
    url: "",
    display: ""
  }

});
