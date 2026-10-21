import Link from 'next/link'
import { CONTACT } from '@/lib/site'

export type LegalSection = { title: string; body: React.ReactNode }

// Shared layout for the terms, privacy and refunds pages
export default function LegalPage({
  eyebrow,
  title,
  intro,
  updated,
  sections,
}: {
  eyebrow: string
  title: string
  intro: string
  updated: string
  sections: LegalSection[]
}) {
  return (
    <>
      <section className="py-20 bg-ivory border-b border-gold/20">
        <div className="container-henna max-w-3xl">
          <span className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-gold block mb-3">{eyebrow}</span>
          <h1 className="font-heading text-4xl lg:text-5xl font-semibold text-chocolate mb-5">{title}</h1>
          <p className="font-body text-base lg:text-lg text-chocolate/65 leading-relaxed">{intro}</p>
          <p className="font-body text-xs text-chocolate/45 mt-6">Last updated {updated}</p>
        </div>
      </section>

      <section className="section-padding bg-cream">
        <div className="container-henna max-w-3xl">
          <nav aria-label="On this page" className="mb-12 rounded-2xl border border-gold/25 bg-ivory p-6">
            <p className="font-body text-xs font-semibold uppercase tracking-wide text-chocolate/50 mb-3">On this page</p>
            <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-2 font-body text-sm">
              {sections.map((s, i) => (
                <li key={s.title}>
                  <a href={`#s${i + 1}`} className="text-chocolate/75 hover:text-chocolate underline-offset-2 hover:underline">
                    <span className="text-gold mr-2">{i + 1}.</span>{s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-12">
            {sections.map((s, i) => (
              <article key={s.title} id={`s${i + 1}`} className="scroll-mt-28">
                <h2 className="font-heading text-2xl font-semibold text-chocolate mb-4">
                  <span className="text-gold mr-3">{i + 1}.</span>{s.title}
                </h2>
                <div className="legal-body font-body text-[15px] text-chocolate/75 leading-relaxed space-y-4">{s.body}</div>
              </article>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-gold/25 bg-ivory p-6 lg:p-8">
            <h2 className="font-heading text-xl font-semibold text-chocolate mb-2">Questions?</h2>
            <p className="font-body text-sm text-chocolate/65 leading-relaxed">
              We are happy to help. Email{' '}
              <a href={`mailto:${CONTACT.email}`} className="underline underline-offset-2 text-chocolate">{CONTACT.email}</a>{' '}
              or send us a note on our <Link href="/contact" className="underline underline-offset-2 text-chocolate">contact page</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
