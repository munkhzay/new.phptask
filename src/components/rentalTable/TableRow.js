'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { EditTable } from '../editTable/EditTable'
import { DeleteDialog } from '../editTable/DeleteDialog'

export function TableDemo({ currentRentals, refetch }) {
  const [rentalId, setRentalId] = useState()
  const [email, setEmail] = useState('')
  const [rentalDay, setRentalDay] = useState('')
  const [rent, setRent] = useState()
  const [paymentType, setPaymentType] = useState('')
  const [_icon, setIcon] = useState()
  const [categoryName, setCategoryName] = useState()

  const updateRental = async () => {
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/update/edit.rental.php`,
        {
          rental_date: rentalDay,
          owner_email: email,
          rent: rent,
          mode: paymentType,
          id: rentalId,
          category_name: categoryName,
        },
        { headers: { 'Content-Type': 'application/json' } },
      )
      .then(function (response) {
        if (response?.data?.message === 'rental updated successful') {
          refetch()
          setEmail('')
          setRent(),
            setRentalDay(''),
            setPaymentType(''),
            setIcon(''),
            setCategoryName('')
        } else {
          toast.warning('Something went wrong')
        }
      })
      .catch(function (error) {
        console.error(error)
      })
  }

  const deleteRental = async () => {
    try {
      const res = await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/delete/delete.rental.php`,
        { data: { rental_id: rentalId } },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      if (res.data.message === 'deleted successful') {
        toast.success('Successful')
        refetch()
      } else {
        toast.warning('Something went wrong')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Table className={'p-10'}>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Rental Product</TableHead>
          <TableHead>Rental Date</TableHead>
          <TableHead className="text-right">Rent $</TableHead>
          <TableHead className="text-right">Status</TableHead>
          <TableHead className="text-right">Date</TableHead>
          <TableHead className="w-[100px] text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {currentRentals?.map((rental, index) => (
          <TableRow key={index}>
            <TableCell>{rental.owner_email}</TableCell>
            <TableCell>{rental.category_name}</TableCell>
            <TableCell>
              {rental.rental_date
                ? new Date(rental.rental_date).toISOString().split('T')[0]
                : ''}
            </TableCell>
            <TableCell className="text-right">{rental.rent}</TableCell>
            <TableCell className={'text-right'}>{rental.mode}</TableCell>
            <TableCell className="text-right">
              {rental.reg_date
                ? new Date(rental.reg_date).toISOString().split('T')[0]
                : ''}
            </TableCell>
            <TableCell
              onClick={() => setRentalId(rental.id)}
              className={'flex flex-row justify-evenly items-center'}
            >
              <EditTable
                rental={rental}
                setCategoryName={setCategoryName}
                setPaymentType={setPaymentType}
                setRent={setRent}
                setRentalDay={setRentalDay}
                setEmail={setEmail}
                updateRental={updateRental}
                setIcon={setIcon}
              />
              <DeleteDialog onClick={deleteRental} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        {/* <TableRow>
          <TableCell colSpan={2}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow> */}
      </TableFooter>
    </Table>
  )
}
