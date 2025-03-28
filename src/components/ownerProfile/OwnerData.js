import { FishSymbol, KeyRound } from 'lucide-react'

export const CustomerData = ({ onClick }) => {
  return (
    <div className="border rounded-lg bg-stone-50">
      <div className="p-2">
        <div className="flex justify-between">
          <div className="">Owner Data</div>
        </div>
        <div className="flex flex-row p-2 justify-between">
          <div className="text-gray-600 " onClick={onClick}>
            Rentals
          </div>
        </div>
      </div>
    </div>
  )
}
