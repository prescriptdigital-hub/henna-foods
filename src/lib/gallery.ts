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
  img('cookies-label', 1600, 1600, 'cookies', 'Tied in gold, made to be given.', "Close-up of a Bukkie's Premium Cookies jar with gold ribbon and red label"),
  img('chinchin-label', 1600, 1143, 'chinchin', 'A golden crunch of joy.', 'Close-up of a Richie Premium Chinchin jar with gold ribbon and label'),
  img('collection-stack', 1600, 1280, 'together', 'Two favourites, one table.', "Multipacks of Richie chinchin stacked on Bukkie's cookies"),
  img('cookies-trio', 1600, 1066, 'cookies', 'Rich. Buttery. Unforgettable.', "Three jars of Bukkie's cookies with red, yellow and blue lids"),
  img('chinchin-jar', 1600, 1280, 'chinchin', 'Crunchy. Joyful. Delicious.', 'A full jar of Richie chinchin with a blue lid'),
  img('duo', 1600, 1280, 'together', 'Better when shared.', "A jar of Bukkie's cookies beside a jar of Richie chinchin"),
  img('cookies-stack', 1280, 1600, 'cookies', 'Freshly baked happiness.', "Three jars of Bukkie's cookies stacked in a pyramid"),
  img('chinchin-trio', 1600, 1067, 'chinchin', 'Ready for the party.', 'Three jars of Richie chinchin wrapped together'),
  img('collection', 1600, 1066, 'together', 'Gifts for every guest.', "A multipack of Bukkie's cookies with a Richie multipack leaning on it"),
  img('chinchin-stack', 1066, 1600, 'chinchin', 'Stacked high for celebrations.', 'Three jars of Richie chinchin stacked in a pyramid'),
  img('cookies-multipack', 1600, 1067, 'cookies', 'A box of beautiful moments.', "Three jars of Bukkie's cookies with green lids"),
  img('duo-pyramid', 1066, 1600, 'together', 'Crowned with cookies.', "A Bukkie's jar resting on two jars of Richie chinchin"),
  img('chinchin-jar-tall', 1067, 1600, 'chinchin', 'Every bite, a little celebration.', 'A tall jar of Richie chinchin tied with gold ribbon'),
  img('multipacks-stacked', 1600, 1600, 'together', 'Made with love, packed with care.', "Richie and Bukkie's multipacks stacked on a wooden table"),
  img('cookies-multipack-wrapped', 1600, 1066, 'cookies', 'Sealed fresh for sharing.', "A wrapped multipack of Bukkie's cookies"),
  img('chinchin-multipacks', 1600, 1067, 'chinchin', 'Plenty to go around.', 'Several multipacks of Richie chinchin'),
  img('collection-lean', 1600, 1067, 'together', 'From our kitchen to the world.', "A Richie multipack beside a leaning pack of Bukkie's cookies"),
  img('chinchin-multipack', 1600, 1067, 'chinchin', 'Colour, crunch and cheer.', 'Richie chinchin jars with yellow, green and blue lids'),
  img('multipacks-tower', 1600, 1280, 'together', 'Bulk joy for big days.', "A tower of Richie and Bukkie's multipacks"),
  img('chinchin-multipack-wrapped', 1600, 900, 'chinchin', 'Golden, wrapped and ready.', 'A wrapped multipack of Richie chinchin'),
  img('multipacks-stacked-2', 1600, 1280, 'together', 'Something for everyone.', "Richie chinchin stacked on Bukkie's cookies, both wrapped"),
  img('collection-lean-2', 1600, 1066, 'together', 'Elegance and joy in every bite.', "A Bukkie's multipack with a Richie pack resting against it"),
  img('multipacks-side-by-side', 1600, 900, 'together', 'The Henna collection.', "Bukkie's and Richie multipacks side by side"),
]

export const GALLERY_TAGS: { tag: GalleryTag | 'all'; label: string }[] = [
  { tag: 'all', label: 'All' },
  { tag: 'cookies', label: "Bukkie's Cookies" },
  { tag: 'chinchin', label: 'Richie Chinchin' },
  { tag: 'together', label: 'Together' },
]
