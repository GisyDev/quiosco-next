import ProductCard from '@/app/components/products/ProductCard'
import { prisma } from '@/app/config/prismaAdapter'
import { formatPrice } from '@/app/lib/formatPrice'
import React from 'react'

type CategoryDetailsType = {
  params: { category: string }
}

const getProducts = async (category: string) => {
  try {
    const products = prisma.product.findMany({
      where: {
        category: {
          slug: category
        }
      }
    })

    return products
  } catch (error) {

  }
}

const ProductsByCategory = async ({ params }: CategoryDetailsType) => {

  const { category } = await params

  const products = await getProducts(category)

  return (
    <div className='flex flex-col mt-5 gap-3'>
      <h1 className='px-3 font-semibold text-2xl'>
        Elige y personaliza tu pedido a continuación
      </h1>

      <div className='grid grid-cols-3 gap-3 p-3 h-screen  overflow-y-scroll no-scrollbar'>
        {
          products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        }
      </div>
    </div>

  )
}

export default ProductsByCategory
