# Velvet & Vine content guide

This site is ready for GitHub Pages, but every item marked with square brackets or `---` is intentionally a placeholder.

## Business details to confirm

- Final salon name and short brand description
- WhatsApp number, address, city, opening hours, closed day and parking details
- Google Maps, Waze and Instagram URLs
- Instagram handle

## WhatsApp setup

Open `script.js` and replace:

```js
const WHATSAPP_NUMBER = "601XXXXXXXX";
```

Use the Malaysian international format without `+`, spaces or hyphens. Example format: `60123456789`.

## Pricing and service menu

Pricing is kept directly in `index.html` inside the section with `id="services"`.

Replace every `RM ---`, `FROM RM ---`, `-- min`, `-- hrs`, `Consult` and `TBC`. Confirm whether the salon prices by stylist tier or hair length, and remove whichever structure is not used.

## Stylist profiles

The three profiles in `index.html` use role placeholders:

1. Colour Specialist
2. Cutting Specialist
3. Texture Specialist

Replace each `NAME TO CONFIRM`, speciality, Instagram URL/handle and portrait with the real team information. No experience, awards or certifications have been claimed.

## Images

Optimized website images are under `assets/images/`. PNG masters are kept beside the WebP files.

- `hero/salon-campaign.webp`: replace with the salon's campaign or studio image.
- `transformations/01-balayage.webp` through `06-haircut.webp`: replace with real, client-approved before/after images. Keep each replacement as an equal left-before/right-after diptych so the slider continues to work.
- `stylists/01-colourist.webp` through `03-texture.webp`: replace with real team portraits.

The lookbook and Instagram sections intentionally reuse the transformation results until the salon supplies more work. When real images arrive, update each element's `data-image` and CSS `--look` value in `index.html`, plus `.shot-1` to `.shot-6` in `styles.css`.

## Reviews

The review section is explicitly a placeholder. Add only a verified client review with permission, then replace the client name/initials, service and review source.

## Before publishing

- Confirm every service, duration and price.
- Replace all bracketed business details.
- Replace placeholder Map, Waze and Instagram `href="#"` links.
- Use real before/after photos only with client approval.
- Test the WhatsApp form after setting the number.
