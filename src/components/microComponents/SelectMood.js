'use client'
import * as React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function SelectDemo({ onValueChange }) {
  return (
    <Select onValueChange={(value) => onValueChange(value)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a mode" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="ACTIVE">ACTIVE</SelectItem>
          <SelectItem value="INACTIVE">INACTIVE</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
