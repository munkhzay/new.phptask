import { LogOut } from 'lucide-react'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { useAuthContext } from '@/providers/authProvider'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const Header = () => {
  const { setCurrentUser, currentUser } = useAuthContext()
  const router = useRouter()

  const logout = () => {
    setCurrentUser('')
    localStorage.removeItem('user')
    const user = localStorage.getItem('user')

    if (user === null) toast.warning('Та гарлаа')
    router.push('/auth/signin')
  }

  return (
    <div className="bg-blue-500 text-center ">
      <div className="w-[1024px] text-black m-auto h-24 flex justify-between items-center">
        <div>
          {' '}
          <div className="flex flex-row justify-center items-center gap-4">
            {' '}
            <Avatar className={'w-12 h-12'}>
              <AvatarImage
                width={32}
                src="https://github.com/shadcn.png"
                alt="@shadcn"
              />
            </Avatar>{' '}
            <div className="font-semibold px-5 text-lg bg-white rounded-xl w-fit text-black">
              {currentUser?.email}
            </div>
          </div>{' '}
        </div>
        <div className="flex gap-10 items-center justify-center">
          <div className="p-2 border bg-white rounded-lg">
            <LogOut onClick={logout} className="" />
          </div>
        </div>
      </div>
    </div>
  )
}
