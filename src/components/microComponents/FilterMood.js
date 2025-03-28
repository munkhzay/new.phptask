import * as React from 'react'

export function SelectStatus({ setStatus, rentalStatus }) {
  return (
    <div className="flex items-center ">
      <select
        className="text-black bg-stone-50 border rounded-lg p-2"
        onClick={(event) => {
          setStatus(event.target.value), rentalStatus()
        }}
        id="rentalProduct"
      >
        <option value="">Status</option>
        <option value="all">All</option>
        <option value="ACTIVE">Active</option>
        <option value="INACTIVE">Inactive</option>
      </select>
    </div>
  )
}
