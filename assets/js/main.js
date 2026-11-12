/* Nelicius — sitebrede scripts (geen externe libraries) */
(function () {
  "use strict";
  var CFG = window.NELICIUS_CONFIG || { business: {}, forms: {}, analytics: {} };
  var B = CFG.business || {};

  /* ---------- 1. Bedrijfsgegevens invullen ---------- */
  function fillBusiness() {
    document.querySelectorAll("[data-biz]").forEach(function (el) {
      var key = el.getAttribute("data-biz");
      var val = key === "address"
        ? [B.street, [B.postcode, B.city].join(" "), B.country].join(", ")
        : B[key];
      if (!val) return;
      if (el.tagName === "A") {
        if (key.toLowerCase().indexOf("email") > -1) el.href = "mailto:" + val;
        if (key.toLowerCase().indexOf("phone") > -1) el.href = "tel:" + val.replace(/[^\d+]/g, "");
      }
      el.textContent = val;
    });
    document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
  }

  /* ---------- 2. Mobiele navigatie ---------- */
  function initNav() {
    var btn = document.querySelector(".nav-toggle");
    var nav = document.getElementById("main-nav");
    if (!btn || !nav) return;
    function setOpen(open) {
      btn.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("open", open);
      btn.textContent = open ? "Sluiten" : "Menu";
    }
    btn.addEventListener("click", function () { setOpen(btn.getAttribute("aria-expanded") !== "true"); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) { setOpen(false); btn.focus(); }
    });
  }

  /* ---------- 3. Cookietoestemming ----------
     De site plaatst standaard GEEN cookies. Alleen je keuze wordt lokaal
     opgeslagen (localStorage), wat strikt noodzakelijk is om de keuze te
     onthouden. Analytische scripts laden pas na expliciete toestemming. */
  var KEY = "nelicius_consent";
  function readConsent() {
    try {
      var c = JSON.parse(localStorage.getItem(KEY));
      // Keuze is 12 maanden geldig; daarna vragen we opnieuw.
      var fresh = c && c.date && (Date.now() - new Date(c.date).getTime()) < 365 * 864e5;
      if (c && c.v === CFG.consentVersion && fresh) return c;
    } catch (e) {}
    return null;
  }
  function saveConsent(analytics) {
    var c = { v: CFG.consentVersion, necessary: true, analytics: !!analytics, date: new Date().toISOString() };
    try { localStorage.setItem(KEY, JSON.stringify(c)); } catch (e) {}
    applyConsent(c);
    return c;
  }
  function applyConsent(c) {
    var a = CFG.analytics || {};
    if (c && c.analytics && a.scriptSrc && !document.getElementById("analytics-script")) {
      var s = document.createElement("script");
      s.id = "analytics-script"; s.defer = true; s.src = a.scriptSrc;
      Object.keys(a.attributes || {}).forEach(function (k) { s.setAttribute(k, a.attributes[k]); });
      document.head.appendChild(s);
    }
    if (c && !c.analytics && document.getElementById("analytics-script")) {
      // Toestemming ingetrokken: script verwijderen en pagina herladen zodat niets meer draait.
      location.reload();
    }
  }
  function initCookies() {
    var banner = document.getElementById("cookie-banner");
    if (!banner) return;
    var prefs = document.getElementById("cookie-prefs");
    var analyticsBox = document.getElementById("consent-analytics");
    var lastFocus = null;

    function open() {
      lastFocus = document.activeElement;
      var c = readConsent();
      analyticsBox.checked = !!(c && c.analytics);
      banner.hidden = false;
      banner.querySelector("h2").focus();
    }
    function close() {
      banner.hidden = true;
      prefs.hidden = true;
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    banner.querySelector("[data-consent='accept']").addEventListener("click", function () { saveConsent(true); close(); });
    banner.querySelector("[data-consent='reject']").addEventListener("click", function () { saveConsent(false); close(); });
    banner.querySelector("[data-consent='customize']").addEventListener("click", function (e) {
      prefs.hidden = !prefs.hidden;
      e.currentTarget.setAttribute("aria-expanded", String(!prefs.hidden));
      if (!prefs.hidden) analyticsBox.focus();
    });
    banner.querySelector("[data-consent='save']").addEventListener("click", function () { saveConsent(analyticsBox.checked); close(); });
    banner.addEventListener("keydown", function (e) { if (e.key === "Escape" && readConsent()) close(); });

    document.querySelectorAll("[data-open-cookie-settings]").forEach(function (b) {
      b.addEventListener("click", function (e) { e.preventDefault(); open(); });
    });

    var c = readConsent();
    if (c) applyConsent(c); else { banner.hidden = false; }
  }

  /* ---------- 4. Formulieren ---------- */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function validate(form) {
    var ok = true, first = null;
    form.querySelectorAll("[required]").forEach(function (f) {
      var err = document.getElementById(f.id + "-error");
      var bad = f.type === "checkbox" ? !f.checked
              : f.type === "email" ? !EMAIL_RE.test(f.value.trim())
              : !f.value.trim();
      f.setAttribute("aria-invalid", bad ? "true" : "false");
      if (err) err.classList.toggle("show", bad);
      if (bad) { ok = false; if (!first) first = f; }
    });
    if (first) first.focus();
    return ok;
  }

  function collect(form) {
    var data = {};
    new FormData(form).forEach(function (v, k) { if (k !== "_gotcha") data[k] = typeof v === "string" ? v.trim() : v; });
    return data;
  }

  function mailtoFallback(form, data) {
    var to = form.getAttribute("data-mailto") === "privacy" ? B.privacyEmail : B.email;
    var subject = form.getAttribute("data-subject") || "Bericht via website";
    var body = Object.keys(data).map(function (k) { return k + ": " + data[k]; }).join("\n");
    window.location.href = "mailto:" + to + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
  }

  function initForms() {
    document.querySelectorAll("form[data-form]").forEach(function (form) {
      var status = form.querySelector(".form-status");
      form.setAttribute("novalidate", "");
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        status.className = "form-status"; status.textContent = "";
        if (form.querySelector(".hp input") && form.querySelector(".hp input").value) return; // spam
        if (!validate(form)) {
          status.className = "form-status err";
          status.textContent = "Controleer de gemarkeerde velden.";
          return;
        }
        var data = collect(form);
        data._subject = form.getAttribute("data-subject") || "Website";
        var endpoint = (CFG.forms || {})[form.getAttribute("data-form")];
        var success = form.getAttribute("data-success") || "Bedankt! We hebben je bericht ontvangen.";

        if (!endpoint) {
          mailtoFallback(form, data);
          status.className = "form-status ok";
          status.textContent = "Je e-mailprogramma wordt geopend met je bericht. Verstuur het daar om af te ronden.";
          return;
        }
        var btn = form.querySelector("[type=submit]");
        btn.disabled = true;
        fetch(endpoint, { method: "POST", headers: { "Accept": "application/json", "Content-Type": "application/json" }, body: JSON.stringify(data) })
          .then(function (r) { if (!r.ok) throw new Error(r.status); })
          .then(function () { status.className = "form-status ok"; status.textContent = success; form.reset(); })
          .catch(function () {
            status.className = "form-status err";
            status.textContent = "Versturen is niet gelukt. Mail ons direct via " + B.email + ".";
          })
          .then(function () { btn.disabled = false; status.focus(); });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    fillBusiness(); initNav(); initCookies(); initForms();
  });
})();
