// Public business contact details used across the site.

export const CONTACT = {
  // Business WhatsApp in international format, digits only, e.g. '2348012345678'.
  // Leave empty to hide the chat box (preview it with ?chat=preview).
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, '') || '',
  replyTime: 'We usually reply within an hour',
}
