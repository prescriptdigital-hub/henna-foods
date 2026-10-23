// Every product photo on the site, in showcase order.
// To add a photo: export it to public/images/products and add a line here.

export type GalleryTag = 'cookies' | 'chinchin' | 'together'

export type GalleryImage = {
  src: string
  width: number
  height: number
  alt: string
  caption: string
  tag: GalleryTag
}

const img = (name: string, width: number, height: number, tag: GalleryTag, caption: string, alt: string): GalleryImage => ({
  src: `/images/products/${name}.jpg`,
  width,
  height,
  tag,
  caption,
  alt,
})

export const GALLERY: GalleryImage[] = [
  img('cookies-pyramid', 1122, 1402, 'cookies', 'Freshly baked happiness.', "Three jars of Bukkie's cookies stacked in a pyramid"),
  img('duo-plinth', 1254, 1254, 'together', 'From our kitchen to the world.', "Bukkie's and Richie jars on a stone plinth"),
  img('chinchin-pyramid', 1122, 1402, 'chinchin', 'Stacked high for celebrations.', 'Three jars of Richie chinchin stacked in a pyramid'),
  img('duo-pyramid', 1122, 1402, 'together', 'Crowned with cookies.', "A Bukkie's jar resting on two jars of Richie chinchin"),
  img('chinchin-multipacks', 1536, 1024, 'chinchin', 'Plenty to go around.', 'Several multipacks of Richie chinchin'),
]

export const GALLERY_TAGS: { tag: GalleryTag | 'all'; label: string }[] = [
  { tag: 'all', label: 'All' },
  { tag: 'cookies', label: "Bukkie's Cookies" },
  { tag: 'chinchin', label: 'Richie Chinchin' },
  { tag: 'together', label: 'Together' },
]
