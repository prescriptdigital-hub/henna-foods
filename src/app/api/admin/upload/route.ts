import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { randomBytes } from 'crypto'
import { isAdmin, sameOrigin } from '@/lib/admin-auth'
import { photoStorageConnected } from '@/lib/catalog-store'

const TYPES: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' }
const MAX_BYTES = 4 * 1024 * 1024


export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'Not allowed.' }, { status: 403 })
  if (!(await isAdmin())) return NextResponse.json({ error: 'Your login has expired. Please log in again.' }, { status: 401 })
  if (!photoStorageConnected()) {
    return NextResponse.json({ error: 'Photo storage is not connected yet, so photos cannot be uploaded.' }, { status: 503 })
  }

  const form = await req.formData().catch(() => null)
  const file = form?.get('file')
  if (!(file instanceof File)) return NextResponse.json({ error: 'Choose a photo to upload.' }, { status: 400 })
  const ext = TYPES[file.type]
  if (!ext) return NextResponse.json({ error: 'Photos must be JPG, PNG or WebP.' }, { status: 400 })
  if (file.size > MAX_BYTES) return NextResponse.json({ error: 'That photo is too large. Keep it under 4 MB.' }, { status: 400 })

  try {
    const blob = await put(`products/${Date.now().toString(36)}-${randomBytes(6).toString('hex')}.${ext}`, file, {
      access: 'public',
      contentType: file.type,
    })
    return NextResponse.json({ url: blob.url })
  } catch (err) {
    console.error('Photo upload failed', err)
    return NextResponse.json({ error: 'The photo could not be uploaded. Please try again.' }, { status: 502 })
  }
}
