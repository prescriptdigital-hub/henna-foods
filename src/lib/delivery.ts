// Built-in delivery areas and fees (naira). The admin dashboard can replace
// these; checkout and the payment API always read the saved list, so the fee
// a customer sees is the fee they are charged.
// null means the area is quoted on request.

export type DeliveryFee = { name: string; fee: number | null }
export type DeliveryArea = DeliveryFee & { id: string }

const AREAS: [string, number | null][] = [
  ['Abulado', 5500],
  ['Abule Egba', 3000],
  ['Agbara', 13000],
  ['Agege', 2500],
  ['Agungi', 4000],
  ['Ajah', 5000],
  ['Ajao Estate', 3000],
  ['Ajuwon', 3200],
  ['Akowonjo', 3200],
  ['Akute', 3200],
  ['Alaba', 8000],
  ['Alagbado', 5500],
  ['Alagbole', 2500],
  ['Alakuko', 5500],
  ['Alausa', 2000],
  ['Amuwo Odofin', 5000],
  ['Anthony', 2500],
  ['Apapa', 7000],
  ['Arepo Bus Stop', 1500],
  ['Awoyaya', 5000],
  ['Ayobo', 3500],
  ['Banana Island', 3500],
  ['Bariga', 3000],
  ['Cele', 3000],
  ['Chevron', 4000],
  ['Costain', 3000],
  ['Dopemu', 2500],
  ['Ebute Metta', 2000],
  ['Egbeda', 3200],
  ['Ejigbo', 4500],
  ['Festac', 5500],
  ['Gbagada', 2500],
  ['Giwa Oke Aro', 5500],
  ['Ibafo', 2500],
  ['Idimu', 3500],
  ['Igamu', 3200],
  ['Igando', 3500],
  ['Ijegun', 3500],
  ['Ijora', 3200],
  ['Ikate', 4000],
  ['Ikeja', 2000],
  ['Ikorodu', null],
  ['Ikota', 4000],
  ['Ikotun', 3500],
  ['Ikoyi', 3500],
  ['Ile Ipo', 3500],
  ['Ipaja', 3200],
  ['Isolo', 3000],
  ['Iju', 3200],
  ['Iyana Iba', 4500],
  ['Iyana Oworo', 2500],
  ['Ketu Alapere', 2200],
  ['Lagos Island', 3500],
  ['Lambe', 5500],
  ['LASU', 4500],
  ['Lawanson', 3200],
  ['Lekki Phase 1', 3500],
  ['Magboro', 3000],
  ['Magodo Isheri', 1200],
  ['Magodo Phase 2', 1200],
  ['Marina', 3500],
  ['Maryland', 2500],
  ['Matogun', 6500],
  ['Meiran', 3500],
  ['Mile 12', 3000],
  ['Mowe', 3000],
  ['Mushin', 3200],
  ['Obanikoro', 2500],
  ['Ogba', 2000],
  ['Ogudu', 2200],
  ['Ojo', null],
  ['Ojodu Berger', 1200],
  ['Ojota', 2200],
  ['Ojuelegba', 3200],
  ['Okokomaiko', 4500],
  ['Olowora', 1000],
  ['Omole Phase 1 & 2', 1000],
  ['Oniru', 3500],
  ['Orchid', 4000],
  ['Orile', 3200],
  ['Osapa London', 4000],
  ['Oshodi', 4000],
  ['Owode', 3300],
  ['Palmgrove', 2500],
  ['Sangotedo', 5000],
  ['Satellite Town', 5500],
  ['Shangisha', 1200],
  ['Shibiri', 7000],
  ['Shomolu', 2500],
  ['Surulere', 3000],
  ['VGC', 4500],
  ['Victoria Island', 3500],
  ['Yaba', 2500],
]

export const DEFAULT_DELIVERY: DeliveryFee[] = AREAS.map(([name, fee]) => ({ name, fee }))

export const areaId = (s: string) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export function toDeliveryAreas(list: DeliveryFee[]): DeliveryArea[] {
  return list.map(a => ({ ...a, id: areaId(a.name) })).sort((a, b) => a.name.localeCompare(b.name))
}

export const DELIVERY_COUNTRY = 'Nigeria'
export const NOT_LISTED = 'not-listed'

export function findArea(areas: DeliveryArea[], id: unknown): DeliveryArea | undefined {
  return typeof id === 'string' ? areas.find(a => a.id === id) : undefined
}

export function lowestFee(areas: DeliveryArea[]) {
  const fees = areas.flatMap(a => (a.fee === null ? [] : [a.fee]))
  return fees.length ? Math.min(...fees) : null
}
