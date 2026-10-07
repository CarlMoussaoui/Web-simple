# LuxuryDrive

Web estática de una empresa de alquiler de coches premium en Valencia. HTML, CSS y JavaScript simples, sin pasos de compilación ni dependencias.

## Project structure

```
project/
├── images/              Car photos and hero banners
└── luxurydrive/
    ├── index.html       Home: featured cars and services overview
    ├── fleet.html       Full fleet (17 cars)
    ├── services.html    Services, location, test drive form, legal info, FAQ
    ├── contact.html     Contact info, contact form, FAQ accordion, map
    ├── reservation.html Reservation page for the selected car
    ├── styles.css       Single stylesheet for every page
    ├── contact.js       Contact form and FAQ accordion
    └── reservation.js   Car catalog, prices and reservation form
```

Keep `images/` next to `luxurydrive/`. All image paths use `../images/`.

## How to run

Open `luxurydrive/index.html` in a browser (or use the VS Code Live Server extension). The site needs no server.

## How it works

**Navigation.** Every page shares the same header and footer. The current page is marked with `aria-current="page"` and styled in `styles.css`.

**Reservation.** Each "Reservar" button links to `reservation.html?car=<id>` (for example `?car=ferrari`). `reservation.js` reads the `car` parameter, looks the car up in `CAR_CATALOG`, then fills in the name, price, image, features, dates and price summary. An unknown or missing id falls back to the BMW. Daily cars are priced for 5 days and weekly cars for 7 days, plus insurance and delivery.

**Contact page.** `contact.js` handles the form (shows a confirmation and resets it) and the FAQ accordion (buttons toggle `aria-expanded`, and the CSS opens or closes each answer).

**Forms.** No data is sent anywhere yet. Both forms only show a confirmation message. A real backend would replace `handleContactSubmit` and `handleReservationSubmit`.

**Styles.** `styles.css` is mobile-first: the base rules are for phones and `min-width` media queries (36rem, 48rem, 62rem) add the larger layouts. Colors, shadows and other shared values are CSS variables in `:root`.

## Adding a new car

1. Put the photo in `images/`, using a kebab-case lowercase name (for example `bmw-x5.jpg`).
2. Add a card to `fleet.html`, copying an existing `car-card` and changing the id in the reservation link.
3. Add an entry to `CAR_CATALOG` in `reservation.js` with the same id.

## Code conventions

- Names are descriptive and in English: camelCase for variables and functions, `UPPER_SNAKE_CASE` for constants, kebab-case for CSS classes and for new files.
- `const` by default, `let` only when the value changes, never `var`, and `===` instead of `==`.
- Semantic HTML (`header`, `nav`, `main`, `section`, `footer`), one `h1` per page, an `alt` on every image and a `label` on every input.
- CSS classes describe function, not appearance. No `!important`, no inline styles, and `rem` or `%` instead of `px` where possible.

## Known pending items

- `terms.html` does not exist yet (the reservation form links to it).
- The address, phone number and cancellation policy differ between `services.html`, `contact.html` and the footers. Pick one and make them match.
- The image file names `FotoMercedes.jpg`, `Ferrari.jpg`, `bmwi8.jpg`, `audir8.jpg` and `rangerover.jpg` do not follow the kebab-case rule. If you rename them, update the matching names in the HTML and in `reservation.js`.
