'use client'

import { useEffect, useState } from 'react'
import { useAuthContext } from '@/providers/authProvider'
import { useRouter } from 'next/navigation'
import { UserInfo } from '@/components/ownerProfile/OwnerMenu'
import { RentalTable } from '@/components/rentalTable/MainTable'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/header'

export default function Home() {
  const [showRent, setShowRent] = useState(false)
  const { currentUser, loading } = useAuthContext()
  const [showCategory, setShowCategory] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!currentUser && loading) {
      router.push('/auth/signin')
    }
  }, [currentUser, loading])

  return (
    <div className="flex flex-col h-screen justify-between ">
      <Header />
      <div className="flex flex-row justify-between gap-15 w-fit mx-auto m-20">
        <UserInfo
          showCategory={showCategory}
          setShowCategory={setShowCategory}
          onClick={() => setShowRent(!showRent)}
        />
        <RentalTable />
      </div>
      <Footer />
    </div>
  )
}
