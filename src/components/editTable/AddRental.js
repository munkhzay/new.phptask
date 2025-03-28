'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { CirclePlus } from 'lucide-react'
import axios from 'axios'
import { useAuthContext } from '@/providers/authProvider'
import { useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { SelectDemo } from '../microComponents/SelectMood'
import { SelectCategory } from '../microComponents/SelectCategory'

export function AddNew({ refetch }) {
  const [email, setEmail] = useState('')
  const [rentalDay, setRentalDay] = useState('')
  const [rent, setRent] = useState()
  const [paymentType, setPaymentType] = useState('')
  const [_icon, setIcon] = useState()
  const { currentUser } = useAuthContext()
  const [categoryname, setCategoryName] = useState('')

  const createCustomer = async () => {
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/post/new.rental.php`,
        {
          owner_id: currentUser?.id,
          owner_email: email,
          rental_date: rentalDay,
          rent: rent,
          mode: paymentType,
          category_name: categoryname,
        },
        { headers: { 'Content-Type': 'application/json' } },
      )
      .then(function (response) {
        console.log(response)
        if (response?.data?.message === 'rentals added successful') {
          toast.success('Successful')
          setEmail('')
          setRentalDay('')
          setRent()
          setPaymentType('ACTIVE')
          refetch()
        } else {
          toast.warning('Something went wrong')
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={
            'bg-blue-600 py-2 ml-4 rounded-sm border-none hover:bg-white hover:text-black text-white'
          }
          variant="outline"
        >
          <div className="flex flex-row gap-2 px-5">
            <CirclePlus />
            <div>Add new</div>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New rental</DialogTitle>
          <p id="dialog-description" className="text-sm text-gray-500">
            Enter your rental information.
          </p>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Email
            </Label>
            <Input
              onChange={(event) => setEmail(event.target.value)}
              id="name"
              placeholder="example@gmail.com"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-left">
              Category
            </Label>
            <SelectCategory
              setCategoryName={setCategoryName}
              onValueChange={setIcon}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Rental Date
            </Label>
            <Input
              onChange={(event) => setRentalDay(event.target.value)}
              id="username"
              placeholder={'2020-02-02'}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Rent $$
            </Label>
            <Input
              onChange={(event) => setRent(event.target.value)}
              id="username"
              type={'number'}
              placeholder={'00.0$'}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-left">
              Status
            </Label>
            <SelectDemo onValueChange={setPaymentType} />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <div>
              <Button
                as="span"
                className={'bg-blue-600 hover:bg-green-500'}
                disabled={!email || !rentalDay || !rent || !paymentType}
                onClick={createCustomer}
              >
                Save{' '}
              </Button>{' '}
            </div>
          </DialogClose>{' '}
        </DialogFooter>
      </DialogContent>
      <ToastContainer />
    </Dialog>
  )
}
