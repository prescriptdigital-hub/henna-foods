import { formatMoney } from '@/lib/catalog'
import { LOWEST_DELIVERY_FEE } from '@/lib/delivery'

export default function AnnouncementBar() {
  return (
    <div
      className="w-full py-2.5 text-center font-body text-xs font-semibold tracking-wider"
      style={{ backgroundColor: '#D6A62F', color: '#3B1F10' }}
    >
      <span>Delivery across Lagos from {formatMoney(LOWEST_DELIVERY_FEE, 'NGN')}</span>
      <span className="mx-3 opacity-50">|</span>
      <span>Freshly made with love, every single batch</span>
    </div>
  )
}
