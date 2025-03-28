export const CustomerData = ({ onClick }) => {
  return (
    <div className="border rounded-lg">
      <div className="p-2">
        <div className="flex justify-between">
          <div className="">Owner Data</div>
        </div>
        <div className="flex flex-col p-2 gap-2">
          <div className="text-neutral-600 " onClick={onClick}>
            Rentals
          </div>
        </div>
      </div>
    </div>
  )
}
