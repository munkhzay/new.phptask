import './globals.css'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from '@/providers/authProvider'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-stone-50">
        <AuthProvider>{children}</AuthProvider>
        <ToastContainer />
      </body>
    </html>
  )
}
