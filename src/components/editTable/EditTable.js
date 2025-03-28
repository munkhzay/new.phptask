'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Pencil } from 'lucide-react'
import { SelectDemo } from '../microComponents/SelectMood'
import { SelectCategory } from '../microComponents/SelectCategory'

export function EditTable(props) {
  const {
    rental,
    setEmail,
    setRent,
    setRentalDay,
    setPaymentType,
    updateRental,
    setIcon,
    setCategoryName,
  } = props

  return (
    <Sheet className={'p-4'}>
      <SheetTrigger asChild>
        <div className={'p-2'} variant="outline">
          <Pencil className="w-5 h-5" />
        </div>
      </SheetTrigger>
      <SheetContent className={'p-8'}>
        <SheetHeader>
          <SheetTitle className={'text-xl'}>Rental Update</SheetTitle>
        </SheetHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Email
            </Label>
            <Input
              placeholder={`${rental?.owner_email}`}
              onChange={(event) => setEmail(event.target.value)}
              id="name"
              className="w-[180px]"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-left">
              Rental Date
            </Label>
            <Input
              onChange={(event) => setRentalDay(event.target.value)}
              id="username"
              className="w-[180px]"
              placeholder={`${rental?.rental_date}`}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Rent $
            </Label>
            <Input
              placeholder={`${rental?.rent}`}
              type={'number'}
              onChange={(event) => setRent(event.target.value)}
              id="name"
              className="w-[180px]"
            />
          </div>{' '}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Category
            </Label>
            <SelectCategory
              rental={rental}
              setCategoryName={setCategoryName}
              onValueChange={setIcon}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-left">
              Status
            </Label>
            <SelectDemo onValueChange={setPaymentType} />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              as={'span'}
              onClick={updateRental}
              className={'bg-blue-500 hover:bg-green-500'}
              type="submit"
              disabled={
                !setEmail ||
                !setRent ||
                !setRentalDay ||
                !setPaymentType ||
                !setIcon ||
                !setCategoryName
              }
            >
              Save changes
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
