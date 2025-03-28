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
import { useRouter } from 'next/navigation'
import { toast, ToastContainer } from 'react-toastify'
import Link from 'next/link'
import axios from 'axios'

const FormSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .length(5, { message: 'Must be exactly 5 characters long' }),
    repeatpassword: z.string().length(5, {
      message: 'Repeat password must be exactly 5 characters long',
    }),
  })
  .refine((data) => data.password === data.repeatpassword, {
    message: 'Passwords do not match',
    path: ['repeatpassword'],
  })

export default function SignUp() {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: '',
      repeatpassword: '',
      email: '',
    },
  })
  const router = useRouter()

  async function onSubmit(data) {
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/post/create.user.php`,
        {
          password: data.password,
          email: data.email,
        },
        { headers: { 'Content-Type': 'application/json' } },
      )
      .then(function (response) {
        if (response?.data?.message === 'user is now registered') {
          toast.success('Successful')
          setTimeout(() => {
            router.push('/auth/signin')
          }, 2000)
        } else {
          toast.warning('user already used')
        }
      })
      .catch(function (error) {
        console.log(error)
        toast.error(`Something went wrong`)
      })
  }

  return (
    <div className="flex justify-center  items-center h-screen">
      <div className="py-10 px-8 rounded-lg bg-white border ">
        <div className="text-black font-extrabold text-2xl text-center pb-5">
          Бүртгүүлэх
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
            <FormField
              control={form.control}
              name="repeatpassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Repeat Password</FormLabel>
                  <FormControl>
                    <Input placeholder="repeat-password" {...field} />
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
                Бүртгүүлэх
              </Button>
              <div>Эсвэл</div>
              <Link href={'/auth/signin'}>
                <Button
                  className={
                    'p-5 w-full bg-white text-black border border-blue-400 hover:bg-blue-500'
                  }
                >
                  Нэвтрэх
                </Button>
              </Link>
              <ToastContainer />
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
