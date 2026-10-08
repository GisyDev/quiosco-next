import React from 'react'
import { prisma } from '@/prisma/prismaAdapter'
import CategoryNav from '@/components/orders/CategoryNav';
import Logo from '../ui/Logo';



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
    <aside className='flex flex-col bg-white w-[30%] md:w-[25%] 2xl:w-[25%] h-screen'>
      <Logo/>
      <nav className='w-full'>
        {
          categories?.map((category) => (
            <CategoryNav
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