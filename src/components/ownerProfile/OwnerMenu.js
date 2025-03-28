'use client'

import axios from 'axios'
import { NewCategory } from './NewCategory'
import { useEffect, useState } from 'react'
import { useAuthContext } from '@/providers/authProvider'
import { toast } from 'react-toastify'
import { Categories } from './Categories'
import { CustomerData } from './OwnerData'

export const UserInfo = ({ onClick, setShowCategory, showCategory }) => {
  const [name, setName] = useState()
  const [icon, setIcon] = useState()
  const { currentUser } = useAuthContext()
  const [category, setCategory] = useState()

  const getCategory = async () => {
    try {
      const category = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/get/categories.php?owner_id=${currentUser?.id}`,
        { headers: { 'Content-Type': 'application/json' } },
      )
      setCategory(category?.data?.categories)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getCategory
  }, [])

  const createCategory = async () => {
    await axios
      .post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/post/new.category.php`,
        { owner_id: currentUser?.id, category_name: name, icon_id: icon },
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      .then(function (response) {
        console.log(response)
        toast.success('Successful')
        setIcon()
        setName()
        getCategory()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <div>
      <div className="w-[300px] h-fit p-8 border flex flex-col rounded-lg gap-8">
        <div className="bg-blue-600 rounded-lg py-7">
          <div></div>
        </div>
        <CustomerData
          onClick={onClick}
          setShowCategory={setShowCategory}
          showCategory={showCategory}
        />
        <Categories category={category} getCategory={getCategory} />
        <NewCategory
          name={name}
          icon={icon}
          setIcon={setIcon}
          setName={setName}
          createCategory={createCategory}
        />
      </div>
    </div>
  )
}
