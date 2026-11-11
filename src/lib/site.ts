// Public business contact details used across the site.

export const CONTACT = {
  // Business WhatsApp in international format, digits only, e.g. '2348012345678'.
  // Leave empty to hide the chat box (preview it with ?chat=preview).
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '') || '',
  // Customer care line shown on the contact page
  phone: '0802 248 0753',
  phoneLink: 'tel:+2348022480753',
  replyTime: 'We usually reply within an hour',
  email: 'hello@hennafoods.com',
  location: 'Lagos, Nigeria',
}

// Social profile links. Icons only show in the footer once a link is filled in.
export const SOCIAL = {
  instagram: 'https://www.instagram.com/hennafoods_/',
  facebook: '',
  x: '',
}

// Star ratings shown on product cards and pages. Add real figures as reviews come
// in, e.g. { rating: 4.9, count: 37 }. Left as null, no stars are shown.
// Keyed by product web address (slug)
export const REVIEWS: Record<string, { rating: number; count: number } | null> = {
  cookies: null,
  chinchin: null,
}

// Switch whole site features on or off.
export const FEATURES = {
  // Wholesale page, quote form and links. Off for now; set to true to bring it back.
  wholesale: false,
}
