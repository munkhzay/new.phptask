'use client'
import { Search } from 'lucide-react'
import { Input } from '../ui/input'
import { AddNew } from '../editTable/AddRental'
import { SelectStatus } from '../microComponents/FilterMood'

export const TableHead = ({ refetch, setSearch, setStatus, rentalStatus }) => {
  return (
    <div className="bg-blue-500 border-b h-25 w-full rounded-sm flex justify-between items-center">
      <div className="flex items-center gap-8">
        <AddNew refetch={refetch} />
        <SelectStatus setStatus={setStatus} rentalStatus={rentalStatus} />
      </div>
      <div className="flex items-center ">
        <div className="flex flex-row  bg-white border mr-10 px-2 rounded-lg items-center">
          <Input
            onChange={(event) => setSearch(event.target.value)}
            placeholder={'Search'}
            className={'border-none hover:border-0 '}
          />
          <Search className="text-black" onClick={refetch} />
        </div>
      </div>
    </div>
  )
}
