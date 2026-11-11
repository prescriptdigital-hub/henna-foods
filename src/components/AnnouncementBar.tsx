import { formatMoney } from '@/lib/catalog'
import { lowestFee, toDeliveryAreas, type DeliveryFee } from '@/lib/delivery'

export default function AnnouncementBar({ areas }: { areas: DeliveryFee[] }) {
  const from = lowestFee(toDeliveryAreas(areas))
  return (
    <div
      className="w-full py-2.5 text-center font-body text-xs font-semibold tracking-wider"
      style={{ backgroundColor: '#D6A62F', color: '#3B1F10' }}
    >
      <span>{from === null ? 'Delivery across Lagos' : `Delivery across Lagos from ${formatMoney(from, 'NGN')}`}</span>
      <span className="mx-3 opacity-50">|</span>
      <span>Freshly made with love, every single batch</span>
    </div>
  )
}
