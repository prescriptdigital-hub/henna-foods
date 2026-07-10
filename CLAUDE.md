# CLAUDE.md — Henna Foods

Guidance for building the Henna Foods ecommerce website. Read this before generating any UI, component, or page.

## Project

Build a polished ecommerce website (design system + frontend prototype) for **Henna Foods**, a premium food brand. The store sells two products:

1. **Bukkie's Premium Cookies**
2. **Richie Premium Chinchin**

The site must feel **premium, warm, joyful, clean, food-focused, elegant, and global**. It must **not** look cheap, childish, crowded, or overly playful.

## Brand emotions to communicate

Elegance · Brilliance · Gracefulness · Joy · Life · Love · Premium quality · Warmth · Trust · Global appeal.

### Per-product emotional direction
**Bukkie's Premium Cookies** — Desire · Elegance · Pleasure · Love · Beauty · Life · Friendship · Share · Excitement. Lean romantic, indulgent, and luxurious: deep rose red, gold, ivory, soft satin textures, single red/ivory roses.

**Richie Premium Chinchin** — Fun · Joy/Excitement · Alive · Active · Friendship · Sharing · Possibilities. Lean vibrant, energetic, and celebratory: golden yellow, gold, warm orange, rose-red accents, motion and sharing moments.

## Logo rules (do not break)

The Henna Foods logo must stay consistent on every page, label, product card, and packaging mockup.

- "Henna" is in **elegant gold serif** typography.
- "FOODS" sits underneath in **coral/red uppercase** letters.
- Multi-colored **petals sit at the top-right of "Henna," near the final "a."** Never move them.
- Do **not** create unrelated icons or monogram marks (no "B" monogram) that don't represent the Henna brand. A cookie icon is fine only as a small decorative icon, never as the main brand mark.

## Brands & taglines

**Global tagline:** Elegant Taste. Joyful Moments.

**Bukkie's Premium Cookies** — luxury bakery; rich, buttery, giftable, comforting, indulgent.
- Tagline: *Rich. Buttery. Unforgettable.*
- Alt: *Freshly Baked Happiness.*

**Richie Premium Chinchin** — crunchy, joyful, festive, snackable, premium, proudly flavorful.
- Tagline: *Crunchy. Joyful. Delicious.*
- Alt: *A Golden Crunch of Joy.*

## Color system

No pink anywhere. The romantic red in this brand is a deep satin **Rose Red** (from the rose/satin imagery), supported by **Gold** and **Golden Yellow** over cream and ivory.

### Primary
| Token | Hex | Use |
|---|---|---|
| Henna Gold | `#D6A62F` | Logo, premium details, borders, buttons, icons, highlights, badges |
| Golden Yellow | `#F4C430` | Joyful accents, Richie/chinchin highlights, badges, glow, subtle gradients |
| Rose Red | `#C41E3A` | "FOODS," romantic/love accents, CTA accents, sale tags, active states, rose motifs |
| Rose Red Dark | `#8E1220` | Hover/pressed states, deep satin shadows, contrast on red |
| Warm Cream | `#FFF4E1` | Main website background |
| Soft Ivory | `#FFF9EF` | Cards, product sections, modals, packaging blocks |
| Deep Chocolate Brown | `#3B1F10` | Headings, body text, product names, footer, contrast |

### Bukkie's (cookies) secondary
Cookie Brown `#A65F2B` · Chocolate Chip Brown `#4B2413` · Rose Red `#C41E3A` · Ivory Rose `#FFF6EC` · Butter Cream `#FBE6C4` · Premium Gold `#C89B2C`

### Richie (chinchin) secondary
Golden Crunch `#E8A735` · Golden Yellow `#F4C430` · Warm Orange `#F28A2E` · Toasted Brown `#8A4B1F` · Fresh Green Accent `#4F9A3D` · Cream Base `#FFF3D8`

### Petal / accent colors (use minimally)
Rose Red `#C41E3A` · Gold `#D6A62F` · Golden Yellow `#F4C430` · Warm Orange `#F26A3D` · Green `#4F9B3A`. No pink.

## Typography

**Headings (elegant serif):** Playfair Display (default), Cormorant Garamond, or Libre Baskerville. Use for product names, hero headlines, premium section titles, brand story headings.

**Body (clean sans):** Inter (default), Lato, Montserrat, or Open Sans. Use for descriptions, nav, checkout, buttons, ingredients, footer links.

**Accent:** italic serif, used sparingly for emotional phrases ("Made with love.", "Freshly baked happiness.", "A joyful crunch in every bite.").

### Type scale
**Desktop:** Hero 64–80px (serif, 500–600) · Page 48–56px · Section 32–40px · Card title 24–28px · Body 16–18px (line-height 1.5–1.7) · Small 12–14px.

**Mobile:** Hero 38–48px · Page 32–40px · Section 24–30px · Body 15–16px.

## Buttons

**Primary** (Shop Now / Add to Cart / Buy Now): bg Deep Chocolate Brown `#3B1F10`, white text, radius 999px, padding 14px 28px, clean sans, slight letter-spacing, hover = lighter brown or gold shadow.

**Secondary** (View Product / Learn More / Explore Flavours): transparent bg, 1px Henna Gold border, chocolate text, radius 999px, hover = soft ivory/gold tint.

**Accent** (Limited Offer / Order Now / Shop Cookies — use sparingly): bg Rose Red `#C41E3A`, white text, hover = Rose Red Dark `#8E1220`.

## Layout

**Use:** large white space, soft cream backgrounds, premium food photography, rounded product cards, gold borders, subtle rose accents (deep red and ivory roses, satin texture), clean ecommerce sections, warm food close-ups, elegant label details, soft shadows.

**Avoid:** overcrowding, loud colors, **any pink**, cartoonish graphics, unrelated icons, cheap stock-photo feel, misplaced logo petals.

## Design tokens (CSS custom properties)

```css
:root {
  --color-gold: #D6A62F;
  --color-gold-dark: #A87C1B;
  --color-golden-yellow: #F4C430;
  --color-cream: #FFF4E1;
  --color-ivory: #FFF9EF;
  --color-chocolate: #3B1F10;
  --color-rose-red: #C41E3A;
  --color-rose-red-dark: #8E1220;
  --color-cookie-brown: #A65F2B;
  --color-green: #4F9B3A;
  --font-heading: "Playfair Display", Georgia, serif;
  --font-body: "Inter", Arial, sans-serif;
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-pill: 999px;
  --shadow-soft: 0 12px 32px rgba(59, 31, 16, 0.12);
  --shadow-card: 0 8px 24px rgba(59, 31, 16, 0.10);
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 32px;
  --space-xl: 64px;
}
```

## Components to build

Reusable: `Header`, `Footer`, `ProductCard`, `Button`, `Badge`, `QualityIconCard`, `ProductHero`, `Newsletter`, `CartSummary`.

### ProductCard
Includes: product photo, name, short description, weight/pack size, price placeholder, rating, Add to Cart button. Style: bg Soft Ivory `#FFF9EF`, 1px soft-gold border, radius 20–28px, soft warm shadow, button chocolate or gold, hover = slight lift.

### QualityIconCard (Quality Promise)
Four cards: Made with Love · Premium Ingredients · Baked to Perfection · Joy in Every Bite. Thin line icons, gold or chocolate brown, simple/elegant, rounded edges, not cartoonish.

## Pages

1. Home
2. Shop
3. Bukkie's Premium Cookies (product page)
4. Richie Premium Chinchin (product page)
5. About Henna Foods
6. Contact
7. Cart
8. Checkout
9. Thank You / Order Confirmation

### Homepage structure
1. **Header** — logo left, nav (Shop · Cookies · Chinchin · About · Contact · Cart), cart icon right, white/ivory bg, thin gold bottom border, optional sticky. Mobile: hamburger, logo left/centered, cart right.
2. **Hero** — headline "Elegant Taste. / Joyful Moments." Supporting: "Discover premium cookies and crunchy chinchin crafted with love, quality ingredients, and unforgettable flavour." Buttons: Shop Cookies, Shop Chinchin. Cream bg + soft gold gradient, consistent logo, pack shots, "Premium Foods"/"Made with Love" badge, subtle rose petals.
3. **Product Showcase** — title "Our Signature Treats." Cards for both products with Shop buttons.
4. **Brand Story** — "From Our Kitchen to the World." Body: "Henna Foods creates premium treats made to bring joy, love, and elegance to everyday moments. From buttery cookies to crunchy chinchin, every product is crafted with care and made to be shared."
5. **Quality Promise** — 4 QualityIconCards (above).
6. **Featured Products** — full product cards for both.
7. **Newsletter** — "Join the Henna Family" / "Get updates, offers, and sweet moments from Henna Foods." Button: Subscribe.
8. **Footer** — bg Deep Chocolate Brown, cream text, gold logo/social icons. Sections: Shop · About Henna Foods · Customer Care · Follow Us · Newsletter.

### Product page layout
**Left:** large image gallery (packaging, food close-up, lifestyle). **Right:** name, tagline, price, quantity selector, Add to Cart, Buy Now, benefits, ingredients, shipping info.

**Bukkie's copy:** "Bukkie's Premium Cookies — Rich. Buttery. Unforgettable. Golden-baked cookies with delicious chocolate chips, crafted with premium ingredients for a warm, joyful treat." Benefits: made with fine ingredients · rich butter goodness · baked to perfection · perfect for gifting and sharing.

**Richie copy:** "Richie Premium Chinchin — Crunchy. Joyful. Delicious. A golden crunchy snack made for sharing, celebration, and everyday enjoyment." Benefits: perfect crunchy texture · joyful snack for every moment · great for gifting and parties · made with care by Henna Foods.

## Packaging / label direction

Site should match packaging style.
- **Bukkie's:** cream/gold/brown + rose-red and ivory accents (no pink), elegant photography, premium seal/badge, deep-red and ivory rose / satin background motifs, chocolate-chip cookie photography; luxury bakery, romantic, giftable feel evoking desire, pleasure, love, and beauty.
- **Richie:** cream/gold/golden-yellow/orange/toasted-brown + green accents, crunchy snack imagery, joyful-but-premium, warm African-inspired energy with global presentation, clean packaging-style cards evoking fun, joy, and sharing.

**Label/sticker UI:** circular Henna Foods sticker · rectangular product label · small "Made with Love" sticker · "Premium Quality / Baked Fresh" sticker. Any sticker using the Henna logo must keep petals at top-right of "Henna." No unrelated monograms.

## Ecommerce UI

**Announcement bar:** bg Henna Gold `#D6A62F`, chocolate text. E.g. "Free delivery on selected orders | Freshly made with love."

**Badges:** Best Seller · New · Premium Quality · Freshly Baked. Style: gold outline, cream fill, chocolate text, rounded pill or small seal.

**Forms:** white input bg, soft-gold/light-brown border, radius 12px, chocolate text, focus border Henna Gold, chocolate button. Use for newsletter, checkout, contact, reviews.

**Icons:** thin line, gold or chocolate brown, simple/elegant, rounded, not cartoonish. Set: wheat, cookie, heart, gift box, leaf, bowl, shopping bag, delivery truck, star, shield/premium badge.

## Photography

**Bukkie's — use:** close-up cookies, stacks, chocolate chips, cream table bg, deep-red and ivory roses, red satin texture, gold accents, glass jars/premium packaging, warm light. **Avoid:** harsh shadows, messy crumbs, cartoon graphics, cheap stock, any pink.

**Richie — use:** chinchin in bowls, pouring motion, snack packs, celebration table, warm golden-yellow/orange/gold bg, rose-red accents, family sharing, clean styling. **Avoid:** busy patterns, too many colors, plastic-looking food, any pink.

Use placeholder images, but design layouts so they're easy to swap later.

## Microcopy

- Homepage: "Beautifully made foods for joyful moments."
- Product CTA: "Add joy to your cart."
- Empty cart: "Your basket is waiting for something delicious."
- Checkout: "Almost time to enjoy your Henna treats."
- Thank You: "Thank you for choosing Henna Foods. Your order was made with love."
- Newsletter: "Sweet updates, fresh offers, and joyful moments."

## Brand voice

Warm · elegant · joyful · confident · loving · premium. Example phrases: "Made with love for joyful moments." · "Premium treats crafted to brighten your day." · "Every bite carries warmth, beauty, and care." · "From our kitchen to the world." · "Elegance and joy in every bite."

## Deliverables checklist

1. Design system (colors, typography, spacing, buttons, cards, badges, forms, layout).
2. Reusable components (listed above).
3. Page layouts (listed above).
4. Responsive for desktop, tablet, mobile.
5. Consistent logo + petal placement everywhere.
6. Placeholder images, easy to replace.
7. Premium food-ecommerce styling (cream bg, gold details, chocolate type, coral accents, rose petals, elegant spacing, soft shadows).
8. Final result feels like a global premium food brand.

## Originality & human feel (required)

The site must feel like an original, one-of-a-kind premium brand — not a template, not a stock layout, and not something that reads as AI-generated.

- **No long dashes.** Never use em dashes (—) or en dashes (–) in any visible copy, headings, product text, or microcopy. Use commas, periods, or "and" instead. (A normal hyphen in a compound word like "chocolate-chip" is fine.)
- **No "made by AI" tells.** Do not include AI-generated disclaimers, watermarks, placeholder lorem-ipsum left in, generic "As an AI" phrasing, or boilerplate copy. All text should read as genuine human brand writing in the Henna voice.
- **Be unique.** Avoid cookie-cutter, recognizably-templated section patterns. Use distinctive layouts, custom spacing, considered typographic detail, and original copy so the site looks like a website that hasn't been seen before.
- Avoid overused AI phrasing and filler ("elevate," "unlock," "in today's world," "look no further," "the perfect blend of"). Write warm, specific, brand-true sentences.

## Do not

- Use the wrong logo or unrelated monogram marks.
- Move the Henna petals from the top-right of "Henna."
- Make the site look like a generic snack store.
- Lose the elegant, premium, joyful, warm, food-focused feel.
- Use em dashes or en dashes anywhere in visible copy.
- Leave any AI-generated tells, disclaimers, or generic template feel.
