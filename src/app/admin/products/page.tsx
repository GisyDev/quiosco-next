import Heading from '@/components/ui/Heading';
import { prisma } from '@/prisma/prismaAdapter';
import ProductTable from '@/components/admin/products/ProductTable';
import ProductTablePagination from '@/components/admin/products/ProductTablePagination';
import Link from 'next/link';
import ProductSearch from '@/components/admin/products/ProductSearch';

const getProducts = async (page: number, pageSize: number, search: string) => {

  return await prisma.product.findMany({
    take: pageSize,
    skip: (page - 1) * pageSize,
    include: {
      category: true
    },
    where: search ? {
      name: {
        contains: search,
        mode: 'insensitive'
      }
    } : undefined,
  })
}

const getCountProduct = async (search: string) => {
  return await prisma.product.count({
    where: search ? {
      name: {
        contains: search,
        mode: 'insensitive'
      }
    } : undefined,
  })
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>


const ProductsPage = async ({ searchParams }: { searchParams: { page: string, search: string } }) => {

  const { page: pageParam, search } = await searchParams

  const page = Number(pageParam) || 1
  const pageSize = 10

  const [products, countProduct] = await Promise.all([
    getProducts(page, pageSize, search),
    getCountProduct(search)
  ])

  const totalPages = Math.ceil(countProduct / pageSize)


  return (
    <section>
      <Heading>
        Administrar productos
      </Heading>


      <div className='flex justify-between items-center'>
        <Link
          href={`/admin/products/new`}
          className='bg-amber-400 w-full text-xs px-10 py-2 text-center font-bold cursor-pointer lg:w-auto lg:justify-between text-gray-700 hover:bg-amber-400/80 transition-all'
        >
          Crear producto
        </Link>

        <ProductSearch />
      </div>
       {
        search && search.trim() && countProduct != 0 && 
        <p className='text-sm mt-4'>Resultados de búsqueda {"("}{countProduct}{")"}: <strong>{search.trim()}</strong></p>
      }
      <ProductTable products={products} />

      <ProductTablePagination page={page} totalPages={totalPages} />
    </section>
  )

  return (
    <p>Prueba</p>
  )
}

export default ProductsPage