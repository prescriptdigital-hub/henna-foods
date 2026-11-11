// The built-in shop: used until the admin dashboard saves its first change,
// and whenever the database cannot be reached.

import type { StoreData } from './catalog'
import { DEFAULT_DELIVERY } from './delivery'

export const DEFAULT_STORE: StoreData = {
  updatedAt: null,
  delivery: DEFAULT_DELIVERY,
  products: [
    {
      slug: 'cookies',
      name: "Bukkie's Premium Cookies",
      shortName: "Bukkie's Cookies",
      tagline: 'Rich. Buttery. Unforgettable.',
      summary: 'Golden-baked butter cookies, crafted with premium ingredients for a warm, joyful treat. Perfect for gifting and sharing.',
      description:
        'Golden-baked butter cookies, crafted with premium ingredients for a warm, joyful treat. Perfect for gifting, sharing, or those quiet moments when you deserve something beautiful.',
      theme: 'cookies',
      badge: 'Best Seller',
      cardImage: '/images/products/cookies-label.jpg',
      images: [
        { src: '/images/products/cookies-jar.jpg', alt: "A jar of Bukkie's cookies tied with gold ribbon" },
        { src: '/images/products/cookies-closeup.jpg', alt: "Golden Bukkie's butter cookies, one broken open" },
        { src: '/images/products/cookies-pyramid.jpg', alt: "Three jars of Bukkie's cookies stacked in a pyramid" },
        { src: '/images/products/cookies-multipack-burgundy.jpg', alt: "A Bukkie's gift multipack on burgundy stone" },
      ],
      sizes: [
        { sku: 'bukkies-cookies-900g', label: '900g', price: 12500, available: true },
        { sku: 'bukkies-cookies-600g', label: '600g', price: 8500, available: true },
      ],
      benefits: [
        'Made with fine, natural ingredients',
        'Rich butter goodness in every bite',
        'Baked to golden, warm perfection',
        'Perfect for gifting and sharing',
      ],
      ingredients:
        'Premium butter, fine wheat flour, free-range eggs, cane sugar, vanilla extract, baking powder, sea salt. Made in a facility that handles nuts and dairy.',
      visible: true,
    },
    {
      slug: 'chinchin',
      name: 'Richie Premium Chinchin',
      shortName: 'Richie Chinchin',
      tagline: 'Crunchy. Joyful. Delicious.',
      summary: 'A golden crunchy snack made for sharing, celebration, and everyday enjoyment. Joy in every single bite.',
      description:
        'A golden crunchy snack made for sharing, celebration, and everyday enjoyment. Richie Chinchin brings that joyful, festive energy to any moment, whether it is a quiet evening or a celebration with friends.',
      theme: 'chinchin',
      badge: 'New',
      cardImage: '/images/products/chinchin-label.jpg',
      images: [
        { src: '/images/products/chinchin-jar.jpg', alt: 'A jar of Richie chinchin tied with gold ribbon' },
        { src: '/images/products/chinchin-bowl.jpg', alt: 'Golden Richie chinchin in an ivory bowl' },
        { src: '/images/products/chinchin-jar-plum.jpg', alt: 'A Richie jar on a plum backdrop with chinchin scattered around it' },
        { src: '/images/products/chinchin-pyramid.jpg', alt: 'Three jars of Richie chinchin stacked in a pyramid' },
      ],
      sizes: [
        { sku: 'richie-chinchin-750g', label: '750g', price: 8500, available: true },
        { sku: 'richie-chinchin-500g', label: '500g', price: 6200, available: true },
      ],
      benefits: [
        'Perfect crunchy texture every time',
        'Joyful snack for every moment',
        'Great for gifting and parties',
        'Made with care by Henna Foods',
      ],
      ingredients:
        'Premium wheat flour, vegetable oil, sugar, eggs, milk, natural flavourings, baking powder, sea salt. Crunchy, golden, and made with care. Free from artificial preservatives.',
      visible: true,
    },
  ],
}
