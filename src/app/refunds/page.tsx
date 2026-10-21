import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPage from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Refunds and Returns',
  description: 'What happens if a Henna Foods order arrives damaged, incomplete or not as ordered, and how refunds are paid.',
}

export default function RefundsPage() {
  return (
    <LegalPage
      eyebrow="Customer Care"
      title="Refunds and Returns"
      intro="Every jar leaves our kitchen sealed, tied in gold and packed with care. If something is not right when it reaches you, we will put it right quickly."
      updated="21 October 2026"
      sections={[
        {
          title: 'Food we cannot take back',
          body: (
            <p>
              Because our cookies and chinchin are food, we cannot accept returns of jars that have been opened, or
              returns because you have changed your mind once an order has been delivered. This keeps every jar we send
              out safe and fresh for the next person.
            </p>
          ),
        },
        {
          title: 'Damaged, wrong or missing jars',
          body: (
            <>
              <p>If a jar arrives broken, unsealed, spoiled, or is not what you ordered, or a jar is missing:</p>
              <ul>
                <li>Tell us within <strong>48 hours of delivery</strong>.</li>
                <li>Send a photo of the jar and its label, plus your order reference (it starts with HF).</li>
                <li>Keep the jar until we have replied.</li>
              </ul>
              <p>
                We will then send a replacement at no extra cost or refund you in full for the affected jars, whichever
                you prefer. If the whole order is affected, we refund the delivery fee too.
              </p>
            </>
          ),
        },
        {
          title: 'Cancelling an order',
          body: (
            <>
              <p>
                You can cancel for a full refund at any time before your order leaves us. Once it is with our delivery
                rider it can no longer be cancelled.
              </p>
              <p>
                If we ever cannot fulfil your order, we will let you know straight away and refund everything you paid,
                including delivery.
              </p>
            </>
          ),
        },
        {
          title: 'If a delivery cannot be completed',
          body: (
            <p>
              Our rider will call the phone number on your order before arriving. If the address is incorrect or nobody
              can receive the order, we will arrange a new time with you, and a second delivery fee may apply. If you
              would rather cancel at that point, we refund the jars but not the delivery fee already used.
            </p>
          ),
        },
        {
          title: 'How refunds are paid',
          body: (
            <p>
              Refunds go back to the card or account you paid with, through Paystack. We start the refund within 2
              business days of agreeing it, and banks usually take 5 to 10 business days to show it on your statement.
            </p>
          ),
        },
        {
          title: 'Your rights',
          body: (
            <p>
              This policy is in addition to your rights under Nigerian consumer law, including the Federal Competition
              and Consumer Protection Act 2018, and does not reduce them. See our{' '}
              <Link href="/terms">Terms of Sale</Link> for the rest of how we sell.
            </p>
          ),
        },
      ]}
    />
  )
}
