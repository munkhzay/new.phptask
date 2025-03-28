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
import { useAuthContext } from '@/providers/authProvider'
import axios from 'axios'

export function SelectCategory({ onValueChange, setCategoryName, rental }) {
  const [category, setCategory] = React.useState([])
  const { currentUser } = useAuthContext()

  const getCategory = async () => {
    try {
      const category = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/get/categories.php?owner_id=${currentUser?.id}`,
        { headers: { 'Content-Type': 'application/json' } },
      )
      setCategory(category?.data?.categories)
    } catch (error) {
      console.log(error)
    }
  }

  React.useEffect(() => {
    getCategory()
  }, [])

  return (
    <Select
      onValueChange={(value) => {
        const selectedCategory = category?.find((icon) => icon.id === value)
        setCategoryName(selectedCategory?.category_name || '')
        if (onValueChange) {
          onValueChange(value)
        }
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={`${rental?.category_name}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {category?.map((icon) => {
            return (
              <SelectItem
                value={icon.id}
                className="flex flex-row justify-between px-3 py-1"
                key={icon.id}
              >
                {icon.category_name}
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
