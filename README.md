# El Kaoba — Private Residency & Capital Circle™

A luxury Caribbean residency and investor membership website built with Next.js.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **CSS-in-JS** (inline styles)
- **Google Fonts** (Cormorant Garamond + Outfit)

## Features

- 6 pages: Home, Residency ($7,500), Elite ($10,000), Executive ($15,000/yr), Apply, Contact
- Light/Dark mode toggle
- Scroll-triggered animations
- Mobile-responsive with hamburger menu
- Sticky navigation with blur backdrop
- Floating WhatsApp button
- Application & contact forms
- Membership comparison cards
- Image galleries with hover zoom
- Testimonial cards
- Stats bars with key metrics

## Pages

| Page | Description |
|------|-------------|
| Home | Full landing with hero, value props, tier comparison, location, experience |
| Residency | $7,500 lifestyle membership — detailed features, galleries, testimonials |
| Elite | $10,000 lifestyle + network — expanded privileges, network section |
| Executive | $15,000/yr investor circle — process steps, exclusivity, social proof |
| Apply | Executive Capital Circle application form |
| Contact | Contact form + WhatsApp/email/location details |

## Customization

- **Images**: All images use Unsplash URLs. Replace with your own photography.
- **Colors**: Edit the `themes` object at the top of `app/page.tsx`
- **Contact info**: Search for `info@elkaoba.com` and `+1 (809) 000-0000` to update
- **WhatsApp**: Update the `wa.me` link with your real number

## Deploy

```bash
npm run build
npm run start
```

Or deploy to Vercel:

```bash
npx vercel
```

## License

All rights reserved. El Kaoba Private Residency & Capital Circle™.
