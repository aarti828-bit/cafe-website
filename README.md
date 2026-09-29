# Cafe Website Demo

A responsive cafe website built with React and Vite. No paid services or backend are required.

## Run locally

```sh
npm install
npm run dev
```

Create a production build with `npm run build`; preview it with `npm run preview`.

## Customize for a cafe

Start in `src/cafeData.js`. This is the source for the cafe name and copy, phone and WhatsApp numbers, email, Instagram, address and Google Maps link, opening hours, menu items and prices, sample reviews, and gallery/menu photography. Phone numbers should include the country code. Keep `hours.isDemo` set to `true` until the real hours are entered.

Before launch, replace the demo story, menu, prices, and Unsplash photography. Add the client's real contact details, directions link, opening hours, and social profile. Replace or remove every “Sample Review” with genuine reviews the cafe has permission to publish. The app title, description, and share image follow `src/cafeData.js`; also replace the generic fallback metadata in `index.html` for no-JavaScript previews. Put the real production URL in `public/robots.txt` and `public/sitemap.xml` after the cafe's domain is known.

The visit form prepares a WhatsApp inquiry; it does not reserve a table or provide availability. It needs a real `whatsappNumber` to open a conversation. The contact form opens the visitor's email app and needs a real `email`. Neither form sends data to a server. No contact details, address, or review are supplied as real demo facts.
