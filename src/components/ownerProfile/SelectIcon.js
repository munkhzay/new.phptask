import * as React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Car, House, Store, Tent, Theater } from 'lucide-react'

export function SelectIcon({ setIcon }) {
  return (
    <Select onValueChange={(value) => setIcon(value)}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select  icon" />
      </SelectTrigger>
      <SelectContent className={'text-center'}>
        <SelectGroup className={'text-center'}>
          <SelectItem className={'text-center '} value="1">
            <House className="text-blue-400 " />
            House
          </SelectItem>
          <SelectItem value="2">
            <Car className="text-red-400 " /> Car
          </SelectItem>
          <SelectItem value="3">
            <Tent className="" />
            Camp
          </SelectItem>
          <SelectItem value="4">
            <Store className="text-green-500" />
            Store
          </SelectItem>
          <SelectItem value="5">
            <Theater className="text-red-700" />
            Theater
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
