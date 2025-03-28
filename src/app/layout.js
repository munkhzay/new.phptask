import './globals.css'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from '@/providers/authProvider'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
        <ToastContainer />
      </body>
    </html>
  )
}
