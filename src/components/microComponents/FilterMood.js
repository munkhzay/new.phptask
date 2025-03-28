import * as React from 'react'

export function SelectStatus({ setStatus, rentalStatus }) {
  return (
    <div className="flex items-center">
      <select
        className="text-white"
        onClick={(event) => {
          setStatus(event.target.value), rentalStatus()
        }}
        id="rentalProduct"
      >
        <option value="">status</option>
        <option value="all">All</option>
        <option value="ACTIVE">Active</option>
        <option value="INACTIVE">Inactive</option>
      </select>
    </div>
  )
}
