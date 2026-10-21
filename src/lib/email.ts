// Server-only email through Resend (https://resend.com).
// RESEND_API_KEY switches email on; TEAM_EMAIL is the inbox that receives order
// alerts, contact messages and newsletter sign-ups (comma-separate several).

const RESEND_API = 'https://api.resend.com'

export const escapeHtml = (s: string) => s.replace(/[&<>"']/g, ch => `&#${ch.charCodeAt(0)};`)

export const validEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)

export function teamInbox(override?: string) {
  const list = (override || process.env.TEAM_EMAIL || '').split(',').map(s => s.trim()).filter(Boolean)
  return process.env.RESEND_API_KEY && list.length ? list : null
}

async function resend(path: string, body: unknown) {
  const res = await fetch(`${RESEND_API}${path}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) console.error('Resend failed', path, res.status, await res.text().catch(() => ''))
  return res.ok
}

export function sendEmail(msg: { to: string[]; subject: string; html: string; replyTo?: string }) {
  return resend('/emails', {
    from: process.env.RESEND_FROM || 'Henna Foods <onboarding@resend.dev>',
    to: msg.to,
    reply_to: msg.replyTo,
    subject: msg.subject,
    html: msg.html,
  })
}

// Adds a newsletter subscriber to the Resend audience in RESEND_AUDIENCE_ID
export function addSubscriber(email: string) {
  const audience = process.env.RESEND_AUDIENCE_ID
  if (!process.env.RESEND_API_KEY || !audience) return Promise.resolve(false)
  return resend(`/audiences/${encodeURIComponent(audience)}/contacts`, { email, unsubscribed: false })
}

// A simple two-column table of label/value rows, skipping empty values
export function detailsTable(rows: [string, string][]) {
  return `<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;color:#3B1F10">${rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="vertical-align:top;color:#8A4B1F"><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v).replace(/\n/g, '<br>')}</td></tr>`
    )
    .join('')}</table>`
}
