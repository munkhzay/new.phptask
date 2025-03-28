import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

export const TablePagination = ({ currentPage, totalPages, onPageChange }) => (
  <Pagination className="text-black bg-blue-500  border-t h-25">
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
        />
      </PaginationItem>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <PaginationItem key={page}>
          <PaginationLink
            className="border text-black"
            onClick={() => onPageChange(page)}
            isActive={currentPage === page}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      ))}
      <PaginationItem>
        <PaginationNext
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          className={
            currentPage === totalPages ? 'pointer-events-none opacity-50' : ''
          }
        />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
)
