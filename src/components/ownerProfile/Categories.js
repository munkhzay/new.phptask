'use client'

import { icons } from '@/lib/FindIcon'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export const Categories = ({ category, getCategory }) => {
  const [showcategory, setShowcategory] = useState(false)

  return (
    <div className="border rounded-lg">
      <div className="p-2 flex flex-col gap-3">
        <div
          className="flex justify-between"
          onClick={() => {
            setShowcategory(!showcategory), getCategory()
          }}
        >
          <div>Categories</div>
          {!showcategory ? <ChevronRight /> : <ChevronDown />}
        </div>
        {showcategory && (
          <div className="flex flex-col gap-2">
            {category?.map((icon) => {
              const foundicon = icons.find((id) => id.id === icon.icon_id)
              return (
                <div
                  className="flex flex-row justify-between px-4 py-1"
                  key={icon.id}
                >
                  <div className="text-neutral-600 text-md" key={icon.id}>
                    {icon.category_name}
                  </div>
                  <div>{foundicon.icon}</div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
