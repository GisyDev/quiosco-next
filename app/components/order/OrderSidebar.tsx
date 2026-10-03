import React from 'react'
import { prisma } from '@/app/config/prismaAdapter'
import CategoryIcon from '@/app/ui/CategoryIcon';



const getCategories = async () => {
  try {
    return await prisma.category.findMany()
  } catch (error) {
    console.log(error);
  }
}

const OrderSidebar = async () => {

  const categories = await getCategories()

  return (
    <aside className='flex bg-white md:w-[18%] h-screen'>
      <nav className='mt-10 w-full'>
        {
          categories?.map((category) => (
            <CategoryIcon
              key={category.id}
              category={category}
            />
          ))
        }
      </nav>
    </aside>
  )
}

export default OrderSidebar