'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { useAuthContext } from '@/providers/authProvider'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect } from 'react'

const FormSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .length(5, { message: 'Must be exactly 5 characters long' }),
})

export default function SignIn() {
  const router = useRouter()
  const { signin, currentUser, loading } = useAuthContext()
  useEffect(() => {
    if (currentUser && !loading) {
      router.push('/')
    }
  }, [loading])
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data) {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/get/signin.php`,
        { email: data.email, password: data.password },
        { headers: { 'Content-Type': 'application/json' } },
      )
      if (response?.data?.message === 'user not found') {
        toast.warning('User not found')
      } else if (response?.data?.message === 'password not match') {
        toast.warning('Password not match')
      } else if (response?.data?.user) {
        signin(response.data.user), toast.success('Successful')

        setTimeout(() => {
          router.push('/')
        }, 1000)
      } else {
        toast.warning('something went wrong')
      }
    } catch (error) {
      toast.error('Алдаа гарлаа')
    }
  }

  return (
    <div className="flex justify-center items-center h-screen  ">
      <div className="py-15 px-8 rounded-lg border bg-white">
        <div className="text-black font-extrabold text-2xl text-center pb-10">
          Нэвтрэх
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-[350px] space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-center flex flex-col gap-5">
              <Button
                className={'p-5 w-full bg-blue-500 hover:bg-blue-600'}
                type="submit"
              >
                Нэвтрэх
              </Button>{' '}
              <div>Эсвэл</div>
              <Link href={'/auth/signup'}>
                <Button
                  className={
                    'p-5 w-full bg-white text-black border border-blue-400 hover:bg-blue-500'
                  }
                >
                  Бүртгүүлэх
                </Button>
              </Link>
            </div>
          </form>
          <ToastContainer />
        </Form>
      </div>{' '}
    </div>
  )
}
