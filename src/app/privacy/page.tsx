import type { Metadata } from 'next'
import LegalPage from '@/components/LegalPage'
import { CONTACT } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Henna Foods collects, uses and protects your personal information.',
}

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Your Information"
      title="Privacy Policy"
      intro="We only ask for what we need to bake, pack and deliver your order, and we look after it carefully. This page explains what we collect and what we do with it."
      updated="21 October 2026"
      sections={[
        {
          title: 'Who looks after your information',
          body: (
            <p>
              Henna Foods, based in {CONTACT.location}, is responsible for the personal information collected through
              hennafoods.com. We handle it in line with the Nigeria Data Protection Act 2023. For any privacy question,
              email <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
            </p>
          ),
        },
        {
          title: 'What we collect',
          body: (
            <ul>
              <li>
                <strong>When you order:</strong> your name, email, phone number, delivery area and address, and what you
                bought.
              </li>
              <li>
                <strong>When you pay:</strong> Paystack collects your card or bank details on its own secure page. We
                receive confirmation that you paid, never your card details.
              </li>
              <li>
                <strong>When you contact us:</strong> your name, email and message, or your WhatsApp number and messages
                if you chat with us there.
              </li>
              <li>
                <strong>When you join our newsletter:</strong> your email address.
              </li>
            </ul>
          ),
        },
        {
          title: 'How we use it',
          body: (
            <ul>
              <li>To take payment, prepare your order and deliver it to you.</li>
              <li>To contact you about your order or a delivery.</li>
              <li>To answer your questions and messages.</li>
              <li>To send our newsletter, only if you signed up for it.</li>
              <li>To keep the business and tax records the law asks us to keep.</li>
            </ul>
          ),
        },
        {
          title: 'Who we share it with',
          body: (
            <>
              <p>We never sell your information. We share only what each partner needs to do its job:</p>
              <ul>
                <li><strong>Paystack</strong>, to process your payment.</li>
                <li><strong>Our delivery riders</strong>, who receive your name, phone number and address.</li>
                <li><strong>Vercel</strong>, which hosts this website.</li>
                <li><strong>Resend</strong>, which sends our order and newsletter emails.</li>
                <li><strong>WhatsApp</strong>, if you choose to message us there.</li>
              </ul>
              <p>
                Some of these services store information on servers outside Nigeria. We use providers that protect it
                with appropriate safeguards.
              </p>
            </>
          ),
        },
        {
          title: 'What your browser keeps',
          body: (
            <p>
              This website saves your basket and your chosen currency in your own browser so they are still there when
              you come back. This stays on your device and you can clear it at any time in your browser settings. We do
              not use advertising trackers.
            </p>
          ),
        },
        {
          title: 'How long we keep it',
          body: (
            <p>
              We keep order records for as long as the law requires for business and tax purposes, and messages for as
              long as we need them to help you. Your newsletter email stays on our list until you unsubscribe.
            </p>
          ),
        },
        {
          title: 'Your rights',
          body: (
            <>
              <p>
                You can ask us for a copy of the information we hold about you, ask us to correct or delete it, object
                to how we use it, or unsubscribe from our newsletter at any time. Email{' '}
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> and we will reply within 30 days.
              </p>
              <p>
                If you are unhappy with how we have handled your information, you can also complain to the Nigeria Data
                Protection Commission.
              </p>
            </>
          ),
        },
        {
          title: 'Changes to this policy',
          body: (
            <p>
              If we change how we use your information, we will update this page and the date at the top.
            </p>
          ),
        },
      ]}
    />
  )
}
