# LuxuryDrive

Static multi-page website for a premium car rental company in Valencia. Built with vanilla HTML5, CSS3 and JavaScript (ES6+). No build step, no bundler, no runtime dependencies, no backend.

## Table of contents

1. [Tech stack](#tech-stack)
2. [Architecture overview](#architecture-overview)
3. [Project structure](#project-structure)
4. [Getting started](#getting-started)
5. [Technical details](#technical-details)
6. [Extending the project](#extending-the-project)
7. [Code conventions](#code-conventions)
8. [Accessibility and semantics](#accessibility-and-semantics)
9. [Known limitations and pending items](#known-limitations-and-pending-items)

## Tech stack

| Layer | Technology | Notes |
|---|---|---|
| Markup | HTML5 | Semantic elements, one `h1` per page |
| Styling | CSS3 | Single stylesheet, custom properties, mobile-first media queries |
| Logic | JavaScript (ES6+) | Vanilla, no frameworks or libraries |
| Tooling | None | Optional: VS Code Live Server for development |
| Backend | None | Forms are simulated client-side |

## Architecture overview

The site is a set of independent static pages that share one stylesheet and a common header/footer markup (duplicated in each HTML file, since there is no templating or component system).

```
 index.html ─┐
 fleet.html ─┼──► styles.css (shared by every page)
 services.html ─┤
 contact.html ──┼──► contact.js
 reservation.html ──► reservation.js
```

- **Navigation** is plain `<a href>` links between pages (multi-page application, full page loads).
- **State between pages** is passed through the URL query string (`reservation.html?car=<id>`), not through `localStorage`, cookies or any server session.
- **Data** lives in the code: car markup is hardcoded in `fleet.html` and the reservation data is a JavaScript object (`CAR_CATALOG`) in `reservation.js`.

## Project structure

```
project/
├── images/                 Car photos and hero banners
└── luxurydrive/
    ├── index.html          Home: featured cars and services overview
    ├── fleet.html          Full fleet (17 cars)
    ├── services.html       Services, location, test drive form, legal info, FAQ
    ├── contact.html        Contact info, contact form, FAQ accordion, map
    ├── reservation.html    Reservation page for the selected car
    ├── styles.css          Single stylesheet for every page
    ├── contact.js          Contact form and FAQ accordion
    └── reservation.js      Car catalog, prices and reservation form
```

`images/` must stay at the same level as `luxurydrive/`: every image path in the HTML and in `reservation.js` is relative (`../images/...`).

## Getting started

### Requirements

Any modern browser (Chrome, Firefox, Edge, Safari). No Node.js, npm or package installation is needed.

### Run locally

Option 1: open `luxurydrive/index.html` directly in the browser (`file://` protocol). It works because the site makes no network requests (no `fetch`, no modules, no external data files).

Option 2: use the VS Code **Live Server** extension for automatic reload while developing.

## Technical details

### Shared layout and navigation

Header and footer are repeated in every page. The active page is flagged with `aria-current="page"` on its nav link, and `styles.css` styles that attribute, so the highlight is driven by an accessible attribute rather than by an extra class.

### Reservation flow (`reservation.js`)

1. A "Reservar" button on the fleet or home page links to `reservation.html?car=<id>` (for example `?car=ferrari`).
2. On load, `reservation.js` reads the `car` query parameter from the URL.
3. It looks up that id in the `CAR_CATALOG` object.
4. It renders the car data into the page: name, price, image, features, dates and the price summary.
5. If the id is missing or does not exist in the catalog, it **falls back to the BMW** entry, so the page never renders empty.

**Price calculation.** The summary is computed from the car's rate:

- Cars with a **daily** rate are priced for **5 days**.
- Cars with a **weekly** rate are priced for **7 days**.
- Insurance and delivery are added on top.

**Form handling.** `handleReservationSubmit` currently only shows a confirmation message. No data leaves the browser.

### Contact page (`contact.js`)

- **Contact form:** `handleContactSubmit` shows a confirmation message and resets the form. No data is sent.
- **FAQ accordion:** each question is a `<button>` that toggles its `aria-expanded` attribute. The CSS reads that attribute to open or close the matching answer, so show/hide logic lives in the stylesheet and JavaScript only flips state.

### Styling (`styles.css`)

- **Mobile-first:** base rules target phones; larger layouts are added with `min-width` media queries at **36rem**, **48rem** and **62rem**.
- **Design tokens:** colors, shadows and other shared values are CSS custom properties declared in `:root`, so a theme change means editing a single block.
- **Units:** `rem` and `%` are preferred over `px` so layouts scale with user font settings.
- **No `!important`, no inline styles.** Specificity is managed through class design.

## Extending the project

### Adding a new car

1. Add the photo to `images/` using a lowercase kebab-case name (for example `bmw-x5.jpg`).
2. In `fleet.html`, copy an existing `car-card` and change the id in its reservation link (`reservation.html?car=<new-id>`).
3. In `reservation.js`, add an entry to `CAR_CATALOG` using the **same id**.

The id is the contract that connects the three places: the link in the HTML, the query parameter and the catalog key. If they do not match, the reservation page silently falls back to the BMW.

### Replacing the simulated forms with a real backend

Replace the bodies of `handleContactSubmit` and `handleReservationSubmit` with a request to an API endpoint (for example `fetch` with `POST` and a JSON body), and add validation and error handling for the response. Note that the site would then need to be served over HTTP(S) and the backend would need to handle CORS if hosted on another origin.

## Code conventions

**JavaScript**
- English, descriptive names: `camelCase` for variables and functions, `UPPER_SNAKE_CASE` for constants (for example `CAR_CATALOG`).
- `const` by default, `let` only when the value is reassigned, never `var`.
- Strict equality (`===`) instead of `==`.

**HTML**
- Semantic structure: `header`, `nav`, `main`, `section`, `footer`.
- One `h1` per page.
- Every `img` has an `alt`; every form control has an associated `label`.

**CSS**
- Class names describe function, not appearance, and use kebab-case.
- No `!important`, no inline styles.

**Files**
- New files use kebab-case.

## Accessibility and semantics

- Landmarks via semantic elements for screen-reader navigation.
- `aria-current="page"` marks the current page in the navigation.
- The FAQ accordion uses native `<button>` elements with `aria-expanded`, so it is keyboard-operable and exposes its state to assistive technology.
- Text alternatives on all images and labels on all inputs.

## Known limitations and pending items

- **No persistence or backend:** both forms are simulated; nothing is stored or sent.
- **Duplicated markup:** header and footer are copied into every page, so any change has to be applied to each HTML file.
- **Hardcoded data:** the fleet is defined in HTML (`fleet.html`) and in `CAR_CATALOG` separately; both must be kept in sync manually.
- **Missing page:** `terms.html` does not exist yet, but the reservation form links to it.
- **Inconsistent content:** the address, phone number and cancellation policy differ between `services.html`, `contact.html` and the footers. One source of truth should be chosen and applied everywhere.
- **File naming:** `FotoMercedes.jpg`, `Ferrari.jpg`, `bmwi8.jpg`, `audir8.jpg` and `rangerover.jpg` do not follow the kebab-case convention. If renamed, update the references in the HTML files and in `reservation.js`.
