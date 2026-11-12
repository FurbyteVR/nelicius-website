/* Nelicius Service – interactieve demo. Slaat niets op en verstuurt niets. */
(function () {
  "use strict";
  document.addEventListener("DOMContentLoaded", function () {

    /* ---------- Volgende onderhoudsbeurt: aftellen ---------- */
    var next = new Date(2026, 11, 5); // 5 december 2026
    var today = new Date(); today.setHours(0, 0, 0, 0);
    var days = Math.round((next - today) / 864e5);
    var chip = document.getElementById("next-service-chip");
    if (chip) {
      chip.textContent = days > 0 ? "Onderhoud over " + days + " dag" + (days === 1 ? "" : "en")
                       : days === 0 ? "Onderhoud vandaag" : "Onderhoud " + (-days) + " dagen te laat";
    }

    /* ---------- Monteur / klant weergave ---------- */
    var roleBtns = document.querySelectorAll("[data-role]");
    var status = document.getElementById("role-status");
    function setRole(role) {
      roleBtns.forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.role === role)); });
      document.querySelectorAll(".monteur-only").forEach(function (el) { el.hidden = role !== "monteur"; });
      document.querySelectorAll(".klant-only").forEach(function (el) { el.hidden = role !== "klant"; });
      status.textContent = role === "monteur" ? "Monteur-weergave: alle technische informatie zichtbaar."
                                              : "Klant-weergave: alleen informatie voor de klant zichtbaar.";
    }
    roleBtns.forEach(function (b) { b.addEventListener("click", function () { setRole(b.dataset.role); }); });

    /* ---------- Tabs (WAI-ARIA, pijltjestoetsen) ---------- */
    var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
    function select(tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute("aria-controls")).hidden = !on;
      });
      if (focus) tab.focus();
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function () { select(t); });
      t.addEventListener("keydown", function (e) {
        var n = null;
        if (e.key === "ArrowRight") n = tabs[(i + 1) % tabs.length];
        if (e.key === "ArrowLeft") n = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === "Home") n = tabs[0];
        if (e.key === "End") n = tabs[tabs.length - 1];
        if (n) { e.preventDefault(); select(n, true); }
      });
    });

    /* ---------- Documenten (demo) ---------- */
    var note = document.getElementById("doc-note");
    document.querySelectorAll("[data-doc]").forEach(function (b) {
      b.addEventListener("click", function () {
        note.textContent = "In de demo zijn documenten niet te openen. In de echte versie opent hier de pdf of foto.";
      });
    });

    /* ---------- Werkzaamheden toevoegen ---------- */
    var toggle = document.getElementById("add-toggle");
    var form = document.getElementById("add-form");
    toggle.addEventListener("click", function () {
      var open = form.hidden;
      form.hidden = !open;
      toggle.setAttribute("aria-expanded", String(open));
      if (open) document.getElementById("w-desc").focus();
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var desc = document.getElementById("w-desc");
      var err = document.getElementById("w-desc-error");
      var text = desc.value.trim();
      if (!text) { desc.setAttribute("aria-invalid", "true"); err.classList.add("show"); desc.focus(); return; }
      desc.setAttribute("aria-invalid", "false"); err.classList.remove("show");
      var type = document.getElementById("w-type").value;
      var name = document.getElementById("w-name").value.trim() || "Jij (demo)";
      var now = new Date();
      var li = document.createElement("li");
      li.className = "nieuw" + (type === "Storing" ? " storing" : "");
      li.tabIndex = -1;
      var t = document.createElement("time");
      t.dateTime = now.toISOString().slice(0, 10);
      t.textContent = now.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" }) + " · zojuist";
      var h = document.createElement("h3");
      h.textContent = type + " ";
      var badge = document.createElement("span");
      badge.className = "type" + (type === "Storing" ? " storing" : "");
      badge.textContent = "Nieuw";
      h.appendChild(badge);
      var ul = document.createElement("ul");
      ul.className = "monteur-only";
      text.split(/\n|;\s*|,\s+/).filter(Boolean).forEach(function (line) {
        var item = document.createElement("li"); item.textContent = line; ul.appendChild(item);
      });
      var klant = document.createElement("p");
      klant.className = "klant-only"; klant.hidden = true;
      klant.textContent = type + " uitgevoerd door je installateur.";
      var by = document.createElement("p");
      by.className = "by monteur-only"; by.textContent = "Door " + name;
      [t, h, ul, klant, by].forEach(function (el) { li.appendChild(el); });
      var tl = document.getElementById("timeline");
      tl.insertBefore(li, tl.firstChild);
      if (type === "Onderhoud") {
        document.getElementById("last-service").textContent = now.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
      }
      form.reset();
      form.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      var cur = document.querySelector('[data-role][aria-pressed="true"]');
      setRole(cur ? cur.dataset.role : "monteur");
      li.focus();
    });
  });
})();
