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
  img('duo-warm', 1536, 1024, 'together', 'Better when shared.', "A jar of Bukkie's cookies beside a jar of Richie chinchin, with cookies and chinchin on the table"),
  img('cookies-closeup', 1254, 1254, 'cookies', 'Rich. Buttery. Unforgettable.', "Golden Bukkie's butter cookies on a plate, one broken open"),
  img('chinchin-bowl', 1254, 1254, 'chinchin', 'A golden crunch of joy.', 'Golden Richie chinchin in an ivory bowl'),
  img('gift-tray', 1536, 1024, 'together', 'Gifts for every guest.', "Hands holding a tray with a jar of Bukkie's cookies and a jar of Richie chinchin"),
  img('cookies-jar', 1400, 1400, 'cookies', 'Tied in gold, made to be given.', "A jar of Bukkie's cookies tied with gold ribbon"),
  img('chinchin-jar-plum', 1536, 1024, 'chinchin', 'Every bite, a little celebration.', 'A Richie chinchin jar on a plum backdrop with chinchin scattered around it'),
  img('multipacks-burgundy', 1536, 1024, 'together', 'Two favourites, one table.', "A Richie multipack with a Bukkie's multipack leaning on it against deep red"),
  img('cookies-pyramid', 1122, 1402, 'cookies', 'Freshly baked happiness.', "Three jars of Bukkie's cookies stacked in a pyramid"),
  img('chinchin-cookies-closeup', 1536, 1024, 'together', 'Elegance and joy in every bite.', "A Richie chinchin jar in front of a Bukkie's cookies jar"),
  img('chinchin-jar-bowl', 1254, 1254, 'chinchin', 'Crunchy. Joyful. Delicious.', 'A Richie chinchin jar beside a bowl of chinchin in warm light'),
  img('cookies-multipack-burgundy', 1536, 1024, 'cookies', 'A box of beautiful moments.', "A green-lid Bukkie's multipack on burgundy stone"),
  img('duo-plinth', 1254, 1254, 'together', 'From our kitchen to the world.', "Bukkie's and Richie jars on a stone plinth"),
  img('chinchin-pyramid', 1122, 1402, 'chinchin', 'Stacked high for celebrations.', 'Three jars of Richie chinchin stacked in a pyramid'),
  img('multipacks-sunlit', 1536, 1024, 'together', 'Made with love, packed with care.', "A Bukkie's multipack with a Richie multipack resting on it in a sunlit room"),
  img('cookies-multipack', 1536, 1024, 'cookies', 'Sealed fresh for sharing.', "A wrapped multipack of Bukkie's cookies with red, yellow and blue lids"),
  img('chinchin-multipack-plum', 1536, 1024, 'chinchin', 'Colour, crunch and cheer.', 'A Richie chinchin multipack on a plum backdrop'),
  img('duo-pyramid', 1122, 1402, 'together', 'Crowned with cookies.', "A Bukkie's jar resting on two jars of Richie chinchin"),
  img('multipacks-plinth', 1122, 1402, 'together', 'Bulk joy for big days.', "A Richie multipack stacked on a Bukkie's multipack"),
  img('chinchin-jar', 1254, 1254, 'chinchin', 'Golden, wrapped and ready.', 'A jar of Richie chinchin tied with gold ribbon'),
  img('cookies-trio', 1536, 1024, 'cookies', 'Three jars, one lovely gift.', "Three green-lid jars of Bukkie's cookies wrapped together"),
  img('chinchin-multipacks', 1536, 1024, 'chinchin', 'Plenty to go around.', 'Several multipacks of Richie chinchin'),
  img('multipacks-plum', 1536, 1024, 'together', 'Something for everyone.', "A Bukkie's multipack with a Richie multipack leaning on it against plum"),
  img('chinchin-trio', 1536, 1024, 'chinchin', 'Ready for the party.', 'Three Richie chinchin jars wrapped together'),
  img('multipacks-stacked', 1536, 1024, 'together', 'The Henna collection.', "Richie multipacks stacked on Bukkie's multipacks"),
  img('chinchin-multipack-wrapped', 1536, 1024, 'chinchin', 'Golden crunch, ready to give.', 'A wrapped multipack of Richie chinchin'),
]

export const GALLERY_TAGS: { tag: GalleryTag | 'all'; label: string }[] = [
  { tag: 'all', label: 'All' },
  { tag: 'cookies', label: "Bukkie's Cookies" },
  { tag: 'chinchin', label: 'Richie Chinchin' },
  { tag: 'together', label: 'Together' },
]
