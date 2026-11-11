import type { Metadata } from 'next'
import { adminConfigured, isAdmin } from '@/lib/admin-auth'
import { getStore, photoStorageConnected, storageConnected } from '@/lib/catalog-store'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

export const metadata: Metadata = {
  title: 'Dashboard',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  if (!(await isAdmin())) return <AdminLogin configured={adminConfigured()} />
  return (
    <AdminDashboard
      initial={await getStore()}
      databaseReady={storageConnected()}
      photosReady={photoStorageConnected()}
    />
  )
}
