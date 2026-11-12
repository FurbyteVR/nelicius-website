/* Nelicius Service – dashboard-demo. Alle gegevens zijn fictief; er wordt niets opgeslagen of verstuurd. */
(function () {
  "use strict";
  var A = [
    { id: "WP-10482", type: "Warmtepomp", model: "Nordvarm AW-8", plaats: "Rhenen", klant: "Fam. Voorbeeld", geplaatst: "05-12-2025", onderhoud: "05-12-2026", status: "warn", statusTxt: "Onderhoud binnenkort", link: true },
    { id: "AC-20117", type: "Airco", model: "Kalmo Split 3.5", plaats: "Veenendaal", klant: "Bakkerij Demo", geplaatst: "14-04-2025", onderhoud: "14-04-2027", status: "ok", statusTxt: "In orde" },
    { id: "WP-10391", type: "Warmtepomp", model: "Nordvarm AW-12", plaats: "Wageningen", klant: "Fam. Test", geplaatst: "22-09-2024", onderhoud: "22-11-2026", status: "warn", statusTxt: "Onderhoud binnenkort" },
    { id: "WP-10288", type: "Hybride warmtepomp", model: "Nordvarm HY-5", plaats: "Ede", klant: "Fam. Proef", geplaatst: "03-03-2024", onderhoud: "03-03-2027", status: "alert", statusTxt: "Open storing" },
    { id: "AC-20090", type: "Airco", model: "Kalmo Multi 5.0", plaats: "Amersfoort", klant: "Kantoor Voorbeeld BV", geplaatst: "18-07-2023", onderhoud: "18-01-2027", status: "ok", statusTxt: "In orde" },
    { id: "WP-10204", type: "Warmtepomp", model: "Nordvarm AW-8", plaats: "Rhenen", klant: "Fam. Demo", geplaatst: "09-11-2023", onderhoud: "09-11-2026", status: "alert", statusTxt: "Onderhoud te laat" },
    { id: "AC-20051", type: "Airco", model: "Kalmo Split 2.5", plaats: "Leersum", klant: "Fam. Steekproef", geplaatst: "27-05-2022", onderhoud: "27-05-2027", status: "ok", statusTxt: "In orde" },
    { id: "WP-10133", type: "Warmtepomp", model: "Nordvarm AW-10", plaats: "Wijk bij Duurstede", klant: "Fam. Model", geplaatst: "12-01-2022", onderhoud: "12-01-2027", status: "warn", statusTxt: "Garantie loopt af" },
    { id: "AC-20012", type: "Airco", model: "Kalmo Split 3.5", plaats: "Utrecht", klant: "Praktijk Voorbeeld", geplaatst: "02-06-2021", onderhoud: "02-06-2027", status: "ok", statusTxt: "In orde" },
    { id: "WP-10047", type: "Warmtepomp", model: "Nordvarm AW-8", plaats: "Renswoude", klant: "Fam. Fictief", geplaatst: "30-08-2021", onderhoud: "30-08-2027", status: "ok", statusTxt: "In orde" }
  ];
  var FEED = [
    ["WP-10482", "Controle na geluidsmelding uitgevoerd", "S. Jansen · 10 jun"],
    ["WP-10288", "Storing gemeld: foutcode E-03 (fictief)", "Klant via scan · gisteren"],
    ["AC-20117", "3 nieuwe foto's toegevoegd", "J. de Vries · 2 dagen geleden"],
    ["WP-10133", "Garantie verloopt over 30 dagen", "Automatische melding"],
    ["WP-10391", "Onderhoud ingepland", "Planning · 3 dagen geleden"]
  ];
  var USERS = [
    ["M. Eigenaar", "Eigenaar", "Alles"], ["P. Planning", "Beheerder", "Installaties, onderhoud, gebruikers"],
    ["J. de Vries", "Monteur", "Scannen, historie bijwerken"], ["S. Jansen", "Monteur", "Scannen, historie bijwerken"]
  ];
  var DOCS = [
    ["Installatierapport WP-10482", "PDF", "WP-10482"], ["Hydraulisch schema WP-10482", "PDF", "WP-10482"],
    ["Inbedrijfstellingsformulier AC-20117", "PDF", "AC-20117"], ["Foto's buitenunit (3)", "Foto's", "AC-20117"],
    ["Garantiebewijs WP-10133", "PDF", "WP-10133"], ["Servicehandleiding Nordvarm AW-serie", "PDF", "Alle AW-installaties"]
  ];

  function el(tag, attrs, text) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (text != null) e.textContent = text;
    return e;
  }
  function badge(a) { return el("span", { "class": "st " + a.status }, a.statusTxt); }
  function idCell(a) {
    var td = el("td");
    if (a.link) { var l = el("a", { href: "demo.html" }, a.id); td.appendChild(l); }
    else td.textContent = a.id;
    return td;
  }

  function renderAssets(filter) {
    var tb = document.getElementById("asset-rows"); tb.textContent = "";
    var f = (filter || "").toLowerCase();
    var rows = A.filter(function (a) { return !f || [a.id, a.type, a.model, a.plaats, a.klant].join(" ").toLowerCase().indexOf(f) > -1; });
    rows.forEach(function (a) {
      var tr = el("tr");
      tr.appendChild(idCell(a));
      [a.type, a.model, a.klant, a.plaats, a.onderhoud].forEach(function (t) { tr.appendChild(el("td", null, t)); });
      var td = el("td"); td.appendChild(badge(a)); tr.appendChild(td);
      tb.appendChild(tr);
    });
    document.getElementById("asset-count").textContent = rows.length + " van " + A.length + " installaties (demo-selectie)";
  }

  function renderMaint() {
    var tb = document.getElementById("maint-rows"); tb.textContent = "";
    A.filter(function (a) { return a.status !== "ok" || a.statusTxt !== "In orde"; }).forEach(function (a) {
      var tr = el("tr"); tr.appendChild(idCell(a));
      [a.type, a.klant, a.onderhoud].forEach(function (t) { tr.appendChild(el("td", null, t)); });
      var td = el("td"); td.appendChild(badge(a)); tr.appendChild(td);
      tb.appendChild(tr);
    });
  }

  function renderSimple(id, rows) {
    var tb = document.getElementById(id); tb.textContent = "";
    rows.forEach(function (r) { var tr = el("tr"); r.forEach(function (c) { tr.appendChild(el("td", null, c)); }); tb.appendChild(tr); });
  }

  function renderFeed() {
    var ul = document.getElementById("feed");
    FEED.forEach(function (f) {
      var li = el("li"); var s = el("strong", null, f[0] + " "); li.appendChild(s);
      li.appendChild(document.createTextNode(f[1])); li.appendChild(el("small", null, f[2])); ul.appendChild(li);
    });
  }

  function show(view) {
    document.querySelectorAll("[data-view]").forEach(function (b) {
      if (b.dataset.view === view) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current");
    });
    document.querySelectorAll(".dview").forEach(function (s) { s.hidden = s.id !== "view-" + view; });
    var h = document.querySelector("#view-" + view + " h1");
    if (h) { h.tabIndex = -1; h.focus(); }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var hour = new Date().getHours();
    document.getElementById("greet").textContent = (hour < 12 ? "Goedemorgen" : hour < 18 ? "Goedemiddag" : "Goedenavond") + ", Demo Installatietechniek";
    renderFeed(); renderAssets(""); renderMaint();
    renderSimple("user-rows", USERS); renderSimple("doc-rows", DOCS);
    document.getElementById("asset-search").addEventListener("input", function (e) { renderAssets(e.target.value); });
    document.querySelectorAll("[data-view]").forEach(function (b) { b.addEventListener("click", function () { show(b.dataset.view); }); });
    document.querySelectorAll("[data-goto]").forEach(function (b) { b.addEventListener("click", function () { show(b.dataset.goto); }); });
    var add = document.getElementById("user-add-note");
    document.getElementById("user-add").addEventListener("click", function () { add.textContent = "In de demo kun je geen gebruikers toevoegen. In de echte versie nodig je hier een monteur uit per e-mail."; });
  });
})();
