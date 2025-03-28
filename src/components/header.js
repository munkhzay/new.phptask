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
    <div className="bg-stone-100 text-center border ">
      <div className="w-[1024px] text-black m-auto h-30  flex justify-between items-center">
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
            <div className="font-semibold px-5 py-1 text-lg bg-blue-500 rounded-xl w-fit text-white">
              {currentUser?.email}
            </div>
          </div>{' '}
        </div>
        <div className="flex gap-10 items-center justify-center">
          <div className="p-2 border bg-blue-500 text-white rounded-lg">
            <LogOut onClick={logout} className="" />
          </div>
        </div>
      </div>
    </div>
  )
}
