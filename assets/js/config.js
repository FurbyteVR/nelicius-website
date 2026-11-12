/* ==========================================================================
   Nelicius Security — CENTRALE CONFIGURATIE
   --------------------------------------------------------------------------
   Pas hier je bedrijfsgegevens aan. Ze worden automatisch op alle pagina's
   ingevuld (footer, contactpagina, privacyverklaring, voorwaarden, enz.).
   Velden die nog "[...]" bevatten MOET je invullen vóór livegang —
   de wet (art. 3:15d BW / Handelsregisterwet) verplicht o.a. KvK-nummer,
   vestigingsadres en e-mailadres op je website.
   ========================================================================== */
window.NELICIUS_CONFIG = {
  business: {
    name: "Nelicius Security",
    legalName: "[Juridische naam, bv. Nelicius Security B.V.]",
    street: "[Straat + huisnummer]",
    postcode: "[Postcode]",
    city: "[Plaats]",
    country: "Nederland",
    kvk: "[KvK-nummer]",
    vat: "[Btw-identificatienummer]",
    email: "info@callmebyte.com",           // algemeen e-mailadres
    privacyEmail: "privacy@callmebyte.com", // voor AVG-verzoeken
    phone: "[+31 ...]",                  // algemeen telefoonnummer
    emergencyPhone: "[+31 ... 24/7]",    // nummer voor incidenten
    hours: "Maandag t/m vrijdag 09:00–17:00"
  },

  /* Formulieren
     GitHub Pages heeft geen server. Maak gratis een formulier aan bij een
     formulierdienst (bv. https://formspree.io) en plak de endpoint-URL hier.
     Laat leeg ("") → formulieren openen dan het e-mailprogramma van de
     bezoeker (mailto) met het ingevulde bericht. */
  forms: {
    contact: "",      // bv. "https://formspree.io/f/abcdwxyz"
    newsletter: "",
    unsubscribe: "",
    dataRequest: ""
  },

  /* Analytics (optioneel)
     Laat leeg om geen enkele analytics te laden. Vul je een script-URL in,
     dan wordt die ALLEEN geladen nadat de bezoeker "analytische cookies"
     heeft geaccepteerd. Vermeld de dienst dan ook in cookiebeleid.html. */
  analytics: {
    scriptSrc: "",
    attributes: {}    // bv. { "data-domain": "nelicius.nl" }
  },

  // Verhoog dit nummer als je cookiebeleid wezenlijk wijzigt → bezoekers
  // krijgen dan opnieuw de keuze.
  consentVersion: 1
};
