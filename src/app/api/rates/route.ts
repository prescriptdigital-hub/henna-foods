import { NextResponse } from 'next/server'

// Live naira exchange rates from ExchangeRate-API's open endpoint (free, no key,
// updated daily; attribution required, shown in the site footer).
// Cached on the server and refreshed every 6 hours.
export const revalidate = 21600

const SOURCE = 'https://open.er-api.com/v6/latest/NGN'

type ApiResponse = {
  result: string
  time_last_update_utc: string
  rates: Record<string, number>
}

export async function GET() {
  try {
    const res = await fetch(SOURCE, { next: { revalidate } })
    const data = (await res.json()) as ApiResponse
    const { GBP, USD } = data.rates ?? {}
    if (data.result !== 'success' || !(GBP > 0) || !(USD > 0)) throw new Error('Unexpected rates response')
    return NextResponse.json({
      // How much 1 naira is worth in each currency
      rates: { NGN: 1, GBP, USD },
      updated: data.time_last_update_utc,
    })
  } catch (err) {
    console.error('Exchange rates unavailable', err)
    return NextResponse.json({ error: 'Exchange rates unavailable' }, { status: 503 })
  }
}
