import { format } from 'date-fns'

export const Footer = () => {
  const formatDate = () => {
    return format(new Date(), 'MMMM d, yyyy')
  }

  return (
    <footer className="footer footer-horizontal bg-blue-500 footer-center bg-base-200 text-base-content rounded p-10 flex flex-col gap-5">
      <nav className="grid grid-flow-col text-center gap-4">
        <a className="link link-hover">{formatDate()}</a>
      </nav>
    </footer>
  )
}
