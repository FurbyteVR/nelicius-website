# Nelicius Service – website

Statische website (HTML/CSS/JS, geen build-stap nodig) voor Nelicius Service, klaar voor **GitHub Pages**.

## Online zetten via GitHub Pages

1. Maak op GitHub een nieuwe repository, bijv. `nelicius-website` (Public).
2. Upload **de inhoud** van deze map (niet de map zelf) via *Add file → Upload files*, of:
   ```bash
   git init && git add . && git commit -m "Eerste versie website"
   git branch -M main
   git remote add origin https://github.com/<jouw-gebruikersnaam>/nelicius-website.git
   git push -u origin main
   ```
3. Ga naar *Settings → Pages* → Source: **Deploy from a branch** → Branch `main`, map `/ (root)` → Save.
4. Na ±1 minuut staat de site op `https://<jouw-gebruikersnaam>.github.io/nelicius-website/`.
5. Eigen domein (bijv. `nelicius.callmebyte.com`)? Vul het in bij *Settings → Pages → Custom domain*, zet bij je domeinregistrar een CNAME-record naar `<jouw-gebruikersnaam>.github.io` en vink **Enforce HTTPS** aan.

## Vóór livegang invullen (verplicht)

Alles staat op **één plek**: `assets/js/config.js`

- Juridische naam, adres, **KvK-nummer**, **btw-nummer**, e-mail, telefoon en noodnummer
- Formulier-endpoints (zie hieronder)

Daarnaast:
- `over-ons.html` → teamsectie invullen (alleen echte certificeringen/ervaring noemen)
- `privacy.html` → namen van formulier- en nieuwsbriefdienst invullen in de tabel "Delen met derden"
- Gebruik je een ander domein dan `nelicius.callmebyte.com`? Zoek-en-vervang dat in alle `.html`-bestanden, `sitemap.xml`, `robots.txt` en `.well-known/security.txt`
- Laat de algemene voorwaarden en het terugbetalingsbeleid nakijken door een jurist

## Formulieren werkend maken

GitHub Pages heeft geen server. Zonder instelling openen formulieren het e-mailprogramma van de bezoeker (werkt altijd). Voor echte formulierverzending:

1. Maak een gratis account op [formspree.io](https://formspree.io) (of een vergelijkbare dienst).
2. Maak een formulier per type (contact, nieuwsbrief, afmelden, gegevensverzoek) of gebruik er één voor alles.
3. Plak de endpoint-URL's in `assets/js/config.js` bij `forms`.
4. Sluit een verwerkersovereenkomst met die dienst af en noem hem in `privacy.html`.

## Structuur

| Bestand | Inhoud |
|---|---|
| `index.html` | Homepage |
| `demo.html` | Interactieve demo van het scanscherm |
| `over-ons.html` | Over ons + bedrijfsgegevens |
| `contact.html` | Contactformulier |
| `privacy.html` | Privacyverklaring (AVG) |
| `algemene-voorwaarden.html` | Algemene voorwaarden |
| `terugbetalingsbeleid.html` | Annuleren, herroepen en terugbetalen |
| `cookiebeleid.html` | Cookiebeleid |
| `gegevensverzoek.html` | Inzage-/verwijderverzoek (AVG) |
| `afmelden.html` | Afmelden nieuwsbrief |
| `verantwoord-melden.html` | Responsible disclosure (+ `.well-known/security.txt`) |
| `toegankelijkheid.html` | Toegankelijkheidsverklaring |
| `colofon.html` | Licenties van lettertypen/afbeeldingen |
| `404.html` | Foutpagina |

Zie `COMPLIANCE.md` voor hoe elk punt van de checklist is ingevuld.
