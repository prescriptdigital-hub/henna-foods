import type { Metadata } from 'next'
import GalleryView from './GalleryView'

export const metadata: Metadata = {
  title: 'Gallery',
  description: "A closer look at Bukkie's Premium Cookies and Richie Premium Chinchin, tied in gold and made to be shared.",
}

export default function GalleryPage() {
  return (
    <section className="section-padding bg-ivory">
      <div className="container-henna">
        <div className="max-w-2xl mb-10">
          <span className="font-body text-xs font-semibold tracking-[0.2em] uppercase text-gold block mb-3">
            Gallery
          </span>
          <h1 className="font-heading text-4xl lg:text-6xl font-semibold text-chocolate leading-[1.08] mb-4">
            Look closer.
            <br />
            <span className="italic text-cookie-brown">Every jar is a gift.</span>
          </h1>
          <p className="font-body text-base lg:text-lg text-chocolate/65">
            Golden ribbon, generous jars and the treats inside. This is how Henna arrives at your table.
          </p>
        </div>

        <GalleryView />
      </div>
    </section>
  )
}
