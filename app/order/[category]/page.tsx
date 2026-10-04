import ProductCard from '@/app/components/products/ProductCard'
import { prisma } from '@/prisma/prismaAdapter'
import { formatPrice } from '@/src/lib/formatPrice'
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
    console.log(error);
  }
}

const ProductsByCategory = async ({ params }: CategoryDetailsType) => {

  const { category } = await params

  const products = await getProducts(category)

  return (
    <div className='flex flex-1 flex-col gap-3 max-h-screen overflow-y-scroll no-scrollbar overflow-hidden'>
      <h1 className='px-3 font-semibold text-2xl mt-5'>
        Elige y personaliza tu pedido a continuación
      </h1>

      <div className='grid md:grid-cols-3 gap-3 p-3'>
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
