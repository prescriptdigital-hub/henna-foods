import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { isAdmin, sameOrigin } from '@/lib/admin-auth'
import { getStore, saveStore, storageConnected, validateStore } from '@/lib/catalog-store'

export const dynamic = 'force-dynamic'

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: 'Please log in again.' }, { status: 401 })
  return NextResponse.json({ data: await getStore() })
}

export async function PUT(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: 'Not allowed.' }, { status: 403 })
  if (!(await isAdmin())) return NextResponse.json({ error: 'Your login has expired. Please log in again.' }, { status: 401 })
  if (!storageConnected()) {
    return NextResponse.json({ error: 'No database is connected yet, so changes cannot be saved.' }, { status: 503 })
  }

  const checked = validateStore(await req.json().catch(() => null))
  if ('error' in checked) return NextResponse.json({ error: checked.error }, { status: 400 })

  try {
    await saveStore(checked.data)
  } catch (err) {
    console.error('Saving the shop failed', err)
    return NextResponse.json({ error: 'The changes could not be saved. Please try again.' }, { status: 502 })
  }
  // Every page shows prices or delivery fees, so refresh them all
  revalidatePath('/', 'layout')
  return NextResponse.json({ data: await getStore() })
}
