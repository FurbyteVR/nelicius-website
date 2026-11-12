# Compliance-checklist

| Eis | Status | Waar / hoe |
|---|---|---|
| Privacy policy | ✅ | `privacy.html` – doelen, grondslagen, bewaartermijnen, derden, rechten, klacht bij AP |
| Terms of service | ✅ | `algemene-voorwaarden.html` (laat juridisch toetsen) |
| Refund policy | ✅ | `terugbetalingsbeleid.html` – incl. 14 dagen herroepingsrecht consumenten, alle annuleringskosten zichtbaar |
| Cookie policy | ✅ | `cookiebeleid.html` – tabel met alle opslag |
| Cookie consent banner | ✅ | Op elke pagina; geen keuze vooraf aangevinkt; "Alleen noodzakelijk" even prominent als "Alles accepteren"; altijd te wijzigen via "Cookie-instellingen" in de footer; keuze 12 mnd geldig |
| Check form consents | ✅ | Alle toestemmingsvakjes leeg als standaard; nieuwsbrief is een aparte, optionele keuze; privacyverklaring gelinkt |
| Collect only needed data | ✅ | Contact: alleen naam, e-mail, bericht verplicht. Nieuwsbrief/afmelden: alleen e-mail. Geen telefoon/adres/ID gevraagd |
| Audit third-party SDKs | ✅ | Geen enkel extern script, font, embed of pixel. Fonts lokaal gehost. Analytics alleen na toestemming én alleen als je zelf een script in `config.js` zet |
| Remove dark patterns | ✅ | Gelijkwaardige cookieknoppen, geen vooraf aangevinkte vakjes, afmelden zonder reden/inlog, geen nep-urgentie of aftellers |
| No hidden fees | ✅ | `diensten.html#prijs-t` + voorwaarden art. 3: vaste prijs, alle kosten vooraf; annuleringskosten in tabel |
| No fake reviews | ✅ | Geen testimonials of beoordelingen. Expliciet vermeld op homepage |
| No unsupported claims | ✅ | Geen "nr. 1", geen verzonnen cijfers, geen certificeringen; "geen 100% veiligheid" expliciet; normcertificering alleen als "voorbereiding op" |
| Add alt text | ✅ | Alle `<img>` hebben `alt`; decoratieve logo's `alt=""`; SVG-illustratie met `<title>` |
| Fix color contrast | ✅ | Alle combinaties ≥ 4.5:1 (WCAG AA), zie commentaar in `style.css` |
| Keyboard navigation | ✅ | Skip-link, zichtbare focusrand, menu met `aria-expanded` + Escape, formulierfouten focussen op eerste fout |
| Business details | ⚠️ invullen | Footer, contact en over-ons via `config.js` (KvK, btw, adres, e-mail, telefoon) |
| Age consent for kids | ✅ | Verplicht vinkje "16 jaar of ouder" bij contact & nieuwsbrief; sectie in privacyverklaring (AVG art. 8, NL-grens 16 jaar) |
| Unsubscribe link | ✅ | `afmelden.html`, gelinkt in footer en bij aanmelding. **Zet ook in elke nieuwsbrief-e-mail een afmeldlink** (doen de meeste maildiensten automatisch) |
| License stock images | ✅ | Geen stockfoto's gebruikt; alle beelden eigen SVG; font-licenties (OFL) in `colofon.html` |
| Data deletion option | ✅ | `gegevensverzoek.html` – verwijderen, inzage, correctie, bezwaar, overdracht, toestemming intrekken |

Extra: `.well-known/security.txt` + `verantwoord-melden.html` (past bij een securitybedrijf), toegankelijkheidsverklaring, `sitemap.xml`, `robots.txt`, 404-pagina, `prefers-reduced-motion`-ondersteuning.
