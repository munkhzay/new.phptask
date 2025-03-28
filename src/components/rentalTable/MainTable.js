'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuthContext } from '@/providers/authProvider'
import { TablePagination } from './TablePagination'
import { TableHead } from './TableHead'
import { TableDemo } from './TableRow'

export const RentalTable = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const { currentUser } = useAuthContext()
  const [rentals, setRentals] = useState()
  const [search, setSearch] = useState('')
  const [_all, setAll] = useState()

  const allData = async () => {
    try {
      const rental = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/get/rentals.php?owner_id=${currentUser?.id}`,
        { headers: { 'Content-Type': 'application/json' } },
      )
      setRentals(rental?.data?.rentals)
      setAll(rentals)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    allData()
  }, [])

  const allRental = async () => {
    try {
      const rental = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/get/searchRental.php?value=${search}&owner_id=${currentUser?.id}`,
        { headers: { 'Content-Type': 'application/json' } },
      )
      setRentals(rental?.data?.rentals)
    } catch (error) {
      console.log(error)
    }
  }
  const itemsPerPage = 5
  const totalPages = Math.ceil(rentals?.length / itemsPerPage)
  const currentRentals = rentals?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )
  return (
    <div className="w-[768px] border rounded-lg">
      <TableHead refetch={allRental} setSearch={setSearch} />
      <TableDemo refetch={allRental} currentRentals={currentRentals} />
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}
