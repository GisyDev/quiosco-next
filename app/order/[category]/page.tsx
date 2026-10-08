import ProductCard from '@/app/components/products/ProductCard'
import Heading from '@/app/components/ui/Heading'
import { prisma } from '@/prisma/prismaAdapter'

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
    <div className='flex flex-1 flex-col gap-3 max-h-screen overflow-y-scroll no-scrollbar overflow-hidden p-3'>
      <Heading>
        Elige y personaliza tu pedido a continuación
      </Heading>

      <div className='grid sm:grid-col-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3'>
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
