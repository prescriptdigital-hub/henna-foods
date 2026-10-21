import type { Metadata } from 'next'
import Link from 'next/link'
import LegalPage from '@/components/LegalPage'
import { BULK_TIERS } from '@/lib/catalog'
import { CONTACT } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Terms of Sale',
  description: "The terms that apply when you order Bukkie's Premium Cookies or Richie Premium Chinchin from Henna Foods.",
}

const bulk = BULK_TIERS[0]

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="The Small Print"
      title="Terms of Sale"
      intro="These terms explain how ordering from hennafoods.com works. We have kept them as plain as we can. By placing an order you agree to them."
      updated="21 October 2026"
      sections={[
        {
          title: 'Who we are',
          body: (
            <p>
              Henna Foods makes Bukkie&apos;s Premium Cookies and Richie Premium Chinchin and sells them on this website.
              We are based in {CONTACT.location}. You can reach us at{' '}
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or through our{' '}
              <Link href="/contact">contact page</Link>.
            </p>
          ),
        },
        {
          title: 'Your order',
          body: (
            <p>
              Your order is confirmed once your payment succeeds and you see our thank you page. We may decline or
              cancel an order, for example if we cannot deliver to your address or a price was shown in error. If that
              happens we tell you and refund you in full.
            </p>
          ),
        },
        {
          title: 'Prices and payment',
          body: (
            <ul>
              <li>Our prices are set in naira (₦) and every order is paid in naira.</li>
              <li>
                Prices shown in pounds (£) or dollars ($) are a guide, converted at the day&apos;s exchange rate. Your
                bank may use a different rate if your card is not in naira.
              </li>
              <li>
                When you buy {bulk.minJars} jars or more in one order, {bulk.discount * 100}% comes off the price of
                the jars automatically. It does not apply to the delivery fee.
              </li>
              <li>Payments are handled securely by Paystack. Your card details go straight to Paystack and never reach us.</li>
            </ul>
          ),
        },
        {
          title: 'Delivery',
          body: (
            <>
              <p>
                We deliver across Lagos. The fee depends on your area and is shown before you pay. You can see every
                area and fee on our <Link href="/contact#shipping">delivery page</Link>. For an area that is not listed,
                or outside Lagos, contact us for a quote first.
              </p>
              <p>
                Orders usually arrive within 2 to 3 business days. Please give a phone number our rider can reach and
                make sure someone can receive the order. Delivery times are our best estimate rather than a guarantee.
              </p>
            </>
          ),
        },
        {
          title: 'Ingredients and allergies',
          body: (
            <p>
              The ingredients for each treat are listed on its product page and on the jar label. Our treats are made
              with wheat flour, eggs and dairy. If you have a food allergy, please read the label carefully and contact
              us before ordering if you have any questions. Once opened, keep jars tightly closed in a cool, dry place
              and enjoy by the date on the label.
            </p>
          ),
        },
        {
          title: 'Refunds and returns',
          body: (
            <p>
              If anything arrives damaged, spoiled or not as ordered, we will replace it or refund you. Our{' '}
              <Link href="/refunds">Refunds and Returns policy</Link> explains how.
            </p>
          ),
        },
        {
          title: 'Our responsibility to you',
          body: (
            <p>
              We are responsible for loss or damage you suffer that is a foreseeable result of us breaking these terms
              or not taking reasonable care. We are not responsible for loss that was not foreseeable, or for business
              losses if you buy for resale. Nothing in these terms limits your rights under Nigerian consumer law,
              including the Federal Competition and Consumer Protection Act 2018, or our liability where the law does
              not allow it to be limited.
            </p>
          ),
        },
        {
          title: 'Changes and governing law',
          body: (
            <p>
              We may update these terms from time to time. The version on this page when you place your order is the
              one that applies to it. These terms are governed by the laws of the Federal Republic of Nigeria, and the
              courts of Lagos State can hear any dispute.
            </p>
          ),
        },
      ]}
    />
  )
}
